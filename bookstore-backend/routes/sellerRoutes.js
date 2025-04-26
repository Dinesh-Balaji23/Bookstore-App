const express = require('express');
const router = express.Router();
const SellerController = require('../controllers/sellerControllers');

// Sign up a new seller
router.post('/signupseller', SellerController.createUser);

// Login a seller
router.post('/loginseller', SellerController.loginUser);

// Get all sellers
router.get('/sellers', SellerController.getAllSellers);

// Get seller by ID
router.get('/sellers/:id', SellerController.getSellerById);

// Update seller by ID
router.put('/sellers/update/:id', SellerController.updateSeller);

// Delete seller by ID
router.delete('/sellers/delete/:id', SellerController.deleteSeller);

module.exports = router;
