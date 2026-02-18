/**
 * Consistent API Response Utilities
 * Ensures all API responses follow a standardized format
 */

/**
 * Send a successful response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {string} message - Success message
 * @param {*} data - Response data
 */
const sendSuccess = (res, statusCode = 200, message = 'Success', data = null) => {
  res.status(statusCode).json({
    success: true,
    message,
    data: data || undefined
  });
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {string} message - Error message
 * @param {Array} errors - Detailed error array (optional)
 */
const sendError = (res, statusCode = 500, message = 'Server Error', errors = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors })
  });
};

/**
 * Validation error response
 * @param {Object} res - Express response object
 * @param {Array} errors - Express-validator errors array
 */
const sendValidationError = (res, errors) => {
  res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }))
  });
};

/**
 * Send paginated response
 * @param {Object} res - Express response object
 * @param {Array} data - Data array
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items count
 * @param {string} message - Success message
 */
const sendPaginatedSuccess = (res, data, page, limit, total, message = 'Success') => {
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    success: true,
    message,
    data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages,
      hasMore: page < totalPages
    }
  });
};

/**
 * Async error wrapper for route handlers
 * Wraps async functions to catch errors and pass them to error handling middleware
 * @param {Function} fn - Async route handler function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  sendSuccess,
  sendError,
  sendValidationError,
  sendPaginatedSuccess,
  asyncHandler
};
