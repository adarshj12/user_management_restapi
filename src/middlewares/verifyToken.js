const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyUser =(req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.user){
            next();
        }    
        else {
            return res.status(401).json({ message: `Unauthorized` });
        } 
    } catch (error) {
        return res.status(400).json({ message: `Authorization failed due to  ${error.message}` })
    }
}

const verifyAdmin =(req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.admin){
            next();
        }    
        else {
            return res.status(401).json({ message: `Unauthorized` });
        } 
    } catch (error) {
        return res.status(400).json({ message: `Authorization failed due to  ${error.message}` })
    }
}


module.exports={
    verifyUser,
    verifyAdmin
}