const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, default: null },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);