const Order = require('../models/orderModel')
const User = require('../models/userModel');
const Product=require('../models/productModel')
const mongoose = require('mongoose')
// Create a new order



// Create a new order
createOrder = async (req, res) => {
  try {
    const { products ,paymentMethod } = req.body;
    const userId = req.user.id
    // Validate required fields
    if (!userId || !products|| !paymentMethod) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate userId (must be a valid ObjectId)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const shippingAddress=user.address
    
    // Validate each product in the products array
    for (const product of products) {
      // Validate productId (must be a valid ObjectId)
      if (!mongoose.Types.ObjectId.isValid(product.productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      // Check if the product exists
      const existingProduct = await Product.findById(product.productId);
      product.price=existingProduct.price
      if (!existingProduct) {
        return res.status(404).json({ message: `Product not found: ${product.productId}` });
      }

      // Validate quantity and price
      if (product.quantity < 1 || product.price < 0) {
        return res.status(400).json({ message: 'Invalid quantity or price for a product' });
      }

      // Check if there is enough stock for the product
      if (existingProduct.stock < product.quantity) {
        return res.status(400).json({ message: `Insufficient stock for product: ${existingProduct.name}` });
      }
    }

    // Calculate totalAmount dynamically
    const totalAmount = products.reduce((total, product) => {
      return total += product.quantity * product.price;
    }, 0);

    // Create a new order
    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending', // Default payment status
      status: 'pending' // Default order status
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Update product stock after the order is created
    for (const product of products) {
      await Product.findByIdAndUpdate(product.productId, {
        $inc: { stock: -product.quantity } // Decrease stock by the ordered quantity
      });
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders
getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single order by ID
getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Validate order ID
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await Order.findById(orderId).populate('userId').populate('products.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update an order
updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updates = req.body;

    // Validate order ID
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    // Find and update the order
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updates, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an order
deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Validate order ID
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    // Find and delete the order
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports={createOrder,getAllOrders,getOrderById,updateOrder,deleteOrder}