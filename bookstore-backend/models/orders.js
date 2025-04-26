const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    bookImage: { type: String, required: true },
    bookTitle: { type: String, required: true },
    flatNo: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    sellerName: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
    deliveryBy: { type: Date, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    username: { type: String, required: true }, // Associate order with a username
}, { collection: 'Orders', timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
