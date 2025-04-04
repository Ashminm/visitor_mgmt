const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
    },
    OriginEmail:{
        type:String,
        unique:true,
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    addedBy:{
        type:String
    },
    date:{
        type: Date,
         default: Date.now,
         required:true
    },
})

const users=mongoose.model('users',userSchema)
module.exports=users