const router = require('express').Router();
const {createUser,deleteUser,loginUser}=require('../controller/userController')

router.post('/users',createUser);
  router.post('/login', loginUser);
  router.post('/deleteuser',deleteUser)

module.exports=router
