const users=require('../Models/userModel')
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        console.log(req.file);
        if (!req.file) {
            return res.status(400).json("No image uploaded!");
        }
        
        const { username,phone,email, password,addedBy } = req.body;
        const image = req.file.filename;
        const addedByValue = addedBy? addedBy: "Self register"
        const emailExists = await users.findOne({ email });
        if (emailExists) {
            return res.status(406).json("Email already in use!");
        }
        const PhoneExists = await users.findOne({ phone });
        if (PhoneExists) {
            return res.status(406).json("Phone number already in use!");
        }

        const passwordExists = await users.findOne({ password });
        if (passwordExists) {
            return res.status(406).json("Please try strong different password!");
        }

        const newUser = new users({
            username,
            phone,
            email,
            password,
            image,
            addedBy:addedByValue,
            date:Date.now()
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

exports.profileUpdate = async (req, res) => {
    try {
        const { username,phone, email, password } = req.body;
        const image = req.file ? req.file.filename : req.body.image;
        const userId = req.payload;
        if (!userId) {
            return res.status(401).json("Unauthorized request");
        }
        const existingUser = await users.findById(userId);
        if (!existingUser) {
            return res.status(404).json("User not found!");
        }
        const updatedUser = await users.findByIdAndUpdate(userId,
            { 
                username: username || existingUser.username,
                phone: phone || existingUser.phone,
                email: email || existingUser.email,
                password: password || existingUser.password,
                image: image || existingUser.image,
                addedBy: existingUser.addedBy
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json("Internal Server Error: "+err);
    }
};


exports.getUserProfile=async(req,res)=>{
    try{
        const profileId=req.payload
        const profilUser=await users.findOne({_id:profileId})
        res.status(200).json(profilUser)
    }catch(err){
        res.status(401).json(err)
       
    }
}


exports.allUsersforCategory=async(req,res)=>{
    try{
        const result=await users.find()
        res.status(200).json(result)
        console.log(result);
    }catch(err){
        res.status(401).json(err)
    }
}

exports.forgottePassword = async (req, res) => {
    const { email, password, phone } = req.body;
    const { id } = req.params;

    try {
        if (email && phone) {
            const existingUser = await users.findOne({ email, phone });
            if (!existingUser) {
                return res.status(401).json({ error: "Invalid Email or Phone" });
            }
        } else if (email) {
            const existingUser = await users.findOne({ email });
            if (!existingUser) {
                return res.status(401).json({ error: "Invalid Email" });
            }
        } else if (phone) {
            const existingUser = await users.findOne({ phone });
            if (!existingUser) {
                return res.status(401).json({ error: "Invalid Phone" });
            }
        } else {
            return res.status(400).json({ error: "Email or Phone required" });
        }
        const updatedUser = await users.findByIdAndUpdate(
            id, 
            { password },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Password updated successfully" });

    } catch (err) {
        console.error("Forgot password error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteAccont=async(req,res)=>{
    const { id } = req.params;
    try{
        const userData = await users.findByIdAndDelete(id);
        res.status(200).json(userData)
    }catch(err){
        res.status(401).json(err) 
    }
}
