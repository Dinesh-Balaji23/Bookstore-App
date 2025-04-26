const User = require('../models/admins');

// Create a new user
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

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser || existingUser.password !== password) {
      return res.status(400).send({ message: 'Invalid email or password.' });
    }
    return res.status(200).send({
      message: 'Login successful!',
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while logging in.' });
  }
};

// Find a user by email
exports.findUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while finding the user.' });
  }
};

// Delete a user by email
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found.' });
    }
    res.status(200).send({ message: 'User deleted successfully.', user: deletedUser });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while deleting the user.' });
  }
};
