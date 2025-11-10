const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    max: [99, 'Quantity cannot exceed 99']
  },
  customization: {
    message: String,
    specialInstructions: String
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  items: [cartItemSchema],
  subtotal: {
    type: Number,
    default: 0,
    min: [0, 'Subtotal cannot be negative']
  },
  itemCount: {
    type: Number,
    default: 0,
    min: [0, 'Item count cannot be negative']
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    index: { expires: 0 }
  }
}, {
  timestamps: true
});

// Indexes for better performance
cartSchema.index({ user: 1 });
cartSchema.index({ sessionId: 1 });
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Calculate totals before saving
cartSchema.pre('save', async function(next) {
  try {
    // Populate product details if items exist
    if (this.items && this.items.length > 0) {
      await this.populate('items.product');

      this.subtotal = 0;
      this.itemCount = 0;

      this.items.forEach(item => {
        if (item.product) {
          // Use sale price if available, otherwise regular price
          const price = item.product.salePrice || item.product.price;
          item.price = price;
          item.name = item.product.name;
          item.image = item.product.images && item.product.images.length > 0
            ? item.product.images[0].url
            : '';

          this.subtotal += price * item.quantity;
          this.itemCount += item.quantity;
        }
      });
    } else {
      this.subtotal = 0;
      this.itemCount = 0;
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Instance methods
cartSchema.methods.addItem = function(productId, quantity = 1, customization = {}) {
  const existingItem = this.items.find(item =>
    item.product.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.customization = { ...existingItem.customization, ...customization };
  } else {
    this.items.push({
      product: productId,
      quantity,
      customization
    });
  }
};

cartSchema.methods.removeItem = function(productId) {
  this.items = this.items.filter(item =>
    item.product.toString() !== productId.toString()
  );
};

cartSchema.methods.updateQuantity = function(productId, quantity) {
  const item = this.items.find(item =>
    item.product.toString() === productId.toString()
  );

  if (item) {
    if (quantity <= 0) {
      this.removeItem(productId);
    } else {
      item.quantity = quantity;
    }
  }
};

cartSchema.methods.clear = function() {
  this.items = [];
  this.subtotal = 0;
  this.itemCount = 0;
};

cartSchema.methods.isEmpty = function() {
  return this.items.length === 0;
};

module.exports = mongoose.model('Cart', cartSchema);