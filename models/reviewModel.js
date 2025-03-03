const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product model
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating must be between 1 and 5
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create the Review model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;