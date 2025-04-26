const Seller = require('../models/sellers');

// Create a new seller (signup)
exports.createUser = async (req, res) => {
  try {
    const existingUser = await Seller.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email is already registered. Please use a different email.' });
    }
    const user = new Seller(req.body);
    await user.save();
    res.status(201).send({ message: 'User created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while creating the user.' });
  }
};

// Login a seller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Seller.findOne({ email });
    if (!existingUser || existingUser.password !== password) {
      return res.status(400).send({ message: 'Invalid email or password.' });
    }
    return res.status(200).send({
      message: 'Login successful!',
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while logging in.' });
  }
};

// Get all sellers
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).send(sellers);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while retrieving sellers.' });
  }
};

// Get seller by ID
exports.getSellerById = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).send({ message: 'Seller not found.' });
    }
    res.status(200).send(seller);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while retrieving the seller.' });
  }
};

// Update seller information
exports.updateSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSeller) {
      return res.status(404).send({ message: 'Seller not found.' });
    }
    res.status(200).send({ message: 'Seller updated successfully!', seller: updatedSeller });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while updating the seller.' });
  }
};

// Delete seller by ID
exports.deleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSeller = await Seller.findByIdAndDelete(id);
    if (!deletedSeller) {
      return res.status(404).send({ message: 'Seller not found.' });
    }
    res.status(200).send({ message: 'Seller deleted successfully!', seller: deletedSeller });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while deleting the seller.' });
  }
};
