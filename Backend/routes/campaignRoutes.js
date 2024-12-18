const express = require('express');
const Campaign = require('../models/Campaign');

const router = express.Router();

// Create Campaign
router.post('/', async (req, res) => {
    const { title, description, goal, user } = req.body;
  
    if (!title || !description || !goal || !user) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const campaign = await Campaign.create({ title, description, goal, user });
      res.status(201).json(campaign);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
// Get All Campaigns
router.get('/', async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate('user', 'name');
        res.json(campaigns);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
