const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: {
      values: ['birthday', 'anniversary', 'wedding', 'thank-you', 'corporate', 'home', 'luxury', 'personalized'],
      message: 'Please select a valid category'
    }
  },
  subcategory: {
    type: String,
    enum: ['for-her', 'for-him', 'for-home', 'luxury', 'personalized', 'corporate']
  },
  occasion: {
    type: String,
    enum: ['birthday', 'anniversary', 'wedding', 'graduation', 'promotion', 'thank-you', 'housewarming', 'retirement']
  },
  recipient: {
    type: String,
    enum: ['her', 'him', 'home', 'family', 'friend', 'colleague', 'boss']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  inventory: {
    quantity: {
      type: Number,
      required: [true, 'Please add quantity'],
      min: [0, 'Quantity cannot be negative'],
      default: 0
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    trackInventory: {
      type: Boolean,
      default: true
    }
  },
  shipping: {
    weight: {
      type: Number,
      min: [0, 'Weight cannot be negative']
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    freeShipping: {
      type: Boolean,
      default: false
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  features: [String],
  specifications: [{
    name: String,
    value: String
  }],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    title: String,
    comment: {
      type: String,
      required: true,
      maxlength: [500, 'Review comment cannot be more than 500 characters']
    },
    verified: {
      type: Boolean,
      default: false
    },
    helpful: {
      type: Number,
      default: 0
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isOnSale: {
    type: Boolean,
    default: false
  },
  saleStart: Date,
  saleEnd: Date,
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100
  },
  viewCount: {
    type: Number,
    default: 0
  },
  soldCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isActive: 1, isFeatured: 1 });
productSchema.index({ createdAt: -1 });

// Virtual for sale price
productSchema.virtual('salePrice').get(function() {
  if (this.isOnSale && this.discountPercentage) {
    return this.price * (1 - this.discountPercentage / 100);
  }
  return this.price;
});

// Virtual for availability
productSchema.virtual('isAvailable').get(function() {
  return this.isActive && (!this.inventory.trackInventory || this.inventory.quantity > 0);
});

// Calculate average rating when reviews are added/updated
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length > 0) {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = sum / this.reviews.length;
    this.reviewCount = this.reviews.length;
  } else {
    this.averageRating = 0;
    this.reviewCount = 0;
  }
};

module.exports = mongoose.model('Product', productSchema);