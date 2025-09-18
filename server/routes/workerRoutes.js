const express = require('express');
const Worker = require('../models/Worker');
const MedicalRecord = require('../models/MedicalRecord');
const router = express.Router();

// Register a new worker
router.post('/register', async (req, res) => {
    try {
        const lastWorker = await Worker.findOne().sort({ createdAt: -1 });
        let newIdNumber = 1;
        if (lastWorker) {
            newIdNumber = parseInt(lastWorker.workerId.split('-')[2]) + 1;
        }
        const workerId = `MHW-KL-${String(newIdNumber).padStart(6, '0')}`;

        const newWorker = new Worker({ ...req.body, workerId });
        await newWorker.save();
        res.status(201).json(newWorker);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Get worker details and their medical history
router.get('/:workerId', async (req, res) => {
    try {
        const worker = await Worker.findOne({ workerId: req.params.workerId });
        if (!worker) return res.status(404).json({ msg: 'Worker not found' });

        const records = await MedicalRecord.find({ worker: worker._id }).sort({ createdAt: -1 });
        res.json({ worker, records });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
