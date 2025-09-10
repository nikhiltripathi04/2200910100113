require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Log } = require('./utils/log');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/urlshortener'; // Use environment variable

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    Log('backend', 'info', 'db', 'MongoDB connection successful');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    Log('backend', 'fatal', 'db', `MongoDB connection failed: ${err.message}`);
    process.exit(1);
  });

// Routes
const urlRoutes = require('./routes/urlRoutes');
const redirectRoute = require('./routes/redirect');
app.use('/api/url', urlRoutes);
app.use('/', redirectRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  Log('backend', 'info', 'service', `Server started on port ${PORT}`);
});