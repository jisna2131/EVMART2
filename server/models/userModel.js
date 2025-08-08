const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  profileImage: { type: String },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: "user" },
  storeName: { type: String, default: "", required: false },
});

module.exports = mongoose.model("User", userSchema);
