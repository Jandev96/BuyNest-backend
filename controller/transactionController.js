const Transaction = require('../models/transactionModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const {  orderId, amount, paymentMethod, transactionType } = req.body;
    const userId=req.user.id
    

    // Validate required fields
    if (!userId || !orderId || !amount || !paymentMethod || !transactionType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the user and order exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create the transaction
    const transaction = new Transaction({
      userId,
      orderId,
      amount,
      paymentMethod,
      transactionType,
      status: 'pending'// Default status
      
    });

    await transaction.save();

    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId').populate('orderId');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};

// Get a single transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id).populate('userId').populate('orderId');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction', error: error.message });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { status} = req.body;
    const {amount}=req.body;
    const transaction = await Transaction.findByIdAndUpdate(id,{amount:amount,status:status},{new:true},);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Update fields if provided
    if (status) transaction.status = status;
   

    await transaction.save();

    res.status(200).json({ message: 'Transaction updated successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction', error: error.message });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};