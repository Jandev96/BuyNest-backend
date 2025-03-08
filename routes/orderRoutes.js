const router=require('express').Router();
const {createOrder,getAllOrders,getOrderById,updateOrder,deleteOrder}=require('../controller/orderController')
const authenticateUserMiddleware = require('../middleware/authMiddleware')


router.post('/',authenticateUserMiddleware(), createOrder);
router.get('/',getAllOrders)
router.get('/:orderId',getOrderById)
router.delete('/:orderId',deleteOrder)
router.put('/:orderId',updateOrder)

module.exports=router