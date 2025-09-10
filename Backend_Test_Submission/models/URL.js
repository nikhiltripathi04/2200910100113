const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  ipAddress: String,
  source: String,
  geo: {
    country: String,
    city: String
  }
});

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrlId: { type: String, required: true, unique: true },
  expiryDate: { type: Date, required: true },
  totalClicks: { type: Number, default: 0 },
  clickHistory: [clickSchema]
});

module.exports = mongoose.model('URL', urlSchema);