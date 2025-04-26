const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { versionKey: false, collection: 'SellerData' });

const Seller = mongoose.model("SellerData", sellerSchema);

module.exports = Seller;