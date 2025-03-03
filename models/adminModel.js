const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username for admin/seller
  email: { type: String, required: true, unique: true }, // Unique email for admin/seller
  password: { type: String, required: true }, // Hashed password
  role: { type: String, required: true, enum: ['admin', 'seller'], default: 'seller' }, // Role can be "admin" or "seller"
  createdAt: { type: Date, default: Date.now }, // Timestamp when the user was created
  updatedAt: { type: Date, default: Date.now }, // Timestamp when the user was last updated
  status: { type: String, required: true, enum: ['approved', 'rejected'], default: 'rejected' }, // Status can be "approved" or "rejected"
  phone: { type: String, required: true } // User's phone number
});


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;