const express = require('express');
const Alert = require('../models/Alert');
const router = express.Router();

// Get all alerts for the Govt Dashboard
router.get('/alerts', async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ timestamp: -1 });
        res.json(alerts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
