const users=require('../Models/userModel')
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json("No image uploaded!");
        }
        
        const { username, email, password } = req.body;
        const image = req.file.filename;

        // Check if the email is already in use
        const emailExists = await users.findOne({ email });
        if (emailExists) {
            return res.status(406).json("Email already in use!");
        }

        // Check if the password is already in use
        const passwordExists = await users.findOne({ password });
        if (passwordExists) {
            return res.status(406).json("Please try different password!");
        }

        const newUser = new users({
            username,
            email,
            password,
            image
        });

        await newUser.save();
        res.status(200).json(newUser);
        
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
};


exports.Login=async(req,res)=>{
    
    try{
        const {email,password}=req.body
        const existingUser = await users.findOne({ email,password })

        
    if(existingUser){
        const token=jwt.sign({userId:existingUser._id}, process.env.JWT_SEACRETKEY)
        res.status(200).json({token,existingUser,role:"user"})
        console.log({token,existingUser,role:"user"});  

    }else{
        res.status(406).json("Invalid email or password!!")
    }
    }catch(err){
        console.log(err);
        
        res.status(401).json("SOMTHING WANT WRONG" + err);
    }

}