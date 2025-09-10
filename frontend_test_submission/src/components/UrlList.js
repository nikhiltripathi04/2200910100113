import React, { useState } from 'react';
import UrlStatistics from './UrlStatistics';

const UrlList = ({ urls }) => {
  const [selectedUrlId, setSelectedUrlId] = useState(null);

  if (urls.length === 0) {
    return <p>No URLs have been shortened yet.</p>;
  }

  return (
    <div className="url-list-container">
      <h2>Your Shortened URLs</h2>
      <ul>
        {urls.map((url, index) => (
          <li key={index} className="url-item">
            <div className="url-info">
              <p>Original: <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></p>
              <p>Short: <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></p>
              <p>Expiry: {new Date(url.expiryDate).toLocaleString()}</p>
              <button onClick={() => setSelectedUrlId(url.shortUrl.split('/').pop())}>
                View Statistics
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {selectedUrlId && (
        <div className="stats-modal">
          <button onClick={() => setSelectedUrlId(null)}>Close</button>
          <UrlStatistics shortUrlId={selectedUrlId} />
        </div>
      )}
    </div>
  );
};

export default UrlList;