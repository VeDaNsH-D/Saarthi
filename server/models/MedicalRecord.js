const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema({
    worker: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
    doctorName: { type: String, required: true },
    diagnosis: { type: String, required: true },
    symptoms: { type: String },
    prescription: [{
        medicine: String,
        dosage: String,
        duration: String
    }],
    // New field to store the translated prescription
    translatedPrescription: {
        language: String, // e.g., 'bn' for Bengali
        items: [{
            medicine: String,
            dosage: String,
            duration: String
        }]
    },
    isNotifiable: { type: Boolean, default: false },
    notifiableDisease: { type: String, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
