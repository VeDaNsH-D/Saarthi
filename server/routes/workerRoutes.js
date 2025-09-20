const express = require('express');
const Worker = require('../models/Worker');
const MedicalRecord =require('../models/MedicalRecord');
const router = express.Router();

// --- TWILIO SETUP ---
const twilio = require('twilio');
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// --- API ENDPOINTS ---
// IMPORTANT: Express matches routes in the order they are defined.
// More specific routes (e.g., '/register') must be defined before
// more general, parameterized routes (e.g., '/:workerId') to avoid conflicts.

// Route to register a new worker. This is a specific route.
router.post('/register', async (req, res) => {
    try {
        const lastWorker = await Worker.findOne().sort({ createdAt: -1 });
        let newIdNumber = 1;
        if (lastWorker) { newIdNumber = parseInt(lastWorker.workerId.split('-')[2]) + 1; }
        const workerId = `MHW-KL-${String(newIdNumber).padStart(6, '0')}`;
        const newWorker = new Worker({ ...req.body, workerId });
        await newWorker.save();
        res.status(201).json(newWorker);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Route to verify an OTP and grant access. This is a specific route.
router.post('/verify-otp', async (req, res) => {
    const { workerId, otp } = req.body;
    try {
        const worker = await Worker.findOne({
            workerId: workerId,
            otp: otp,
            otpExpires: { $gt: Date.now() } // Check if OTP is correct and not expired
        });

        if (!worker) {
            return res.status(400).json({ msg: 'Invalid or expired OTP.' });
        }

        const records = await MedicalRecord.find({ worker: worker._id }).sort({ createdAt: -1 });

        worker.otp = undefined;
        worker.otpExpires = undefined;
        await worker.save();

        res.json({ worker, records });

    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Route to request an OTP. This is a more specific parameterized route.
// It comes before the general '/:workerId' route.
router.post('/request-access/:workerId', async (req, res) => {
    try {
        const worker = await Worker.findOne({ workerId: req.params.workerId });
        if (!worker) return res.status(404).json({ msg: 'Worker not found' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        worker.otp = otp;
        worker.otpExpires = otpExpires;
        await worker.save();

        await twilioClient.messages.create({
            body: `Your health record access OTP is: ${otp}. It is valid for 10 minutes.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: worker.contactNumber
        });

        res.json({ msg: 'OTP sent successfully.' });

    } catch (err) {
        console.error("OTP Send Error:", err);
        res.status(500).send('Server Error');
    }
});

// Route to get a worker's profile. This is a general parameterized route.
// It must be last to avoid incorrectly matching other routes.
router.get('/:workerId', async (req, res) => {
    try {
        const worker = await Worker.findOne({ workerId: req.params.workerId });
        if (!worker) {
            return res.status(404).json({ msg: 'Worker not found' });
        }
        const records = await MedicalRecord.find({ worker: worker._id }).sort({ createdAt: -1 });
        res.json({ worker, records });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
