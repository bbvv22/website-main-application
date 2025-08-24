const express = require('express');
const router = express.Router();
const { Product, ProductImage, sequelize, Sequelize } = require('../models');

// Debug log when module loads
console.log('✅ PRODUCTS MODULE LOADED');

// Get all products
router.get('/', async (req, res) => {
  console.log('📋 Main products route hit - req.path:', req.path);
  try {
    console.log('📋 Fetching all products from database...');
    const products = await Product.findAll({
      where: { is_active: true },
      include: [{
        model: ProductImage,
        as: 'images', // This matches the 'as' in Product.hasMany(ProductImage, { as: 'images' })
        attributes: ['image_url', 'sort_order'], // Select only necessary attributes
      }],
      order: [['createdAt', 'DESC']],
    });

    const formattedProducts = products.map(product => {
      const plainProduct = product.get({ plain: true });
      plainProduct.images = (plainProduct.images || [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(img => img.image_url);
      if (plainProduct.images.length > 0) {
        plainProduct.image = plainProduct.images[0];
      } else {
        plainProduct.image = null;
      }
      return plainProduct;
    });

    console.log(`✅ Found ${formattedProducts.length} products`);
    res.json(formattedProducts);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({
      error: 'Failed to fetch products',
      details: error.message
    });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  console.log('🔍 Product by ID route hit - req.path:', req.path, 'ID:', req.params.id);
  try {
    const product = await Product.findByPk(req.params.id, {
      where: { is_active: true },
      include: [{
        model: ProductImage,
        as: 'images',
        attributes: ['image_url', 'sort_order'],
      }],
    });

    if (!product) {
      console.log('❌ Product not found for ID:', req.params.id);
      return res.status(404).json({ error: 'Product not found' });
    }

    const plainProduct = product.get({ plain: true });
    plainProduct.images = (plainProduct.images || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(img => img.image_url);
    if (plainProduct.images.length > 0) {
      plainProduct.image = plainProduct.images[0];
    } else {
      plainProduct.image = null;
    }

    console.log('✅ Found product:', plainProduct.name);
    res.json(plainProduct);
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    res.status(500).json({
      error: 'Failed to fetch product',
      details: error.message
    });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  console.log('📂 Category route hit - req.path:', req.path, 'Category:', req.params.category);
  try {
    const products = await Product.findAll({
      where: { category: req.params.category, is_active: true },
      include: [{
        model: ProductImage,
        as: 'images',
        attributes: ['image_url', 'sort_order'],
      }],
      order: [['name', 'ASC']],
    });

    const formattedProducts = products.map(product => {
      const plainProduct = product.get({ plain: true });
      plainProduct.images = (plainProduct.images || [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map(img => img.image_url);
      if (plainProduct.images.length > 0) {
        plainProduct.image = plainProduct.images[0];
      } else {
        plainProduct.image = null;
      }
      return plainProduct;
    });

    console.log(`✅ Found ${formattedProducts.length} products in category: ${req.params.category}`);
    res.json(formattedProducts);
  } catch (error) {
    console.error('❌ Error fetching products by category:', error);
    res.status(500).json({
      error: 'Failed to fetch products',
      details: error.message
    });
  }
});

module.exports = router;
