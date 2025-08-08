const express = require("express");
const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get all unverified event organizers
router.get("/organisers", authMiddleware, async (req, res) => {
  try {
    // Fetch all users who are not admins
    const organisers = await User.find();
    res.json(organisers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to verify an event organizer by ID
router.patch("/organisers/:id/verify", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const organiser = await User.findById(id);
    if (!organiser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Toggle the isVerified field
    organiser.isVerified = !organiser.isVerified;
    await organiser.save();

    res.json({
      message: `User ${
        organiser.isVerified ? "verified" : "unverified"
      } successfully`,
    });
  } catch (err) {
    console.error("Error verifying user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/organisers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Deletion failed" });
  }
});

module.exports = router;
