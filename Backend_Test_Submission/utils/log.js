const axios = require('axios');
const AUTH_TOKEN = process.env.LOG_AUTH_TOKEN;

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

module.exports = { Log };