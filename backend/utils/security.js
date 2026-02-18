/**
 * Security Utilities
 * Implements security best practices and defensive measures
 */

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} - Hashed password
 */
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
};

/**
 * Compare plain text password with hashed password
 * @param {string} plainPassword - Plain text password
 * @param {string} hashedPassword - Hashed password
 * @returns {Promise<boolean>} - Whether passwords match
 */
const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords: ' + error.message);
  }
};

/**
 * Generate a secure random token
 * @param {number} length - Token length in bytes
 * @returns {string} - Hex encoded token
 */
const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Hash a token (for storage)
 * @param {string} token - Token to hash
 * @returns {string} - Hashed token
 */
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

/**
 * Rate limiter helper - track failed attempts
 * @param {Object} attempts - Object to store attempt counts
 * @param {string} key - Identifier (IP, email, etc)
 * @param {number} maxAttempts - Maximum allowed attempts
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} - { allowed: boolean, remaining: number, resetTime: Date }
 */
const checkRateLimit = (attempts, key, maxAttempts = 5, windowMs = 900000) => {
  const now = Date.now();
  const userAttempts = attempts[key];

  if (!userAttempts) {
    attempts[key] = { count: 1, resetTime: now + windowMs };
    return { allowed: true, remaining: maxAttempts - 1, resetTime: new Date(now + windowMs) };
  }

  if (now > userAttempts.resetTime) {
    // Reset attempts if window expired
    attempts[key] = { count: 1, resetTime: now + windowMs };
    return { allowed: true, remaining: maxAttempts - 1, resetTime: new Date(now + windowMs) };
  }

  userAttempts.count++;

  if (userAttempts.count > maxAttempts) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: new Date(userAttempts.resetTime),
      message: `Too many attempts. Please try again after ${Math.ceil((userAttempts.resetTime - now) / 1000)} seconds`
    };
  }

  return {
    allowed: true,
    remaining: maxAttempts - userAttempts.count,
    resetTime: new Date(userAttempts.resetTime)
  };
};

/**
 * Generate password reset token that expires
 * @returns {Object} - { token: string, hash: string, expiresAt: Date }
 */
const generatePasswordResetToken = () => {
  const token = generateToken();
  const hash = hashToken(token);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  return { token, hash, expiresAt };
};

/**
 * Validate JWT claims
 * @param {Object} decoded - Decoded JWT payload
 * @returns {Object} - { isValid: boolean, message: string }
 */
const validateJWTClaims = (decoded) => {
  if (!decoded.id) {
    return { isValid: false, message: 'Missing user ID in token' };
  }

  if (decoded.exp && Date.now() >= decoded.exp * 1000) {
    return { isValid: false, message: 'Token has expired' };
  }

  return { isValid: true, message: 'Token is valid' };
};

/**
 * Sanitize output for JSON responses (prevent sensitive data leaks)
 * @param {Object} user - User object
 * @returns {Object} - Sanitized user object
 */
const sanitizeUserOutput = (user) => {
  if (!user) return null;

  const { password, emailVerificationToken, passwordResetToken, ...sanitized } = user.toObject?.() || user;
  return sanitized;
};

/**
 * Validate sensitive operations
 * @param {Object} user - User object
 * @param {string} operation - Operation type (delete, update, etc)
 * @returns {Object} - { allowed: boolean, message: string }
 */
const validateSensitiveOperation = (user, operation) => {
  if (!user) {
    return { allowed: false, message: 'User not authenticated' };
  }

  if (!user.isActive) {
    return { allowed: false, message: 'Account is deactivated' };
  }

  if (operation === 'delete' && user.role !== 'admin') {
    return { allowed: false, message: 'Only admins can delete' };
  }

  return { allowed: true, message: 'Operation allowed' };
};

/**
 * Generate CSRF token
 * @returns {string} - CSRF token
 */
const generateCSRFToken = () => {
  return generateToken(32);
};

/**
 * Validate CSRF token
 * @param {string} token - Token from request
 * @param {string} sessionToken - Stored session token
 * @returns {boolean} - Whether token is valid
 */
const validateCSRFToken = (token, sessionToken) => {
  if (!token || !sessionToken) return false;
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(sessionToken));
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
  hashToken,
  checkRateLimit,
  generatePasswordResetToken,
  validateJWTClaims,
  sanitizeUserOutput,
  validateSensitiveOperation,
  generateCSRFToken,
  validateCSRFToken
};
