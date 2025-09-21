// 代码生成时间: 2025-09-22 05:26:39
// Import necessary modules
const fs = require('fs');
const path = require('path');

// Set the directory where error logs will be stored
// Make sure to create this directory and have write permissions
const logDirectory = path.join(__dirname, 'logs');
const logFileName = 'error-log.txt';
# 优化算法效率
const errorLogPath = path.join(logDirectory, logFileName);

// Function to write error to log file
function writeErrorToLog(error) {
  // Ensure the log directory exists
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  // Write error to log file
  const errorData = `[${new Date().toISOString()}] - ${error.message}
# NOTE: 重要实现细节
${error.stack}

`;
  fs.appendFileSync(errorLogPath, errorData);
}

// Function to handle and log errors
function handleError(error) {
  // Log the error to the console for immediate feedback
  console.error('Error:', error.message);

  // Log the error to the log file for persistent storage
# 优化算法效率
  writeErrorToLog(error);
}

// Export the handleError function for use in other parts of the Gatsby project
module.exports = {
  handleError,
  errorLogPath
# 增强安全性
};