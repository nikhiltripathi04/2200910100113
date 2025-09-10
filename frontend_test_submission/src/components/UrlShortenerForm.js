import React, { useState } from 'react';
import axios from 'axios';
import { logFrontend } from '../utils/log';

const UrlShortenerForm = ({ onUrlShortened }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customShortcut, setCustomShortcut] = useState('');
  const [expiry, setExpiry] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!originalUrl || !isValidUrl(originalUrl)) {
      const message = 'Please enter a valid URL.';
      setError(message);
      await logFrontend('error', 'component', `Invalid URL submitted: ${originalUrl}`);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/url/shorten', {
        originalUrl,
        customShortcut: customShortcut || undefined,
        expiry: expiry || undefined,
      });

      onUrlShortened(response.data);
      await logFrontend('info', 'component', `URL shortened successfully: ${originalUrl}`);
    } catch (err) {
      const errorMessage = err.response ? err.response.data.error : 'Network error occurred.';
      setError(errorMessage);
      await logFrontend('error', 'component', `Failed to shorten URL: ${errorMessage}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Shorten Your URL</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="originalUrl">Original URL</label>
          <input
            type="text"
            id="originalUrl"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="e.g., https://www.google.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customShortcut">Custom Shortcut (Optional)</label>
          <input
            type="text"
            id="customShortcut"
            value={customShortcut}
            onChange={(e) => setCustomShortcut(e.target.value)}
            placeholder="e.g., my-custom-link"
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiry">Expiry (Optional, in minutes)</label>
          <input
            type="number"
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="e.g., 60"
          />
        </div>
        <button type="submit">Shorten</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UrlShortenerForm;