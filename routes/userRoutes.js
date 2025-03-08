const router = require('express').Router();
const {createUser,deleteUser,loginUser}=require('../controller/userController')

router.post('/',createUser);
  router.post('/login', loginUser);
  router.post('/logout',deleteUser)

module.exports=router
