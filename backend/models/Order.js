const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    image: String,
    customization: {
      message: String,
      specialInstructions: String
    }
  }],
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative']
  },
  tax: {
    type: Number,
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  shipping: {
    type: Number,
    default: 0,
    min: [0, 'Shipping cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  total: {
    type: Number,
    required: true,
    min: [0, 'Total cannot be negative']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
      message: 'Please select a valid order status'
    },
    default: 'pending'
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'paypal', 'bank-transfer', 'cash-on-delivery'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  shippingAddress: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      default: 'US'
    }
  },
  billingAddress: {
    name: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  shipping: {
    method: {
      type: String,
      enum: ['standard', 'express', 'overnight', 'free'],
      default: 'standard'
    },
    trackingNumber: String,
    carrier: String,
    shippedAt: Date,
    deliveredAt: Date,
    estimatedDelivery: Date
  },
  giftOptions: {
    isGift: {
      type: Boolean,
      default: false
    },
    message: String,
    recipientEmail: String,
    sendNotification: {
      type: Boolean,
      default: false
    }
  },
  notes: String,
  coupon: {
    code: String,
    discount: Number,
    type: String
  },
  timeline: [{
    status: {
      type: String,
      enum: ['created', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    note: String
  }]
}, {
  timestamps: true
});

// Indexes for better performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ createdAt: -1 });

// Generate unique order number before saving
orderSchema.pre('save', function(next) {
  if (this.isNew && !this.orderNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderNumber = `DC-${timestamp}-${random}`;
  }
  next();
});

// Add timeline entry when status changes
orderSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status !== 'pending') {
    this.timeline.push({
      status: this.status,
      timestamp: new Date(),
      note: `Order status changed to ${this.status}`
    });
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);