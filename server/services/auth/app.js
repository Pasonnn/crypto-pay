// ./services/auth/app.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv');
const authRoutes = require('./api/authRoutes');

env.config();

// Load environment variables
const PORT = process.env.AUTH_PORT || 3001;

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});

module.exports = app;
