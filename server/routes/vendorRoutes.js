const express = require('express');
const upload = require('../config/filesupload');
const Vehicle = require('../models/Vehicle');
const authMiddleware = require('../middleware/authMiddleware');
const Spare = require('../models/Spare');
const router = express.Router();




router.post(
  '/vehicles',
  authMiddleware,
  upload.fields([{ name: 'image', maxCount: 5 }]), // Allow multiple images
  async (req, res) => {
    try {
      
      const { title, brand, model, year, price, condition } = req.body;

      if (!title || !brand || !model || !year || !price || !condition) {
        return res.status(400).json({ message: 'Please fill out all required fields' });
      }

      // Handling multiple images
      const image = req.files ? req.files.image.map((file) => file.path) : [];

      const newVehicle = new Vehicle({
        title,
        brand,
        model,
        year,
        price,
        condition,
        image,
        seller: req.user.userId, // Authenticated user as the seller
      });

      await newVehicle.save();
      res.status(201).json(newVehicle);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);



  router.get('/vehicles', authMiddleware, 
    async (req, res) => {
      try {
        console.log("helloo");
        
        const products = await Vehicle.find({ seller: req.user.userId });
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

  );


  router.post('/spare', authMiddleware, upload.fields([
    { name: 'image', maxCount: 5 },  // Allow multiple images (adjust maxCount as needed)
  ]), 
  async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        brand,                // Added brand field
      } = req.body;
  
      console.log(req.files.image);
      
  
      const image = req.files ? req.files.image.map(file => file.path) : []; // Handling multiple image files
  
      // Check if all required fields are provided
      if (!name || !description || !price ) {
        return res.status(400).json({ message: 'Please fill out all required fields' });
      }
  
      // Create a new product with the supplier ID from the authenticated user
      const newProduct = new Spare({
        name,
        description,
        price,
        image,
        brand,
        supplier: req.user.userId, // Supplier is the authenticated user
      });
  
      // Save the new product to the database
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }  
);


router.get('/spare', authMiddleware, 
  async (req, res) => {
    try {
      const products = await Spare.find({ supplier: req.user.userId });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

);


// router.put('/products/:id', authMiddleware, updateProduct);
router.delete('/vehicles/:id', authMiddleware, 
  async (req, res) => {
    try {
      const { id } = req.params;
      await Vehicle.findByIdAndDelete(id);
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);
router.delete('/spare/:id', authMiddleware, 
  async (req, res) => {
    try {
      const { id } = req.params;
      await Spare.findByIdAndDelete(id);
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);





module.exports = router;
