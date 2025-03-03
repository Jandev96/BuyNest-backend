const express = require('express');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const mongoose= require('mongoose')
dotenv.config();

const userRoutes=require('../backend/routes/userRoutes')

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://jandev:TdX9o54kCK0obdWj@cluster0.8ibp6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
  
  
  app.use(express.json());
  

  const User = require('./models/userModel');
  app.use('/users',userRoutes)
  



  const Product = require('./models/productModel');


app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});






const Order = require('./models/orderModel');


app.post('/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});





const Review = require('./models/reviewModel');
const Admin = require('./models/adminModel');


app.post('/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.post('/admin', async (req, res) => {
    try {
      const admin = new Admin(req.body);
      await admin.save();
      res.status(201).send(admin);
    } catch (error) {
      res.status(400).send(error);
    }
  });





app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});