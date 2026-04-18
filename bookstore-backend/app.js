const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const client = require('prom-client');

const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const sellerRouter = require('./routes/sellerRoutes');
const bookRouter = require('./routes/bookRoutes');
const orderRouter = require('./routes/orderRoutes');
const wishlistRouter = require('./routes/wishlistRoutes');

const app = express();
const PORT = 9000;

app.use(cors({
    origin: true,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

mongoose.connect('mongodb+srv://Dineshbalaji_A:dineshbalaji@cluster0.cwoq1.mongodb.net/Bookstore?retryWrites=true&w=majority&appName=Cluster0')
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

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of requests',
});

app.use((req, res, next) => {
  httpRequestCounter.inc();
  next();
});

// metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});
