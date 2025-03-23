const jwt=require('jsonwebtoken')

const jwtMiddileware=(req,res,next)=>{
    try{
        const token=req.headers['authorization'].split(" ")[1] 
        console.log("JWT file Token : ",token);
        
    if(token){
        const jwtResponse=jwt.verify(token,process.env.JWT_SEACRETKEY)
        req.payload=jwtResponse.userId        
        next()
    }
    else{
        res.status(401).json("Unauthorized access! Token is missing.")
    }
    }catch(err){
        res.status(401).json("Invalid or expired token! Please log in again.")
        console.log(err);
        
    }
} 

module.exports=jwtMiddileware
