const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' }],
  },
  { timestamps: true, versionKey: false, collection: 'Wishlist' }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;