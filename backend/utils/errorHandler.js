/**
 * Advanced Error Handling Utilities
 * Provides custom error classes and handlers
 */

/**
 * Base custom error class
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();

    // Maintain proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      ...(process.env.NODE_ENV === 'development' && { stack: this.stack })
    };
  }
}

/**
 * Validation error class
 */
class ValidationError extends AppError {
  constructor(message = 'Validation failed', errors = []) {
    super(message, 400);
    this.errors = errors;
  }

  toJSON() {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors.map(err => ({
        field: err.field || err.param,
        message: err.message || err.msg
      })),
      timestamp: this.timestamp
    };
  }
}

/**
 * Authentication error class
 */
class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
  }
}

/**
 * Authorization error class (Forbidden)
 */
class AuthorizationError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, 403);
  }
}

/**
 * Not found error class
 */
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

/**
 * Conflict error class (e.g., duplicate entry)
 */
class ConflictError extends AppError {
  constructor(message = 'Conflict: Resource already exists') {
    super(message, 409);
  }
}

/**
 * Rate limit error class
 */
class RateLimitError extends AppError {
  constructor(message = 'Too many requests, please try again later') {
    super(message, 429);
  }
}

/**
 * Bad request error class
 */
class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

/**
 * Server error class
 */
class ServerError extends AppError {
  constructor(message = 'Internal server error', originalError = null) {
    super(message, 500);
    this.originalError = originalError;
  }

  toJSON() {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      ...(process.env.NODE_ENV === 'development' && {
        stack: this.stack,
        originalError: this.originalError?.message
      })
    };
  }
}

/**
 * Error response formatter
 * @param {Error} error - Error object
 * @returns {Object} - Formatted error response
 */
const formatErrorResponse = (error) => {
  if (error instanceof AppError) {
    return error.toJSON();
  }

  // Handle MongoDB errors
  if (error.name === 'MongoError' || error.name === 'MongoServerError') {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return new ConflictError(`${field} already exists`).toJSON();
    }
    return new ServerError('Database error occurred').toJSON();
  }

  // Handle Mongoose validation errors
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => ({
      field: err.path,
      message: err.message
    }));
    return new ValidationError('Validation failed', errors).toJSON();
  }

  // Handle Mongoose cast errors
  if (error.name === 'CastError') {
    return new BadRequestError('Invalid ID format').toJSON();
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return new AuthenticationError('Invalid token').toJSON();
  }

  if (error.name === 'TokenExpiredError') {
    return new AuthenticationError('Token has expired').toJSON();
  }

  // Default error
  return new ServerError(
    process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
    error
  ).toJSON();
};

/**
 * Safe async handler wrapper
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Express middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    const formattedError = formatErrorResponse(error);
    const statusCode = formattedError.statusCode || 500;
    res.status(statusCode).json(formattedError);
  });
};

/**
 * Error logging helper
 * @param {Error} error - Error to log
 * @param {Object} context - Additional context
 */
const logError = (error, context = {}) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error.message,
    stack: error.stack,
    context,
    environment: process.env.NODE_ENV
  };

  console.error(JSON.stringify(errorLog, null, 2));

  // In production, send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // sendToSentry(errorLog);
    // sendToDatadog(errorLog);
  }
};

/**
 * Validate request and throw ValidationError if invalid
 * @param {Object} errors - express-validator errors
 * @throws {ValidationError}
 */
const validateRequest = (errors) => {
  if (!errors.isEmpty()) {
    throw new ValidationError('Validation failed', errors.array());
  }
};

/**
 * Check user authorization and throw AuthorizationError if not authorized
 * @param {Object} user - User object
 * @param {string|Array} allowedRoles - Allowed role(s)
 * @throws {AuthorizationError}
 */
const checkAuthorization = (user, allowedRoles) => {
  if (!user) {
    throw new AuthenticationError('User not authenticated');
  }

  if (!Array.isArray(allowedRoles)) {
    allowedRoles = [allowedRoles];
  }

  if (!allowedRoles.includes(user.role)) {
    throw new AuthorizationError(
      `Only ${allowedRoles.join(' or ')} can perform this action`
    );
  }
};

/**
 * Find resource or throw NotFoundError
 * @param {*} resource - Resource to check
 * @param {string} message - Error message
 * @returns {*} - The resource if found
 * @throws {NotFoundError}
 */
const findOrFail = (resource, message = 'Resource not found') => {
  if (!resource) {
    throw new NotFoundError(message);
  }
  return resource;
};

module.exports = {
  // Error classes
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  BadRequestError,
  ServerError,
  
  // Utility functions
  formatErrorResponse,
  asyncHandler,
  logError,
  validateRequest,
  checkAuthorization,
  findOrFail
};
