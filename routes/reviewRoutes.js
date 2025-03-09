const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');
const authenticateUserMiddleware = require('../middleware/authMiddleware');
 // Optional: For authentication

// Create a new review
router.post('/',authenticateUserMiddleware(), reviewController.createReview);

// Get all reviews for a specific product
router.get('/:productId',authenticateUserMiddleware(), reviewController.getReviewsByProduct);

// Get a single review by ID
router.get('/:reviewId',authenticateUserMiddleware(), reviewController.getReviewById);

// Update a review
router.put('/:reviewId',authenticateUserMiddleware(), reviewController.updateReview);

// Delete a review
router.delete('/:reviewId',authenticateUserMiddleware(),  reviewController.deleteReview);

module.exports = router; 