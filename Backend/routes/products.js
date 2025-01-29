const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model'); // Product model pointing to 'items' collection

// Single route to fetch products in JSON format
router.get('/page', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch products
        // console.log(products);  // Log the products data
        res.json(products);  // Send the data as JSON
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });  // Return error message as JSON
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
    try {
        const product = await Product.findById(id); // Fetch the product by ID
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product); // Return the product data
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;