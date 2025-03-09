const mongoose = require('mongoose')


// Define the transaction schema
const transactionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to the User model
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  }, // Reference to the Order model
  amount: { 
    type: Number, 
    required: true, 
    min: 0 
  }, // Transaction amount (must be non-negative)
  paymentMethod: { 
    type: String, 
    required: true, 
    enum: ['credit card', 'paypal', 'cash on delivery', 'bank transfer'] 
  }, // Payment method used
  transactionType: { 
    type: String, 
    required: true, 
    enum: ['payment', 'refund'] 
  }, // Type of transaction (payment or refund)
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  }, // Transaction status
  transactionDate: { 
    type: Date, 
    default: Date.now 
  } // Date of the transaction
 // Optional description or notes about the transaction
});

// Create the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;