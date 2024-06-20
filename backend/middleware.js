
const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(403).json({msg : "Authorization header not found"});
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET); // return an object
        if(decoded.userID){
            req.userID = decoded.userID;
            next();
        }
        else{
            return res.status(403).json({msg : "User not found"});
        }
    } catch(err){
        return res.status(403).json({msg:"Something went wrong"});
    }

};

module.exports = {
    authMiddleware
}