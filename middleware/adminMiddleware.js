const Admin=rqquire('../models/adminModel.js')

const adminMiddleware = () => {
    return async(req, res, next) => {
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
            const admin=await Admin.findById(user.id)
            if(!admin){
                return res.status(401).json({
                    message:'Not an Admin'
                })
        }
        
            // get the id
            // check if its present in the admin collection
            // if not return error

            req.user = decoded;
            next();
        } catch (error) {
            console.error('Error in authenticateUserMiddleware:', error.message);
            return res.status(401).json({
                message: 'Invalid or expired token',
            });
        }
    };
};
