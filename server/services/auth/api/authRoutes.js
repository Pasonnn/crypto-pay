// ./services/auth/api/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('./authController');

// Route for user registration - calls the register function in userController
router.post('/register', authController.register);

// Route for user login - calls the login function in userController
router.post('/login', authController.login);

// Route for user logout - calls the logout function in userController
router.post('/logout', authController.logout);

// Route for user profile - calls the getProfile function in userController
router.get('/profile', authController.getProfile);

// Route for user profile update - calls the updateProfile function in userController
router.put('/profile', authController.updateProfile);

// Route for refreshing the access token - calls the refreshToken function in userController
router.post('/refresh', authController.refreshToken);

// Export the router
module.exports = router;