const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret';

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
            res.json({ user, token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
