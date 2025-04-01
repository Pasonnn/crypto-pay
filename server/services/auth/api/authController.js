const { User, RefreshToken } = require('./authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email address' });
        }
        
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT tokens
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Save refresh token to database
        const refreshTokenDoc = new RefreshToken({
            userId: user._id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        });
        await refreshTokenDoc.save();

        res.json({message: 'Logged in successfully', token, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// User logout
exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        // Check if refresh token exists
        const refreshTokenDoc = await RefreshToken.findOne({ token: refreshToken });
        if (!refreshTokenDoc) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Delete refresh token from database
        refreshTokenDoc.revoked = true;
        await refreshTokenDoc.save();

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
};

// User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.json({ message: 'Profile fetched successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

// User Profile Update
exports.updateProfile = async (req, res) => {
    try {
        const { name, password } = req.body;
        
        // Create an update object with only the fields that were provided
        const updateData = {};
        if (name) updateData.name = name;
        
        // If password is provided, hash it before saving
        if (password) {
            // Never store plaintext passwords in the database
            updateData.password = await bcrypt.hash(password, 10);
        }
        
        // Only update the fields that were provided in the request
        const user = await User.findByIdAndUpdate(
            req.user.userId, 
            updateData, 
            { new: true, select: '-password -refreshToken' }
        );
        
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        // Check if refresh token exists
        const refreshTokenDoc = await RefreshToken.findOne({ token: refreshToken });
        console.log(refreshTokenDoc);
        if (!refreshTokenDoc) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        if (refreshTokenDoc.revoked) {
            return res.status(401).json({ message: 'Refresh token revoked' });
        }

        // Generate a new access token
        const token = jwt.sign({ userId: refreshTokenDoc.userId}, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Token refreshed successfully', token });
        
    } catch (error) {
        res.status(500).json({ message: 'Error refreshing token', error: error.message });
    }
};
