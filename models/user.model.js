const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  phoneNumber: String,
  adminContactPhone: String,
  address: String,
  passwordHash: String,
  role: { type: String, default: 'user' },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
