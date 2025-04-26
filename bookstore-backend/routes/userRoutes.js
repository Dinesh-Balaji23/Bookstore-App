const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers');

// Sign up a new user
router.post('/signup', UserController.createUser);

// Login a user
router.post('/login', UserController.loginUser);

// Get all users
router.get('/users', UserController.getAllUsers);

// Get user by ID
router.get('/users/:id', UserController.getUserById);

// Update user by ID
router.put('/users/update/:id', UserController.updateUser);

// Delete user by ID
router.delete('/users/delete/:id', UserController.deleteUser);

module.exports = router;
