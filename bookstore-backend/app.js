const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const sellerRouter = require('./routes/sellerRoutes');
const bookRouter = require('./routes/bookRoutes');
const orderRouter = require('./routes/orderRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');

const app = express();
const PORT = 9000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/Bookstore')
    .then(() => {
        console.log('Connection to MongoDB established');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Middleware and routes setup
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(userRouter);
app.use(adminRouter);
app.use(sellerRouter);
app.use(bookRouter);
app.use(orderRouter);
app.use('/store', wishlistRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});
