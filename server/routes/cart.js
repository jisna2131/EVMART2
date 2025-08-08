// routes/cart.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const enrollmentModel = require("../models/enrollmentModel");
const Vehicle = require("../models/Vehicle");
const Cart = require("../models/Cart");
const bookingspare = require("../models/bookingspare");
const router = express.Router();

router.get("/bookings", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // Retrieve authenticated user ID from middleware
    const bookings = await enrollmentModel.find({ userId }).populate("itemId"); // Populate item details
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings", error });
  }
});

router.get("/bookings/spare", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // Retrieve authenticated user ID from middleware
    const bookings = await bookingspare.find({ userId }).populate("itemId"); // Populate item details
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings", error });
  }
});

router.get("/vendor/bookings", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch and populate all bookings
    const allBookings = await enrollmentModel.find().populate("itemId");

    // Filter bookings where itemId.seller == logged-in user
    const vendorBookings = allBookings.filter(
      (booking) => booking.itemId?.seller?.toString() === userId.toString()
    );

    res.status(200).json({ success: true, bookings: vendorBookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings", error });
  }
});

router.get("/vendor/bookings/spare", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const allSpareBookings = await bookingspare.find().populate("itemId");

    const vendorSpareBookings = allSpareBookings.filter(
      (booking) => booking.itemId?.supplier?.toString() === userId.toString()
    );

    res.status(200).json({ success: true, bookings: vendorSpareBookings });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch bookings", error });
  }
});

// Add a product to the cart
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId; // Assume `req.user` is populated with logged-in user details

    const product = await Vehicle.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = await Cart.findOne({ userId, productId });
    if (existingCartItem) {
      // Update quantity if the item already exists in the cart
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      // Create a new cart item
      await Cart.create({ userId, productId, quantity });
    }

    res.status(200).json({ message: "Product added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get cart items for a user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const cartItems = await Cart.find({ userId }).populate("productId");
    const formattedItems = cartItems.map((item) => ({
      id: item._id,
      productId: item.productId._id,
      name: item.productId.name,
      image: item.productId.image,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    res.status(200).json(formattedItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update the quantity of a cart item
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params; // Cart item ID
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove a product from the cart
router.delete("/remove/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await cartItem.deleteOne();
    res.status(200).json({ message: "Item removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    // Fetch cart items for the authenticated user
    const userId = req.user.userId; // Authenticated user ID
    const cartItems = await Cart.find({ userId }).populate("productId");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty. Add products to the cart first.",
      });
    }

    // Prepare enrollment records
    const enrollments = cartItems.map((item) => ({
      userId,
      itemId: item.productId._id,
      amountPaid: item.productId.price * item.quantity, // Price * Quantity
      status: "Paid",
      createdAt: new Date(),
    }));

    // Save all enrollments to the database
    await enrollmentModel.insertMany(enrollments);

    // Clear the user's cart after successful payment
    await Cart.deleteMany({ userId });

    console.log("Payment verified and enrollments saved:", enrollments);

    res.status(200).json({
      success: true,
      message: "Payment verified and booking successful for all items.",
      enrollments,
    });
  } catch (error) {
    console.error("Error during enrollment:", error);
    res.status(500).json({
      success: false,
      message: "Enrollment saving failed.",
      error,
    });
  }
});

module.exports = router;
