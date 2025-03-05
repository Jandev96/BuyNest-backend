require('dotenv').config();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/jwtUtils');

const roleCheckMiddleware = () => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    message: 'Access token is missing',
                });
            }

            const decoded = verifyToken(token);

            // Check if the user's role is in the allowedRoles array
            const user = decoded;
        

            req.user = decoded;
            next();
        } catch (error) {
            console.error('Error in roleCheckMiddleware:', error.message);
            return res.status(401).json({
                message: 'Invalid or expired token',
            });
        }
    };
};


module.exports = roleCheckMiddleware