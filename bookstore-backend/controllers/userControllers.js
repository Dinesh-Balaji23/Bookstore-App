const User = require('../models/users');

// Create a new user (signup)
exports.createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email is already registered. Please use a different email.' });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while creating the user.' });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (existingUser) {
      return res.status(200).send({
        message: 'Login successful!',
        name: existingUser.name,
        email: existingUser.email,
      });
    } else {
      return res.status(400).send({ message: 'Invalid email or password.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while logging in.' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while retrieving users.' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while retrieving the user.' });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send({
      message: 'User updated successfully!',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while updating the user.' });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send({
      message: 'User deleted successfully!',
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while deleting the user.' });
  }
};
