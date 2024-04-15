// JWT Verification middleware here
const jwt = require('jsonwebtoken')
const usersdb = require('../model/userSchema')



const userTokenVerify = async (req, res, next) => {
    const token = req.headers.authorization;


    if (!token) {
        return res.status(401).json({ info: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decoded.userId
        const user = await usersdb.findById(userId)
        if(!user){
            return res.status(401).json({error:"Invalid token"})
        }

        req.user = user
        next();
    } catch (error) {
        console.error('Error verifying user token:', error);
        return res.status(401).json({ info: 'Invalid authorization token' });
    }
};



const adminTokenVerify = (req, res, next) => {
    try {
        const token = req.headers.authorization;
 
        if (!token) {
            return res.status(401).json({ info: 'Authorization token is missing' });
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.admin = decoded.email;
        next();
    } catch (error) {
        console.error('Error verifying admin token:', error);
        return res.status(401).json({ info: 'Invalid authorization token' });
    }
}


module.exports = {
    userTokenVerify,
    adminTokenVerify,
}