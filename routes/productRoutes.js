const router = require('express').Router();
const {createProduct,getProduct,displayAllProducts,deleteProduct,updateProduct} = require('../controller/productController')
const authenticateUserMiddleware = require('../middleware/authMiddleware')


router.post('/',authenticateUserMiddleware(), createProduct);
router.get('/',displayAllProducts)
router.get('/:productId',getProduct)
router.delete('/:productId',deleteProduct)
router.put('/:productId',updateProduct)
//   router.delete('/delete',deleteProduct);
//   router.put('/update',updateProduct)

module.exports=router


