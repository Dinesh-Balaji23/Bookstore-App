const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    sellerName: { type: String, required: true },
    image: { type: String }, // URL or path to the uploaded image
}, {collection: 'Books', timestamps: true});

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;
