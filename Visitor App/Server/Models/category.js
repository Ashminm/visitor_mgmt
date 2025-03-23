const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    categoryName:{
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
    userId:{
        type:String,
        required:true  
    }
})

const categorys=mongoose.model('categorys',categorySchema)
module.exports=categorys