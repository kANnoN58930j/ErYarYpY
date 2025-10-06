// 代码生成时间: 2025-10-06 20:17:44
// Import the necessary modules
const dompurify = require('dompurify')(new require('jsdom').JSDOM().window);

/**
 * Sanitize the user input to prevent XSS attacks.
 *
 * @param {string} input - The user input to be sanitized.
 * @returns {string} - The sanitized input.
 */
function sanitizeInput(input) {
  // Check if input is a string
  if (typeof input !== 'string') {
    throw new Error('Input must be a string.');
  }

  // Use dompurify to sanitize the input
  return dompurify.sanitize(input);
}

// Example usage of the sanitizeInput function
try {
  const userInput = '<script>alert("XSS")</script>'; // Malicious input
  const safeInput = sanitizeInput(userInput);
  console.log('Safe Input:', safeInput); // Output should not include the script tag
} catch (error) {
  console.error('Error sanitizing input:', error.message);
}
