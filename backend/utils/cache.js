/**
 * Cache Management Utility
 * Provides caching layer for frequently accessed data
 */

class CacheManager {
  constructor(defaultTTL = 300000) { // 5 minutes default
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0
    };
  }

  /**
   * Get value from cache
   * @param {string} key - Cache key
   * @returns {*} - Cached value or null
   */
  get(key) {
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    this.stats.hits++;
    return entry.value;
  }

  /**
   * Set value in cache
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds
   */
  set(key, value, ttl = this.defaultTTL) {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttl,
      createdAt: Date.now()
    });
    this.stats.sets++;
  }

  /**
   * Check if key exists and is valid
   * @param {string} key - Cache key
   * @returns {boolean}
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Delete key from cache
   * @param {string} key - Cache key
   */
  delete(key) {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
    this.stats = { hits: 0, misses: 0, sets: 0 };
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache statistics
   */
  getStats() {
    const total = this.stats.hits + this.stats.misses;
    const hitRate = total > 0 ? (this.stats.hits / total * 100).toFixed(2) : 0;

    return {
      ...this.stats,
      size: this.cache.size,
      hitRate: `${hitRate}%`,
      total
    };
  }

  /**
   * Get all cache keys
   * @returns {Array} - Array of cache keys
   */
  keys() {
    return Array.from(this.cache.keys());
  }

  /**
   * Cleanup expired entries
   */
  cleanup() {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    return cleaned;
  }

  /**
   * Set up periodic cleanup
   * @param {number} intervalMs - Cleanup interval in milliseconds
   */
  setupCleanup(intervalMs = 60000) {
    return setInterval(() => {
      const cleaned = this.cleanup();
      if (cleaned > 0) {
        console.log(`Cache cleanup: removed ${cleaned} expired entries`);
      }
    }, intervalMs);
  }
}

/**
 * Specialized product cache
 */
class ProductCache extends CacheManager {
  constructor() {
    super(600000); // 10 minutes default TTL
  }

  /**
   * Get product by ID
   * @param {string} productId - Product ID
   * @returns {Object|null}
   */
  getProduct(productId) {
    return this.get(`product:${productId}`);
  }

  /**
   * Set product
   * @param {string} productId - Product ID
   * @param {Object} product - Product data
   */
  setProduct(productId, product, ttl) {
    this.set(`product:${productId}`, product, ttl);
  }

  /**
   * Invalidate product
   * @param {string} productId - Product ID
   */
  invalidateProduct(productId) {
    this.delete(`product:${productId}`);
  }

  /**
   * Get products by category
   * @param {string} category - Category name
   * @returns {Array|null}
   */
  getByCategory(category) {
    return this.get(`products:category:${category}`);
  }

  /**
   * Set products by category
   * @param {string} category - Category name
   * @param {Array} products - Products array
   */
  setByCategory(category, products, ttl) {
    this.set(`products:category:${category}`, products, ttl);
  }

  /**
   * Invalidate category
   * @param {string} category - Category name
   */
  invalidateCategory(category) {
    this.delete(`products:category:${category}`);
  }

  /**
   * Invalidate all product caches
   */
  invalidateAll() {
    const keys = this.keys();
    keys.forEach(key => {
      if (key.startsWith('product:') || key.startsWith('products:')) {
        this.delete(key);
      }
    });
  }
}

/**
 * Specialized user cache
 */
class UserCache extends CacheManager {
  constructor() {
    super(300000); // 5 minutes default TTL
  }

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Object|null}
   */
  getUser(userId) {
    return this.get(`user:${userId}`);
  }

  /**
   * Set user
   * @param {string} userId - User ID
   * @param {Object} user - User data
   */
  setUser(userId, user, ttl) {
    this.set(`user:${userId}`, user, ttl);
  }

  /**
   * Invalidate user
   * @param {string} userId - User ID
   */
  invalidateUser(userId) {
    this.delete(`user:${userId}`);
  }
}

/**
 * Cache middleware factory
 * @param {CacheManager} cacheManager - Cache manager instance
 * @param {Function} keyGenerator - Function to generate cache key
 * @param {number} ttl - Time to live for cached responses
 * @returns {Function} - Express middleware
 */
const cacheMiddleware = (cacheManager, keyGenerator, ttl) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = keyGenerator(req);
    const cachedResponse = cacheManager.get(key);

    if (cachedResponse) {
      return res.json({
        ...cachedResponse,
        cached: true,
        cachedAt: new Date().toISOString()
      });
    }

    // Wrap res.json to cache response
    const originalJson = res.json;
    res.json = function(data) {
      cacheManager.set(key, data, ttl);
      return originalJson.call(this, data);
    };

    next();
  };
};

// Global cache instances
const productCache = new ProductCache();
const userCache = new UserCache();
const generalCache = new CacheManager();

module.exports = {
  CacheManager,
  ProductCache,
  UserCache,
  cacheMiddleware,
  productCache,
  userCache,
  generalCache
};
