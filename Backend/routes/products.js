const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model'); // Product model pointing to 'items' collection

// Single route to fetch products in JSON format
router.get('/page', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch products
        console.log(products);  // Log the products data
        res.json(products);  // Send the data as JSON
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });  // Return error message as JSON
    }
});

module.exports = router;
