const Product = require('../models/productModel')


const createProduct = async (req, res) => {
    try {
       
        
        const productData = {
           name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            sellerId: req.user.id,     //need to create this  // Reference to the User mode
            images: req.body.images,
            
        };
        const products = new Product(productData);
       products.save()
        res.send(products)
        
    }


    catch (error) {
        res.status(400).send(error);
    }
}

const getProduct=async (req, res) => {
    try {
       
        
       const id=req.params.productId
       const product=await Product.findById(id).exec()
       console.log(product)
       console.log(id)
       res.send(product)
        
        
    }


    catch (error) {
        res.status(400).send(error);
    }
}






const deleteProduct = async (req, res) => {


    try {
        const id=req.params.productId
       const product=await Product.findByIdAndDelete(id).exec()
       console.log(product)
       console.log(id)
       res.send(product)
        

    }


    catch (error) {
        res.status(400).send(error);
    }
}

const displayAllProducts= async(req,res)=> {
    try {

       const products=await Product.find({})
       console.log(products)
       
       res.send(products)

    }
    catch (error){
        res.status(400).send(error)
    }
}


const updateProduct=async (req, res) => {
    try {
       
        
       const id=req.params.productId
       console.log(id)
       const productData = {
        name: req.body.name,
         description: req.body.description,
         price: req.body.price,
         category: req.body.category,
         stock: req.body.stock,
              //need to create this  // Reference to the User mode
         images: req.body.images,
         
     };

       const product=await Product.findByIdAndUpdate(id, productData)
       console.log(product)
       res.send(product)
        
        
    }


    catch (error) {
        res.status(400).send(error);
    }
}



module.exports={createProduct,getProduct,displayAllProducts,deleteProduct,updateProduct}