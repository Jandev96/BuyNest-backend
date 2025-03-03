const User=require('../models/userModel')


const createUser= async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);

    } catch (error) {
      res.status(400).send(error);
    }
  }
const deleteUser=  async(req, res) => {
    try {
        
        const userId="67c5d21d4514f28afe6ccfd9"
        const user= await User.findByIdAndDelete(userId);
      await user.save();
      res.status(201).send(user);

    } catch (error) {
      res.status(400).send(error);
    }
  }
  const loginUser=async(req, res) => {
    try {
        
        const emailId=req.body.email
        const user=await User.findOne({email:emailId})
        if (!user){
            throw new Error("Email not Found")
        }
        const originalPassword= user.password
        const newPassword=req.body.password
        if(originalPassword!=newPassword){
            throw new Error("Password is incorrect")


        }
      
      
      res.status(201).send(user);

    } catch (error) {
      res.status(400).send(error);
    }
  }

module.exports={createUser,deleteUser}