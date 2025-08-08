// routes/customerRoutes.js
const express = require('express');
const Vehicle = require('../models/Vehicle');
const Spare = require('../models/Spare');
const router = express.Router();

// Get customer profile (Mock example)
router.get('/profile', (req, res) => {
  res.json({ id: 1, name: 'John Doe', email: 'johndoe@example.com' });
});

// Update customer profile (Mock example)
router.put('/profile', (req, res) => {
  const updatedProfile = req.body;
  res.json({ message: 'Profile updated successfully', updatedProfile });
});

// Get all products or filter by category/subcategory
router.get('/vehicles', async (req, res) => {
  try {

    

    // Fetch products based on query
    const products = await Vehicle.find()

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product details by ID
router.get('/vehicles/:id', async (req, res) => {
  console.log(req.params.id);
  
  try {
    const product = await Vehicle.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product details' });
  }
});


// Get all products or filter by category/subcategory
router.get('/spare', async (req, res) => {
  try {

    

    // Fetch products based on query
    const products = await Spare.find()

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product details by ID
router.get('/spare/:id', async (req, res) => {
  console.log(req.params.id);
  
  try {
    const product = await Spare.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product details' });
  }
});



// Add product to favorites (Mock example)
router.post('/favorites', (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  // Here you could integrate logic to save the product ID to the customer's favorites in the database
  res.json({ message: `Product ${productId} added to favorites` });
});

// Get customer order history (Mock example)
router.get('/orders', (req, res) => {
  const orders = [
    { id: 1, product: 'Product 1', date: '2024-12-01', status: 'Delivered' },
    { id: 2, product: 'Product 2', date: '2024-12-03', status: 'In Transit' },
  ];
  res.json(orders);
});

module.exports = router;
