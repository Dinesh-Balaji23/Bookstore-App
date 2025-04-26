const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminControllers');

// Create a new admin user
router.post('/signupadmin', AdminController.createUser);

// Login admin user
router.post('/loginadmin', AdminController.loginUser);

// Find an admin user by email
router.get('/admin/:email', AdminController.findUser);

// Delete an admin user by email
router.delete('/admin/:email', AdminController.deleteUser);

module.exports = router;
