const mongoose = require('mongoose');

// Define the product sub-schema for the order
const orderProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product model
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
});

// Define the shipping address sub-schema
const shippingAddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true }
});

// Define the order schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  products: [orderProductSchema], // Array of products in the order
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, required: true, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  shippingAddress: { type: shippingAddressSchema, required: true },
  paymentMethod: { type: String, required: true, enum: ['credit card', 'paypal', 'cash on delivery'] },
  paymentStatus: { type: String, required: true, enum: ['paid', 'pending'], default: 'pending' }
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;