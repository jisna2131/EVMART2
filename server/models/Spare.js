const mongoose = require('mongoose');

const spareSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String] }, // Array to hold multiple image URLs
    brand: { type: String }, // Brand name
    isVerified: { type: Boolean, default: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const Spare = mongoose.model('Spare', spareSchema);

module.exports = Spare;
