const express = require('express');
const router = express.Router();
const { Cart, Product, ProductImage, sequelize, Sequelize } = require('../models');

// Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.params.userId },
      include: [{
        model: Product,
        as: 'product',
        include: [{
          model: ProductImage,
          as: 'images',
          attributes: ['image_url', 'sort_order'],
        }]
      }]
    });

    const formattedCartItems = cartItems.map(item => {
      const plainItem = item.get({ plain: true });
      if (plainItem.product) {
        plainItem.product.images = (plainItem.product.images || [])
          .sort((a, b) => a.sort_order - b.sort_order)
          .map(img => img.image_url);
        if (plainItem.product.images.length > 0) {
          plainItem.product.image = plainItem.product.images[0];
        } else {
          plainItem.product.image = null;
        }
      }
      return plainItem;
    });

    res.json(formattedCartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
router.post('/:userId', async (req, res) => {
  try {
    
    const { productId, quantity, size, color } = req.body;
    const userId = req.params.userId;

    let cartItem = await Cart.findOne({ where: { userId, productId, size, color } });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity, size, color });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

// Update item quantity
router.put('/:userId/:cartItemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const { userId, cartItemId } = req.params;

    const cartItem = await Cart.findOne({ where: { id: cartItemId, userId } });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json(cartItem);
    } else {
      res.status(404).json({ error: 'Cart item not found' });
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// Remove item from cart
router.delete('/:userId/:cartItemId', async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;
    const result = await Cart.destroy({ where: { id: cartItemId, userId } });
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Cart item not found' });
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

// Clear cart
router.delete('/:userId', async (req, res) => {
    try {
        await Cart.destroy({ where: { userId: req.params.userId } });
        res.status(204).send();
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ error: 'Failed to clear cart' });
    }
});

module.exports = router;
