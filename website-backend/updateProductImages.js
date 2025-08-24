// Try different import methods to ensure sequelize is available
let sequelize;

try {
  // Try importing from models folder
  sequelize = require('./models');
} catch (error) {
  console.log('Failed to import from ./models, trying ./models/index.js');
  try {
    sequelize = require('./models/index.js');
  } catch (error2) {
    console.error('❌ Could not import sequelize. Error:', error2.message);
    process.exit(1);
  }
}

const { QueryTypes } = require('sequelize');

// Your products data (same as before)
const productsToUpdate = [
  {
    id: 'a5a4ee4e-6fe3-46e7-8208-982d565bc203', // Azure Bloom
    images: [
      'https://dwapor-product-images.s3.amazonaws.com/products/product-1.1.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-1.2.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-1.3.jpg'
    ]
  },
  {
    id: 'b862b842-6cf0-46e2-841f-b075919b98df', // Rory Wrap Top
    images: [
      'https://dwapor-product-images.s3.amazonaws.com/products/product-2.1.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-2.2.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-2.3.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-2.4.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-2.5.jpg'
    ]
  },
  {
    id: 'c2c88d9b-dcb3-4c4e-a391-e026d2c1414c', // Beige Blossom Peplum Top
    images: [
      'https://dwapor-product-images.s3.amazonaws.com/products/product-3.1.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-3.2.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-3.3.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-3.4.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-3.5.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-3.6.JPG'
    ]
  },
  {
    id: '8d29ecfa-c49f-4691-949a-cfc858ad4028', // Gulbahar Handblock Patchwork Top
    images: [
      'https://dwapor-product-images.s3.amazonaws.com/products/product-4.1.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-4.2.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-4.3.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-4.4.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-4.5.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-4.6.jpg'
    ]
  },
  {
    id: '7d39f563-dad9-467a-8dbb-6d1938e8a565', // Kamala
    images: [
      'https://dwapor-product-images.s3.amazonaws.com/products/product-5.1.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-5.2.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-5.3.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-5.4.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-5.5.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-5.6.jpeg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-5.6.JPG',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-5.7.JPG'
    ]
  },
  {
    id: '7ccd49da-38b8-429e-b44a-332b3d5581b7', // RANI
    images: [
      'https://dwapor-product-images.s3.amazonaws.com/products/product-6.1.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-6.2.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-6.3.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-6.4.jpg'
    ]
  },
  {
    id: '374488a1-74de-422d-a7ee-c214524885e3', // YUDHA
    images: [
      'https://dwapor-product-images.s3.amazonaws.com/products/product-7.1.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-7.2.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-7.3.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-7.4.jpg',
      'https://dwapor-product-images.s3.amazonaws.com/products/product-7.5.jpg'
    ]
  }
];

async function updateProductImages() {
  try {
    console.log('🚀 Starting product images update...');
    console.log(`📊 Total products to update: ${productsToUpdate.length}`);
    
    // Verify sequelize is properly loaded
    if (!sequelize || typeof sequelize.query !== 'function') {
      throw new Error('Sequelize not properly initialized');
    }
    
    for (const product of productsToUpdate) {
      const imagesJson = JSON.stringify(product.images);
      
      const productNames = {
        'a5a4ee4e-6fe3-46e7-8208-982d565bc203': 'Azure Bloom',
        'b862b842-6cf0-46e2-841f-b075919b98df': 'Rory Wrap Top', 
        'c2c88d9b-dcb3-4c4e-a391-e026d2c1414c': 'Beige Blossom Peplum Top',
        '8d29ecfa-c49f-4691-949a-cfc858ad4028': 'Gulbahar Handblock Patchwork Top',
        '7d39f563-dad9-467a-8dbb-6d1938e8a565': 'Kamala',
        '7ccd49da-38b8-429e-b44a-332b3d5581b7': 'RANI',
        '374488a1-74de-422d-a7ee-c214524885e3': 'YUDHA'
      };
      
      const productName = productNames[product.id] || 'Unknown Product';
      
      console.log(`\n🔄 Updating: ${productName}`);
      console.log(`📷 Images: ${product.images.length} files`);
      
      // Execute the update query
      await sequelize.query(
        'UPDATE products SET images = ? WHERE id = ?',
        {
          replacements: [imagesJson, product.id],
          type: QueryTypes.UPDATE
        }
      );
      
      console.log(`✅ Successfully updated ${productName}`);
    }
    
    console.log(`\n🎉 Migration completed successfully!`);
    console.log(`✨ Updated all 7 products with correct S3 image URLs`);
    
  } catch (error) {
    console.error('\n❌ Error updating product images:', error);
  } finally {
    
    process.exit(0);
  }
}

console.log('🏁 Product Images Migration Script');
console.log('==================================');
updateProductImages();
