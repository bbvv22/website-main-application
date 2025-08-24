const express = require('express');
const router = express.Router();
const { Review, sequelize, Sequelize } = require('../models'); // Import Review model

// Submit a new review
router.post('/', async (req, res) => {
  try {
    const { product_id, user_id, rating, comment, name, profession, city } = req.body;

    // Basic validation
    if (!product_id || !user_id || !rating || !comment || !name) {
      return res.status(400).json({ error: 'Missing required review fields.' });
    }

    const newReview = await Review.create({
      product_id,
      user_id,
      rating,
      comment,
      name,
      profession,
      city,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Failed to submit review.' });
  }
});

// Get reviews for a specific product
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.findAll({
      where: { product_id: productId },
      order: [['createdAt', 'DESC']] // Order by newest first
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews.' });
  }
});

module.exports = router;