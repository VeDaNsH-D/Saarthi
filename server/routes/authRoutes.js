const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const router = express.Router();

// NOTE: In a real app, registration would be a secure, admin-only process.
// For this hackathon, we can leave it open.
router.post('/register', async (req, res) => {
    const { username, password, fullName, registrationNumber } = req.body;
    try {
        let doctor = await Doctor.findOne({ username });
        if (doctor) return res.status(400).json({ msg: 'Doctor already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        doctor = new Doctor({ username, password: hashedPassword, fullName, registrationNumber });
        await doctor.save();
        res.status(201).send('Doctor registered');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const doctor = await Doctor.findOne({ username });
        if (!doctor) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { doctor: { id: doctor.id, name: doctor.fullName } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.json({ token, doctorName: doctor.fullName });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
