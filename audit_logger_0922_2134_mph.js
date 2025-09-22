// 代码生成时间: 2025-09-22 21:34:12
// audit_logger.js
// This module is responsible for handling audit logs in a Gatsby application.

const fs = require('fs');
const path = require('path');

// Define the path to the directory where logs will be stored
const LOG_DIR = path.join(__dirname, 'logs');

// Ensure the log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * Writes an audit log entry to a file.
 * @param {string} message - The message to be logged.
 * @param {string} level - The log level (e.g., 'INFO', 'WARNING', 'ERROR').
 * @returns {Promise<boolean>} - A promise that resolves to true if the log was successfully written.
 */
async function writeAuditLog(message, level = 'INFO') {
  try {
    // Create a timestamp for the log entry
    const timestamp = new Date().toISOString();
    
    // Prepare the log entry
    const logEntry = `${timestamp} - ${level}: ${message}
`;
    
    // Get the filename for the log
    const logFile = path.join(LOG_DIR, 'audit.log');
    
    // Append the log entry to the file
    fs.appendFileSync(logFile, logEntry, 'utf8');

    // Return true to indicate success
    return true;
  } catch (error) {
    // Handle any errors that occur during logging
    console.error('Failed to write audit log:', error);
    return false;
  }
}

// Export the writeAuditLog function for use in other parts of the Gatsby application
module.exports = { writeAuditLog };
