const express = require('express');
const Book = require('../models/books'); // Model for books
const Order = require('../models/orders'); // Model for orders
const Users = require('../models/users');
const Vendors = require('../models/sellers');

const { createOrder, getOrdersByUsername, getOrdersBySellerName, deleteOrderById } = require('../controllers/orderControllers');

const router = express.Router();
router.post('/orderitem/:id/:username', createOrder);
router.get('/orders/:username', getOrdersByUsername);
router.delete('/orders/:id', deleteOrderById);
router.get('/sellerorders/:username', getOrdersBySellerName);

// New route for fetching seller details
router.get('/sellerhome/:username', async (req, res) => {
    try {
        const { username } = req.params;

        // Count the number of books for the seller
        const bookCount = await Book.countDocuments({ sellerName: username });

        // Count the number of orders for the seller
        const orderCount = await Order.countDocuments({ sellerName: username });

        // Combine the counts and send the response
        res.status(200).json({
            seller: username,
            bookCount,
            orderCount,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching seller data', error: err.message });
    }
});

router.get('/adminhome/:username', async (req, res) => {
    try {
        const usersCount = await Users.countDocuments();
        const vendorsCount = await Vendors.countDocuments();
        const itemsCount = await Book.countDocuments();
        const ordersCount = await Order.countDocuments();
        res.status(200).json({
            usersCount,
            vendorsCount,
            itemsCount,
            ordersCount,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetchingdata', error: err.message });
    }
});

module.exports = router;