// ./services/auth/app.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./api/authRoutes');

// Load environment variables
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Auth Service | Connected to MongoDB'))
.catch((err) => console.error('Auth Service | Failed to connect to MongoDB:', err));

// Define the main route
app.get('/', (req, res) => {
    res.send('Auth Service is running');
});

// Use auth routes
app.use('/auth', authRoutes);

//Start the server
const port = process.env.AUTH_SERVICE_PORT || 3001;
app.listen(port, () => {
    console.log(`Auth Service is running on port ${port}`);
});
