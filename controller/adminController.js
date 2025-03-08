const Admin = require('../models/adminModel')
const jwtUtils = require('../utils/jwtUtils')
const bcrypt = require('bcrypt')

const createAdmin = async (req, res) => {
    try {
        console.log(req.body)
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const adminData = {
            username: req.body.username, // Unique username for admin/seller
            email: req.body.email, // Unique email for admin/seller
            password: hashPassword, // Hashed password
          
            phone: req.body.phone 
        };

        const admin = new Admin(adminData)

        await admin.save();
        const token = jwtUtils.signToken(admin._id, admin.email)

        res.status(201).send({token:token})

    } catch (error) {
        res.status(400).send(error);
    }
}




const deleteAdmin = async (req, res) => {
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

        
        
        const adminData= jwtUtils.verifyToken(token)
        console.log(adminData)
        const admin = await Admin.findByIdAndDelete(adminData.id);
       res.send("account deleted")
        // res.status(201).send(user);

    } catch (error) {
        res.status(400).send(error);
    }
}





const loginAdmin = async (req, res) => {
    try {


        const emailId = req.body.email
        const admin = await Admin.findOne({ email: emailId })
        if (!admin) {
            throw new Error("Email not Found")
        }
        const originalPassword = req.body.password
        const isPasswordMatch=await bcrypt.compare(originalPassword, admin.password)
        if(!isPasswordMatch){
            throw new Error("Incorrect password")
        }
        
        
        const token = jwtUtils.signToken(admin._id, admin.email)


        res.status(201).send({token:token});


    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = { createAdmin, deleteAdmin, loginAdmin }