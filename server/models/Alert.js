const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
    workerId: { type: String, required: true },
    disease: { type: String, required: true },
    location: {
        district: { type: String, required: true },
        panchayat: { type: String, required: true }
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', AlertSchema);
