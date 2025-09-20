const express = require('express');
const Alert = require('../models/Alert');
const router = express.Router();

// GET /api/gov/alerts - Get all individual alerts
router.get('/alerts', async (req, res) => {
    try {
        const alerts = await Alert.find().sort({ timestamp: -1 });
        res.json(alerts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- NEW HOTSPOT DETECTION ENDPOINT ---
// GET /api/gov/trends - Analyze data to find potential outbreaks
router.get('/trends', async (req, res) => {
    try {
        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

        // This is our "Analytics AI" model using a database query
        const hotspots = await Alert.aggregate([
            // 1. Filter for recent alerts in the last 14 days
            { $match: { timestamp: { $gte: fourteenDaysAgo } } },

            // 2. Group by location and disease, and count the cases
            {
                $group: {
                    _id: {
                        district: '$location.district',
                        panchayat: '$location.panchayat',
                        disease: '$disease',
                    },
                    count: { $sum: 1 },
                },
            },

            // 3. Filter for groups with 3 or more cases (our hotspot definition)
            { $match: { count: { $gte: 3 } } },

            // 4. Sort to show the highest counts first
            { $sort: { count: -1 } }
        ]);

        res.json(hotspots);

    } catch (err) {
        console.error("Error fetching trends:", err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
