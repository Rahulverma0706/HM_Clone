const mongoose = require('mongoose');

// Define the schema for the products
const productSchema = new mongoose.Schema({
    name: String,
    photo: String,
    price: Number
});

// Ensure the model points to the `Clothing` collection
module.exports = mongoose.model('Product', productSchema, 'Clothing');
