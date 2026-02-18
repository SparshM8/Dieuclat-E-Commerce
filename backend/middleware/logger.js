const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create a write stream for logs
const logFile = fs.createWriteStream(path.join(logsDir, 'app.log'), { flags: 'a' });

/**
 * Request logging middleware
 * Logs all incoming requests with method, URL, status, response time, and user info
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Override res.json to capture response details
  const originalJson = res.json;
  res.json = function(data) {
    const duration = Date.now() - start;
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('user-agent'),
      ip: req.ip,
      userId: req.user ? req.user._id : 'anonymous',
      responseSize: JSON.stringify(data).length
    };

    logFile.write(JSON.stringify(logEntry) + '\n');
    console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - ${logEntry.status} (${logEntry.duration})`);

    return originalJson.call(this, data);
  };

  next();
};

/**
 * Error logging middleware
 * Logs all errors with full stack trace
 */
const errorLogger = (err, req, res, next) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    error: err.message,
    stack: err.stack,
    userId: req.user ? req.user._id : 'anonymous',
    ip: req.ip
  };

  logFile.write(JSON.stringify(errorLog) + '\n');
  console.error(`[ERROR] ${errorLog.timestamp}: ${err.message}`);

  next(err);
};

module.exports = {
  requestLogger,
  errorLogger,
  logFile
};
