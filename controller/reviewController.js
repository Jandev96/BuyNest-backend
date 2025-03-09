const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const mongoose= require('mongoose')



// Create a new review
const createReview = async (req, res) => {
    try {
        const {  productId, rating, comment } = req.body;
        const userId = req.user.id
        console.log(userId)
        // Validate required fields
        if (!userId || !productId || !rating || !comment) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user exists
        // const user = await User.findById(userId);
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Validate rating (must be between 1 and 5)
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        // Create a new review
        const reviewData = {
            userId,
            productId,
            rating,
            comment,
        };

        const review = new Review(reviewData);
        await review.save();

        // Add the review to the product's reviews array
        await Product.findByIdAndUpdate(productId, {
            $push: { reviews: review._id },
        });

        res.status(201).json(review);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all reviews for a product
const getReviewsByProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        // Find all reviews for the product
        const reviews = await Review.find({ productId }).populate('userId', 'username');

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a single review by ID
const getReviewById = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        // Validate review ID
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message: 'Invalid review ID' });
        }

        // Find the review
        const review = await Review.findById(reviewId).populate('userId', 'username');

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a review
const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const { rating, comment } = req.body;

        // Validate review ID
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message: 'Invalid review ID' });
        }

        // Validate rating (must be between 1 and 5)
        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        // Find and update the review
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { rating, comment, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        // Validate review ID
        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ message: 'Invalid review ID' });
        }

        // Find and delete the review
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Remove the review from the product's reviews array
        await Product.findByIdAndUpdate(deletedReview.productId, {
            $pull: { reviews: reviewId },
        });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createReview,
    getReviewsByProduct,
    getReviewById,
    updateReview,
    deleteReview,
};