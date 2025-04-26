const Wishlist = require('../models/wishlists');

const addToWishlist = async (req, res) => {
  const { username, bookId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ username });
    if (!wishlist) {
      wishlist = new Wishlist({ username, books: [bookId] });
    } else if (!wishlist.books.includes(bookId)) {
      wishlist.books.push(bookId);
    }
    await wishlist.save();

    const updatedWishlist = await Wishlist.findOne({ username }).populate('books');
    res.status(200).json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error });
  }
};



const getWishlist = async (req, res) => {
  const { username } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ username }).populate('books');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
};

const removeFromWishlist = async (req, res) => {
  const { username, bookId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ username });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    wishlist.books = wishlist.books.filter((book) => book.toString() !== bookId);
    await wishlist.save();

    const updatedWishlist = await Wishlist.findOne({ username }).populate('books');
    res.status(200).json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error });
  }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist };
