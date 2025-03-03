const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: ['electronics', 'clothing', 'home', 'books', 'other'] },
  stock: { type: Number, required: true, min: 0 },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  images: [{ type: String }], // Array of image URLs
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] // Array of references to Review model
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;