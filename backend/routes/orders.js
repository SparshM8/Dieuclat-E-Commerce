const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, [
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('items.*.product')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('shippingAddress.name')
    .trim()
    .notEmpty()
    .withMessage('Shipping name is required'),
  body('shippingAddress.email')
    .isEmail()
    .withMessage('Valid shipping email is required'),
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Shipping street address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('Shipping city is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('Shipping state is required'),
  body('shippingAddress.zipCode')
    .trim()
    .notEmpty()
    .withMessage('Shipping zip code is required'),
  body('payment.method')
    .isIn(['card', 'paypal', 'bank-transfer', 'cash-on-delivery'])
    .withMessage('Valid payment method is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      items,
      shippingAddress,
      billingAddress,
      shipping: shippingOptions,
      giftOptions,
      notes,
      coupon
    } = req.body;

    // Validate and calculate order totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product ${item.product} not found`
        });
      }

      if (!product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product ${product.name} is not available`
        });
      }

      if (product.inventory.trackInventory && product.inventory.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.inventory.quantity}`
        });
      }

      const price = product.salePrice || product.price;
      const itemTotal = price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price,
        quantity: item.quantity,
        image: product.images && product.images.length > 0 ? product.images[0].url : '',
        customization: item.customization || {}
      });

      subtotal += itemTotal;

      // Decrease inventory
      if (product.inventory.trackInventory) {
        product.inventory.quantity -= item.quantity;
        product.soldCount += item.quantity;
        await product.save();
      }
    }

    // Calculate totals
    const tax = subtotal * 0.08; // 8% tax rate
    const shipping = shippingOptions?.method === 'express' ? 15.99 :
                    shippingOptions?.method === 'overnight' ? 29.99 : 9.99;
    const discount = coupon ? calculateDiscount(coupon, subtotal) : 0;
    const total = subtotal + tax + shipping - discount;

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      subtotal,
      tax,
      shipping,
      discount,
      total,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      shipping: shippingOptions,
      giftOptions,
      notes,
      coupon,
      payment: {
        method: req.body.payment.method,
        status: 'pending'
      }
    });

    // Clear user's cart if exists
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { items: [], subtotal: 0, itemCount: 0 } }
    );

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    let filter = { user: req.user._id };
    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('items.product', 'name images');

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images description')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin (for now, allowing users to cancel)
router.put('/:id/status', protect, [
  body('status')
    .isIn(['cancelled'])
    .withMessage('Only cancellation is allowed for users')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this order'
      });
    }

    // Only allow cancellation if order is still pending
    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    // Restore inventory
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product && product.inventory.trackInventory) {
        product.inventory.quantity += item.quantity;
        await product.save();
      }
    }

    order.status = 'cancelled';
    order.timeline.push({
      status: 'cancelled',
      timestamp: new Date(),
      note: 'Order cancelled by user'
    });

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Helper function to calculate discount
function calculateDiscount(coupon, subtotal) {
  // Simple discount calculation - can be expanded
  if (coupon.type === 'percentage') {
    return subtotal * (coupon.discount / 100);
  } else if (coupon.type === 'fixed') {
    return Math.min(coupon.discount, subtotal);
  }
  return 0;
}

module.exports = router;