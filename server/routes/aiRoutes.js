const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Worker = require('../models/Worker'); // We'll need worker data

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

router.post('/generate-report', async (req, res) => {
    const { workerId, symptoms, vitals, clinicalNotes } = req.body;

    try {
        const worker = await Worker.findById(workerId);
        if (!worker) {
            return res.status(404).json({ msg: 'Worker not found' });
        }

        // --- Prompt Engineering: The most critical part ---
        // We create a detailed prompt to guide the AI's response.
        const prompt = `
            You are a highly knowledgeable medical assistant AI. A doctor requires a differential diagnosis report for a patient.
            Provide a structured report in Markdown format based on the following patient data.

            **IMPORTANT**: This report is for a qualified medical professional for informational and decision-support purposes only. It is NOT a definitive diagnosis.

            **Patient Demographics:**
            - Age: ${worker.age}
            - Gender: ${worker.gender}
            - Originating State: ${worker.nativeState}
            - Occupation: (Assume general labor or specify if available)

            **Clinical Data:**
            - Symptoms: ${symptoms || 'Not provided'}
            - Vitals:
                - Blood Pressure: ${vitals?.bloodPressure || 'N/A'}
                - Heart Rate: ${vitals?.heartRate || 'N/A'} bpm
                - Temperature: ${vitals?.temperature || 'N/A'} °F
            - Doctor's Notes: ${clinicalNotes || 'Not provided'}

            **Instructions for the Report:**
            Please generate a report with the following sections in Markdown:
            1.  **## Possible Conditions:** List 3-5 possible medical conditions, from most likely to least likely.
            2.  **## Reasoning:** For each condition, provide a brief explanation of why it's a possibility based on the provided data (symptoms, demographics, occupation, regional health risks).
            3.  **## Recommended Next Steps:** Suggest relevant diagnostic tests (e.g., Blood Tests, X-rays) or specific questions the doctor could ask the patient to narrow down the possibilities.
            4.  **## Disclaimer:** Reiterate that this is an AI-generated report for decision support and not a substitute for professional medical judgment.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ report: text });

    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ msg: 'Failed to generate AI report.' });
    }
});

module.exports = router;
