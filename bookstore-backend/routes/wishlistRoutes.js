const express = require('express');
const router = express.Router();
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistControllers');

router.post('/add', addToWishlist);
router.get('/:username', getWishlist);
router.post('/remove', removeFromWishlist);

module.exports = router;
