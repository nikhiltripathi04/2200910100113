const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const URL = require('../models/URL');
const { Log } = require('../utils/log');

const handleResponse = async (res, status, message, data, level = 'info', pkg = 'handler') => {
  await Log('backend', level, pkg, message);
  res.status(status).json(data);
};

// @route   POST /api/url/shorten
// @desc    Create a short URL
router.post('/shorten', async (req, res) => {
  const { originalUrl, customShortcut, expiry } = req.body;

  if (!originalUrl || !validUrl.isUri(originalUrl)) {
    return handleResponse(res, 400, 'Invalid or missing original URL.', { error: 'Invalid original URL' }, 'error');
  }

  try {
    let shortUrlId = customShortcut || shortid.generate();
    const expiryDate = expiry ? new Date(Date.now() + parseInt(expiry) * 60000) : new Date(Date.now() + 30 * 60000);

    if (customShortcut) {
      const existingUrl = await URL.findOne({ shortUrlId: customShortcut });
      if (existingUrl) {
        return handleResponse(res, 409, `Custom shortcut "${customShortcut}" already in use.`, { error: 'Custom shortcut already in use' }, 'error');
      }
    }

    const newUrl = new URL({ originalUrl, shortUrlId, expiryDate });
    await newUrl.save();

    const shortUrl = `${req.protocol}://${req.get('host')}/${newUrl.shortUrlId}`;
    return handleResponse(res, 201, `Short URL created successfully for ${originalUrl}`, { shortUrl, expiryDate: newUrl.expiryDate });
  } catch (err) {
    return handleResponse(res, 500, `Server error during URL creation: ${err.message}`, { error: 'Server error' }, 'fatal', 'db');
  }
});

// @route   GET /api/url/statistics/:shortUrlId
// @desc    Get URL statistics
router.get('/statistics/:shortUrlId', async (req, res) => {
  try {
    const url = await URL.findOne({ shortUrlId: req.params.shortUrlId });
    if (!url) {
      return handleResponse(res, 404, `Statistics requested for non-existent ID: ${req.params.shortUrlId}`, { error: 'Short URL not found' }, 'error');
    }

    return handleResponse(res, 200, `Statistics retrieved for ID: ${req.params.shortUrlId}`, {
      originalUrl: url.originalUrl,
      totalClicks: url.totalClicks,
      clickHistory: url.clickHistory,
      creationDate: url._id.getTimestamp(),
      expiryDate: url.expiryDate
    });
  } catch (err) {
    return handleResponse(res, 500, `Server error retrieving statistics: ${err.message}`, { error: 'Server error' }, 'error');
  }
});

module.exports = router;