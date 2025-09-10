const express = require('express');
const router = express.Router();
const URL = require('../models/URL');
const { Log } = require('../utils/log');
const geoip = require('geoip-lite');

const handleResponse = async (res, status, message, data, level = 'info', pkg = 'handler') => {
  await Log('backend', level, pkg, message);
  res.status(status).send(data);
};

// @route   GET /:shortUrlId
// @desc    Redirect to original URL and track clicks
router.get('/:shortUrlId', async (req, res) => {
  try {
    const url = await URL.findOne({ shortUrlId: req.params.shortUrlId });

    if (!url) {
      return handleResponse(res, 404, `Redirect for non-existent ID: ${req.params.shortUrlId}`, 'URL not found', 'error');
    }

    if (new Date() > url.expiryDate) {
      return handleResponse(res, 410, `Expired URL accessed: ${req.params.shortUrlId}`, 'URL has expired.', 'warn');
    }

    const clientIp = req.ip || req.headers['x-forwarded-for'];
    let geo = {};
    if (clientIp) {
      const location = geoip.lookup(clientIp);
      if (location) {
        geo = {
          country: location.country,
          city: location.city
        };
      }
    }

    // Update click count and history
    url.totalClicks++;
    const clickInfo = {
      ipAddress: clientIp,
      source: req.headers['user-agent'],
      geo: geo
    };
    url.clickHistory.push(clickInfo);
    await url.save();

    await Log('backend', 'info', 'handler', `Redirecting from ${req.params.shortUrlId} to ${url.originalUrl}`);
    return res.redirect(url.originalUrl);

  } catch (err) {
    return handleResponse(res, 500, `Server error during redirection: ${err.message}`, 'Server error', 'error');
  }
});

module.exports = router;