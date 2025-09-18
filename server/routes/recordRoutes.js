const express = require('express');
const MedicalRecord = require('../models/MedicalRecord');
const Worker = require('../models/Worker');
const Alert = require('../models/Alert');
const router = express.Router();

const NOTIFIABLE_DISEASES = ['tuberculosis', 'malaria', 'dengue', 'covid-19', 'cholera', 'leprosy'];

router.post('/add', async (req, res) => {
    const { workerId, doctorName, diagnosis, symptoms, prescription } = req.body;
    try {
        const worker = await Worker.findOne({ workerId });
        if (!worker) return res.status(404).json({ msg: 'Worker not found' });

        const isNotifiable = NOTIFIABLE_DISEASES.includes(diagnosis.toLowerCase());

        const newRecord = new MedicalRecord({
            worker: worker._id,
            doctorName,
            diagnosis,
            symptoms,
            prescription,
            isNotifiable,
            notifiableDisease: isNotifiable ? diagnosis : null,
        });

        await newRecord.save();

        // If notifiable, create an alert for the government dashboard
        if (isNotifiable) {
            const newAlert = new Alert({
                workerId: worker.workerId,
                disease: diagnosis,
                location: worker.currentLocation,
            });
            await newAlert.save();
        }

        res.status(201).json(newRecord);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
