const express = require('express');
const router = express.Router();
const { Wishlist, sequelize, Sequelize } = require('../models');


// Get user's wishlist
router.get('/:userId', async (req, res) => {
  try {
    const wishlistItems = await Wishlist.findAll({ where: { userId: req.params.userId } });
    
    const detailedWishlistItems = await Promise.all(wishlistItems.map(async (item) => {
        const [product] = await sequelize.query(
            'SELECT * FROM products WHERE id = :id',
            {
                replacements: { id: item.productId },
                            type: Sequelize.QueryTypes.SELECT
            }
        );
        return {
            ...item.toJSON(),
            product: product
        };
    }));

    res.json(detailedWishlistItems);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

// Add item to wishlist
router.post('/:userId', async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.params.userId;

    const wishlistItem = await Wishlist.findOne({ where: { userId, productId } });

    if (wishlistItem) {
      return res.status(409).json({ error: 'Item already in wishlist' });
    }

    const newWishlistItem = await Wishlist.create({ userId, productId });
    res.status(201).json(newWishlistItem);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

// Remove item from wishlist
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const result = await Wishlist.destroy({ where: { userId, productId } });
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Wishlist item not found' });
    }
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
});

module.exports = router;