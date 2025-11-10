const express = require('express');
const { body, validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Helper function to get or create cart
const getOrCreateCart = async (userId, sessionId) => {
  let cart;

  if (userId) {
    // Try to find existing cart for user
    cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // Create new cart for user
      cart = new Cart({
        user: userId,
        sessionId: sessionId || `user_${userId}_${Date.now()}`
      });
    }
  } else {
    // Try to find existing cart for session
    cart = await Cart.findOne({ sessionId });
    if (!cart) {
      // Create new cart for session
      cart = new Cart({ sessionId });
    }
  }

  return cart;
};

// @desc    Get cart
// @route   GET /api/cart
// @access  Public (with optional auth)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || req.query.sessionId;

    if (!sessionId && !req.user) {
      return res.json({
        success: true,
        data: {
          items: [],
          subtotal: 0,
          itemCount: 0
        }
      });
    }

    const cart = await getOrCreateCart(
      req.user ? req.user._id : null,
      sessionId
    );

    // Populate product details
    await cart.populate({
      path: 'items.product',
      select: 'name price images isActive inventory.quantity'
    });

    // Filter out inactive products or out of stock items
    cart.items = cart.items.filter(item => {
      const product = item.product;
      return product &&
             product.isActive &&
             (!product.inventory.trackInventory || product.inventory.quantity >= item.quantity);
    });

    // Recalculate totals
    cart.subtotal = cart.items.reduce((total, item) => {
      const price = item.product.salePrice || item.product.price;
      return total + (price * item.quantity);
    }, 0);

    cart.itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    await cart.save();

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Public (with optional auth)
router.post('/items', optionalAuth, [
  body('productId')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  body('quantity')
    .isInt({ min: 1, max: 99 })
    .withMessage('Quantity must be between 1 and 99'),
  body('customization.message')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Customization message cannot exceed 500 characters'),
  body('customization.specialInstructions')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Special instructions cannot exceed 1000 characters')
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

    const { productId, quantity, customization = {} } = req.body;
    const sessionId = req.headers['x-session-id'] || req.body.sessionId;

    if (!sessionId && !req.user) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required for guest users'
      });
    }

    // Check if product exists and is available
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (!product.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Product is not available'
      });
    }

    if (product.inventory.trackInventory && product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.inventory.quantity} items available in stock`
      });
    }

    // Get or create cart
    const cart = await getOrCreateCart(
      req.user ? req.user._id : null,
      sessionId
    );

    // Add item to cart
    cart.addItem(productId, quantity, customization);
    await cart.save();

    // Populate product details for response
    await cart.populate({
      path: 'items.product',
      select: 'name price images'
    });

    res.json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:productId
// @access  Public (with optional auth)
router.put('/items/:productId', optionalAuth, [
  body('quantity')
    .isInt({ min: 0, max: 99 })
    .withMessage('Quantity must be between 0 and 99')
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

    const { quantity } = req.body;
    const sessionId = req.headers['x-session-id'] || req.query.sessionId;

    if (!sessionId && !req.user) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required for guest users'
      });
    }

    // Get cart
    const cart = await getOrCreateCart(
      req.user ? req.user._id : null,
      sessionId
    );

    if (quantity === 0) {
      // Remove item
      cart.removeItem(req.params.productId);
    } else {
      // Update quantity
      cart.updateQuantity(req.params.productId, quantity);
    }

    await cart.save();

    // Populate product details for response
    await cart.populate({
      path: 'items.product',
      select: 'name price images'
    });

    res.json({
      success: true,
      message: quantity === 0 ? 'Item removed from cart' : 'Cart updated successfully',
      data: cart
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:productId
// @access  Public (with optional auth)
router.delete('/items/:productId', optionalAuth, async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || req.query.sessionId;

    if (!sessionId && !req.user) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required for guest users'
      });
    }

    // Get cart
    const cart = await getOrCreateCart(
      req.user ? req.user._id : null,
      sessionId
    );

    // Remove item
    cart.removeItem(req.params.productId);
    await cart.save();

    res.json({
      success: true,
      message: 'Item removed from cart successfully',
      data: cart
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Public (with optional auth)
router.delete('/', optionalAuth, async (req, res) => {
  try {
    const sessionId = req.headers['x-session-id'] || req.query.sessionId;

    if (!sessionId && !req.user) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required for guest users'
      });
    }

    // Get cart
    const cart = await getOrCreateCart(
      req.user ? req.user._id : null,
      sessionId
    );

    // Clear cart
    cart.clear();
    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: cart
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Merge guest cart with user cart
// @route   POST /api/cart/merge
// @access  Private
router.post('/merge', protect, async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: 'Session ID is required'
      });
    }

    // Find guest cart
    const guestCart = await Cart.findOne({ sessionId, user: null });
    if (!guestCart || guestCart.isEmpty()) {
      return res.json({
        success: true,
        message: 'No guest cart to merge'
      });
    }

    // Get or create user cart
    const userCart = await getOrCreateCart(req.user._id, `user_${req.user._id}_${Date.now()}`);

    // Merge items
    guestCart.items.forEach(guestItem => {
      const existingItem = userCart.items.find(item =>
        item.product.toString() === guestItem.product.toString()
      );

      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
        // Merge customization (user cart takes precedence)
        existingItem.customization = {
          ...guestItem.customization,
          ...existingItem.customization
        };
      } else {
        userCart.items.push(guestItem);
      }
    });

    await userCart.save();

    // Delete guest cart
    await Cart.deleteOne({ _id: guestCart._id });

    // Populate product details for response
    await userCart.populate({
      path: 'items.product',
      select: 'name price images'
    });

    res.json({
      success: true,
      message: 'Carts merged successfully',
      data: userCart
    });
  } catch (error) {
    console.error('Merge cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;