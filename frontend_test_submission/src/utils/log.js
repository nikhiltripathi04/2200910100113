import axios from 'axios';
const AUTH_TOKEN = process.env.REACT_APP_LOG_AUTH_TOKEN;

export const logFrontend = async (level, pkg, message) => {
  if (!AUTH_TOKEN) {
    console.error('Authorization token not found. Cannot send log.');
    return;
  }
  
  try {
    const logData = {
      stack: 'frontend',
      level: level,
      package: pkg,
      message: message
    };
    await axios.post('http://20.244.56.144/evaluation-service/logs', logData, {
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`
      }
    });
    console.log('Frontend log entry sent successfully.');
  } catch (error) {
    console.error('Failed to send frontend log:', error.response ? error.response.data : error.message);
  }
};