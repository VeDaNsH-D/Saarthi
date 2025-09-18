const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkerSchema = new Schema({
    workerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    photoUrl: { type: String, default: 'https://via.placeholder.com/150' },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    nativeLanguage: { type: String, required: true },
    nativeState: { type: String, required: true },
    currentLocation: {
        district: { type: String, required: true },
        panchayat: { type: String, required: true }
    }
}, { timestamps: true });

module.exports = mongoose.model('Worker', WorkerSchema);
