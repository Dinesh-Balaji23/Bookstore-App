const Order = require('../models/orders');
const Book = require('../models/books');

// Create a new order
const createOrder = async (req, res) => {
    try {
      const { id, username } = req.params;
      const { flatNo, city, pincode, state } = req.body;
  
      const book = await Book.findById(id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
  
      const bookingDate = new Date();
      const deliveryBy = new Date(bookingDate);
      deliveryBy.setDate(bookingDate.getDate() + 10); // Add 10 days to the booking date
  
      const newOrder = new Order({
        bookImage: book.image,
        bookTitle: book.title,
        flatNo,
        city,
        pincode,
        state,
        sellerName: book.sellerName,
        deliveryBy,
        price: book.price,
        username,
      });
  
      await newOrder.save();
      res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
      res.status(500).json({ message: 'Error placing order', error: error.message });
    }
  };
  
  module.exports = { createOrder };

// Get all orders by username
const getOrdersByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        const orders = await Order.find({ username });
        if (orders.length === 0) {
            return res.status(404).json({ message: `No orders found for user "${username}"` });
        }

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving orders', error: err.message });
    }
};

const deleteOrderById = async (req, res) => {
  try {
      const { id } = req.params;

      // Find and delete the order by ID
      const deletedOrder = await Order.findByIdAndDelete(id);

      // If order not found, send a 404 response
      if (!deletedOrder) {
          return res.status(404).json({ message: `Order with ID ${id} not found` });
      }

      res.status(200).json({ message: `Order with ID ${id} deleted successfully`, order: deletedOrder });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};

const countOrdersBySeller = async (req, res) => {
  try {
      const { username } = req.params;
      const orderCount = await Order.countDocuments({ sellerName: username });
      res.status(200).json({ seller: username, orderCount });
  } catch (err) {
      res.status(500).json({ message: 'Error counting orders', error: err.message });
  }
};

const getOrdersBySellerName = async (req, res) => {
  try {
      const { username } = req.params;

      // Fetch orders where sellerName matches the username from the URL
      const sellerOrders = await Order.find({ sellerName: username });

      // If no orders are found, send a 404 response
      if (sellerOrders.length === 0) {
          return res.status(404).json({ message: `No orders found for seller "${username}"` });
      }

      res.status(200).json(sellerOrders);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching orders for seller', error: err.message });
  }
};

module.exports = { createOrder, getOrdersByUsername, deleteOrderById, countOrdersBySeller, getOrdersBySellerName };