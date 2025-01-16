const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const corss = require('cors')

app.use(corss())

const PORT = process.env.PORT || 5173;
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
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Serve Homepage
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Products App</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
