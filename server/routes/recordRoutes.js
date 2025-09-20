const express = require('express');
const MedicalRecord = require('../models/MedicalRecord');
const Worker = require('../models/Worker');
const Alert = require('../models/Alert');
const router = express.Router();
const axios = require('axios'); // Import axios

const NOTIFIABLE_DISEASES = ['tuberculosis', 'malaria', 'dengue', 'covid-19', 'cholera', 'leprosy'];

// A helper map for language codes (e.g., 'en|bn' means English to Bengali)
const languageMap = {
    'Bengali': 'en|bn',
    'Hindi': 'en|hi',
    'Odia': 'en|or',
};

// Helper function to call the MyMemory API
async function translateText(text, langPair) {
    if (!text || !langPair) return text;
    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;
        const response = await axios.get(url);
        // The actual translation is nested in the response data
        return response.data.responseData.translatedText;
    } catch (error) {
        console.error("Translation API error:", error.message);
        return text; // Return original text if translation fails
    }
}

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

        const savedRecord = await newRecord.save();

        // --- Free Translation Logic Starts Here ---
        const langPair = languageMap[worker.nativeLanguage];

        if (langPair) {
            const translatedItems = [];
            for (const item of prescription) {
                const medicineT = await translateText(item.medicine, langPair);
                const dosageT = await translateText(item.dosage, langPair);
                const durationT = await translateText(item.duration, langPair);
                translatedItems.push({
                    medicine: medicineT,
                    dosage: dosageT,
                    duration: durationT,
                });
            }

            savedRecord.translatedPrescription = {
                language: langPair.split('|')[1], // 'bn', 'hi', etc.
                items: translatedItems,
            };
            await savedRecord.save();
        }
        // --- Free Translation Logic Ends ---

        if (isNotifiable) {
            const newAlert = new Alert({
                workerId: worker.workerId,
                disease: diagnosis,
                location: worker.currentLocation,
            });
            await newAlert.save();
        }

        res.status(201).json(savedRecord);
    } catch (err) {
        console.error('Error adding record:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
