const express = require('express');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const mongoose= require('mongoose')
dotenv.config();

const userRoutes=require('../backend/routes/userRoutes')
const productRoutes=require('../backend/routes/productRoutes')

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://jandev:TdX9o54kCK0obdWj@cluster0.8ibp6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
  
  
  app.use(express.json());
  

  


  app.use('/users',userRoutes)
  app.use('/product',productRoutes)
  













app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});