// index.js

require('dotenv').config();
const axios = require('axios');

const AUTH_TOKEN = process.env.LOG_AUTH_TOKEN;

/**
 * Sends a log entry to the evaluation service.
 * @param {string} stack - The application stack ('backend' or 'frontend').
 * @param {string} level - The log level ('debug', 'info', 'warn', 'error', 'fatal').
 * @param {string} pkg - The application package name.
 * @param {string} message - The log message.
 */
const Log = async (stack, level, pkg, message) => {
  if (!AUTH_TOKEN) {
    console.error('Authorization token not found. Cannot send log.');
    return;
  }
  
  try {
    const logData = {
      stack: stack,
      level: level,
      package: pkg,
      message: message
    };
    await axios.post('http://20.244.56.144/evaluation-service/logs', logData, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`
      }
    });
    console.log('Log entry sent successfully.');
  } catch (error) {
    console.error('Failed to send log entry:', error.response ? error.response.data : error.message);
  }
};

// Example usage to test the function
Log('backend', 'info', 'service', 'Test log from logging_middleware folder.');

module.exports = { Log };