const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
