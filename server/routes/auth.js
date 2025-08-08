const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Ensure the correct model is used
const upload = require("../config/filesupload");
const router = express.Router();

// JWT Secret
const SECRET_KEY = process.env.SECRET_KEY || "your_jwt_secret";

// User Registration (Normal User)
router.post(
  "/register/user",
  upload.single("profileImage"),
  async (req, res) => {
    const { username, email, password, phone, address } = req.body;

    console.log(req.file);
    // console.log(req.body);

    const profileImage = req.file ? req.file.path : null;

    console.log(profileImage);

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phone,
        address,
        profileImage: profileImage,
        role: "user", // Default role as 'user'
        isVerified: true, // Automatically verified
      });

      await newUser.save();

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Doctor Registration
router.post(
  "/register/vendor",
  upload.single("profileImage"),
  async (req, res) => {
    const { username, email, password, phone, storeName } = req.body;

    const profileImage = req.file ? req.file.path : null;

    try {
      // Check if the doctor already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new doctor
      const newDoctor = new User({
        username,
        email,
        password: hashedPassword,
        phone,
        address: storeName,
        profileImage,
        role: "vendor", // Role as 'doctor'
        isVerified: false, // Not verified by default
      });

      await newDoctor.save();

      res
        .status(201)
        .json({ message: "Vendor registered successfully", user: newDoctor });
    } catch (error) {
      console.error("Error during vendor registration:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        isVerified: user.isVerified,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/users/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const updateData = {
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    };

    console.log(updateData);
    

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});


module.exports = router;
