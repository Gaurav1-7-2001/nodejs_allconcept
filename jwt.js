const jwt=require('jsonwebtoken');
require('dotenv').config();
const jwtAuthMiddleware=(req,res,next)=>{

    const authorization=req.headers.authorization;
    if(authorization)
        return res.status(404).json({message:"token not found"});
    const token = authorization.split(' ')[1];
    if(!token)
        return res.status(401).json({message:"invalid token"});
    try {
       const decoded= jwt.verify(token,process.env.SECRET_KEY)
       req.user=decoded;
       next() 

    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }

}

const generateToken=(userdata)=>{
    return jwt.sign(userdata,process.env.SECRET_KEY);
}

module.exports={jwtAuthMiddleware,generateToken}