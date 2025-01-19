const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')

app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary methods
}));


const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use('/products', productRoutes);

// Serve Homepage
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Products API' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
