import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logFrontend } from '../utils/log';

const UrlStatistics = ({ shortUrlId }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/url/statistics/${shortUrlId}`);
        setStats(response.data);
        logFrontend('info', 'component', `Statistics fetched for ID: ${shortUrlId}`);
      } catch (err) {
        const errorMessage = err.response ? err.response.data.error : 'Network error occurred.';
        setError(errorMessage);
        logFrontend('error', 'component', `Failed to fetch stats for ID: ${shortUrlId}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [shortUrlId]);

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!stats) return <p>No statistics available.</p>;

  return (
    <div className="stats-container">
      <h3>Statistics for {shortUrlId}</h3>
      <p><strong>Original URL:</strong> <a href={stats.originalUrl} target="_blank" rel="noopener noreferrer">{stats.originalUrl}</a></p>
      <p><strong>Total Clicks:</strong> {stats.totalClicks}</p>
      <p><strong>Created On:</strong> {new Date(stats.creationDate).toLocaleString()}</p>
      <p><strong>Expires On:</strong> {new Date(stats.expiryDate).toLocaleString()}</p>
      
      {stats.clickHistory.length > 0 && (
        <>
          <h4>Click History:</h4>
          <ul>
            {stats.clickHistory.map((click, index) => (
              <li key={index}>
                <p><strong>Timestamp:</strong> {new Date(click.timestamp).toLocaleString()}</p>
                <p><strong>IP Address:</strong> {click.ipAddress}</p>
                {/*  */}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UrlStatistics;