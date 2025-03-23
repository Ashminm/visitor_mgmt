const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
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
        type:String,
        required:true
    },
    date:{
        type: Date,
         default: Date.now,
         required:true
    },
})

const users=mongoose.model('users',userSchema)
module.exports=users