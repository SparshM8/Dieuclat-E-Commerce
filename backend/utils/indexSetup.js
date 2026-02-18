/**
 * Database Index Configuration
 * Optimizes query performance across collections
 * Run this once during initial setup
 */

const mongoose = require('mongoose');

/**
 * Create all indexes for application collections
 */
const createIndexes = async () => {
  try {
    console.log('Creating database indexes...');

    // User Collection Indexes
    const User = require('../models/User');
    await User.collection.createIndex({ email: 1 });
    await User.collection.createIndex({ createdAt: -1 });
    await User.collection.createIndex({ role: 1 });
    await User.collection.createIndex({ isActive: 1 });
    console.log('✓ User indexes created');

    // Product Collection Indexes
    const Product = require('../models/Product');
    await Product.collection.createIndex({ category: 1 });
    await Product.collection.createIndex({ price: 1 });
    await Product.collection.createIndex({ createdAt: -1 });
    await Product.collection.createIndex({ name: 'text', description: 'text' });
    await Product.collection.createIndex({ isActive: 1 });
    await Product.collection.createIndex({ isFeatured: 1 });
    await Product.collection.createIndex({ category: 1, subcategory: 1 });
    await Product.collection.createIndex({ occasion: 1, recipient: 1 });
    console.log('✓ Product indexes created');

    // Order Collection Indexes
    const Order = require('../models/Order');
    await Order.collection.createIndex({ user: 1 });
    await Order.collection.createIndex({ status: 1 });
    await Order.collection.createIndex({ createdAt: -1 });
    await Order.collection.createIndex({ 'payment.status': 1 });
    await Order.collection.createIndex({ orderNumber: 1 }).catch(() => {
      // Index might already exist with unique constraint
    });
    console.log('✓ Order indexes created');

    // Cart Collection Indexes
    const Cart = require('../models/Cart');
    await Cart.collection.createIndex({ user: 1 });
    await Cart.collection.createIndex({ sessionId: 1 });
    await Cart.collection.createIndex({ updatedAt: -1 });
    console.log('✓ Cart indexes created');

    console.log('All indexes created successfully!');
    return true;
  } catch (error) {
    console.error('Error creating indexes:', error);
    throw error;
  }
};

/**
 * Drop all indexes (use with caution)
 */
const dropAllIndexes = async () => {
  try {
    console.log('Dropping all indexes...');

    const User = require('../models/User');
    const Product = require('../models/Product');
    const Order = require('../models/Order');
    const Cart = require('../models/Cart');

    await User.collection.dropAllIndexes();
    await Product.collection.dropAllIndexes();
    await Order.collection.dropAllIndexes();
    await Cart.collection.dropAllIndexes();

    console.log('All indexes dropped successfully!');
    return true;
  } catch (error) {
    console.error('Error dropping indexes:', error);
    throw error;
  }
};

/**
 * Get index information for all collections
 */
const getIndexInfo = async () => {
  try {
    const User = require('../models/User');
    const Product = require('../models/Product');
    const Order = require('../models/Order');
    const Cart = require('../models/Cart');

    const indexes = {
      user: await User.collection.getIndexes(),
      product: await Product.collection.getIndexes(),
      order: await Order.collection.getIndexes(),
      cart: await Cart.collection.getIndexes()
    };

    console.log('Index Information:', JSON.stringify(indexes, null, 2));
    return indexes;
  } catch (error) {
    console.error('Error retrieving index info:', error);
    throw error;
  }
};

module.exports = {
  createIndexes,
  dropAllIndexes,
  getIndexInfo
};
