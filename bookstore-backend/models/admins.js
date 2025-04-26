const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { versionKey: false, collection: 'AdminData' });

const Admin = mongoose.model("AdminData", adminSchema);

module.exports = Admin;