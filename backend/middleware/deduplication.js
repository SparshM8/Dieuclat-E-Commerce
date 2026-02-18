/**
 * Request Deduplication Middleware
 * Prevents duplicate requests from being processed within a time window
 */

/**
 * Simple in-memory request cache
 * In production, consider using Redis for distributed systems
 */
class RequestDeduplicator {
  constructor(windowMs = 1000) {
    this.cache = new Map();
    this.windowMs = windowMs;
    this.cleanupInterval = setInterval(() => this.cleanup(), windowMs * 2);
  }

  /**
   * Generate cache key from request
   * @param {Object} req - Express request object
   * @returns {string} - Cache key
   */
  generateKey(req) {
    const method = req.method;
    const url = req.originalUrl;
    const userId = req.user ? req.user._id : 'anonymous';
    const body = req.body ? JSON.stringify(req.body) : '';

    return `${method}:${url}:${userId}:${body}`;
  }

  /**
   * Check if request is duplicate
   * @param {string} key - Request cache key
   * @returns {boolean} - Whether this is a duplicate
   */
  isDuplicate(key) {
    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      const now = Date.now();
      const isWithinWindow = now - entry.timestamp < this.windowMs;

      if (isWithinWindow) {
        return true;
      }
    }

    return false;
  }

  /**
   * Record request in cache
   * @param {string} key - Request cache key
   * @param {*} response - Response data to cache
   */
  recordRequest(key, response) {
    this.cache.set(key, {
      timestamp: Date.now(),
      response: response
    });
  }

  /**
   * Get cached response
   * @param {string} key - Request cache key
   * @returns {*} - Cached response or null
   */
  getResponse(key) {
    const entry = this.cache.get(key);
    if (entry && Date.now() - entry.timestamp < this.windowMs) {
      return entry.response;
    }
    return null;
  }

  /**
   * Clean up expired cache entries
   */
  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.windowMs) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Destroy deduplicator and cleanup interval
   */
  destroy() {
    clearInterval(this.cleanupInterval);
    this.cache.clear();
  }
}

/**
 * Express middleware for request deduplication
 * @param {number} windowMs - Time window to check for duplicates
 * @returns {Function} - Express middleware
 */
const deduplicationMiddleware = (windowMs = 1000) => {
  const deduplicator = new RequestDeduplicator(windowMs);

  return (req, res, next) => {
    // Only deduplicate POST, PUT, DELETE requests
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      return next();
    }

    const key = deduplicator.generateKey(req);

    if (deduplicator.isDuplicate(key)) {
      const cachedResponse = deduplicator.getResponse(key);
      return res.status(409).json({
        success: false,
        message: 'Duplicate request detected. Request already processed.',
        isDuplicate: true,
        cachedResponse: cachedResponse
      });
    }

    // Wrap res.json to capture response
    const originalJson = res.json;
    res.json = function(data) {
      deduplicator.recordRequest(key, data);
      return originalJson.call(this, data);
    };

    next();
  };
};

module.exports = {
  RequestDeduplicator,
  deduplicationMiddleware
};
