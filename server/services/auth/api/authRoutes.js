// ./services/auth/api/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('./authController');
const { authenticateToken } = require('./middlewares');

// Route for user registration - calls the register function in authController
router.post('/register', authController.register);

// Route for user login - calls the login function in authController
router.post('/login', authController.login);

// Route for user logout - calls the logout function in authController
router.post('/logout', authController.logout);

// Route for user profile - calls the getProfile function in authController
router.get('/profile', authenticateToken, authController.getProfile);

// Route for user profile update - calls the updateProfile function in authController
router.put('/profile', authenticateToken, authController.updateProfile);

// Route for refreshing the access token - calls the refreshToken function in authController
router.post('/refresh', authController.refreshToken);

// Export the router
module.exports = router;