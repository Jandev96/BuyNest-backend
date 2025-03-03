const User = require('../models/userModel')
const jwtUtils = require('../utils/jwtUtils')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        console.log(req.body)
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const userData = {
            username:req.body.username, 
            email:req.body.email,
            password: hashPassword,
            address:req.body.address,
            phone:req.body.phone
        };

        const user = new User(userData);

        await user.save();
        const token = jwtUtils.signToken(user._id, user.email)

        res.status(201).send({token:token})

    } catch (error) {
        res.status(400).send(error);
    }
}




const deleteUser = async (req, res) => {
    try {
        
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization header missing',
            });
        }
        console.log(authHeader)
        const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({
                message: 'Token missing',
            });
        }

        
        
        const userData= jwtUtils.verifyToken(token)
        console.log(userData)
        const user = await User.findByIdAndDelete(userData.id);
       res.send("account deleted")
        // res.status(201).send(user);

    } catch (error) {
        res.status(400).send(error);
    }
}





const loginUser = async (req, res) => {
    try {


        const emailId = req.body.email
        const user = await User.findOne({ email: emailId })
        if (!user) {
            throw new Error("Email not Found")
        }
        const originalPassword = req.body.password
        const isPasswordMatch=await bcrypt.compare(originalPassword, user.password)
        if(!isPasswordMatch){
            throw new Error("Incorrect password")
        }
        
        
        const token = jwtUtils.signToken(user._id, user.email)


        res.status(201).send({token:token});


    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = { createUser, deleteUser, loginUser }