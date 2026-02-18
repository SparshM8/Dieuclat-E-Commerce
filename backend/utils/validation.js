/**
 * Input Sanitization and Validation Utilities
 * Provides common validation patterns and sanitization functions
 */

const xss = require('xss');

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return xss(input.trim());
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate strong password
 * Requires: min 8 chars, uppercase, lowercase, number, special character
 * @param {string} password - Password to validate
 * @returns {Object} - { isValid: boolean, message: string }
 */
const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter'
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter'
    };
  }

  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }

  if (!/[@$!%*?&]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one special character (@$!%*?&)'
    };
  }

  return { isValid: true, message: 'Password is valid' };
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Whether phone is valid
 */
const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is valid
 */
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Sanitize object properties recursively
 * @param {Object} obj - Object to sanitize
 * @returns {Object} - Sanitized object
 */
const sanitizeObject = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (obj !== null && typeof obj === 'object') {
    const sanitized = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }

  if (typeof obj === 'string') {
    return sanitizeInput(obj);
  }

  return obj;
};

/**
 * Validate address format
 * @param {Object} address - Address object
 * @returns {Object} - { isValid: boolean, message: string }
 */
const validateAddress = (address) => {
  const required = ['street', 'city', 'state', 'zipCode', 'country'];

  for (const field of required) {
    if (!address[field] || address[field].trim() === '') {
      return {
        isValid: false,
        message: `Address field '${field}' is required`
      };
    }
  }

  return { isValid: true, message: 'Address is valid' };
};

module.exports = {
  sanitizeInput,
  isValidEmail,
  validatePassword,
  isValidPhone,
  isValidUrl,
  sanitizeObject,
  validateAddress
};
