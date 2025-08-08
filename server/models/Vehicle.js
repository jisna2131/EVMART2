const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  title: { type: String, required: true }, // Vehicle title (e.g., "2020 Toyota Corolla LE")
  brand: { type: String, required: true }, // Vehicle brand (e.g., Toyota, Honda)
  model: { type: String, required: true }, // Model name (e.g., Corolla, Civic)
  year: { type: Number, required: true }, // Manufacturing year
  price: { type: Number, required: true }, // Selling price
  condition: { type: String, enum: ["New", "Used"], required: true }, // Vehicle condition
  image: { type: [String], required: true }, // Vehicle images
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Seller reference

  createdAt: { type: Date, default: Date.now }, // Timestamp
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
