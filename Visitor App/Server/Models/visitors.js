const mongoose=require('mongoose')

const visitorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    aadhaar:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    othernumber:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    
    age:{
        type:Number,
        required:true
    },
    
    purposeVisit:{
        type:String,
        required:true
    },
    
    address:{
        type:String,
        required:true
    },
    
    arrivedtime:{
        type:String,
        required:true
    },
    
    despachtime:{
        type:String,
        required:true
    },
    
    currentdate:{
        type:String,
        required:true
    },
    
    support:{
        type:String,
        required:true
    },
    
    image:{
        type:String,
        required:true
    },
    
    numberofstay:{
        type:String,
        required:true
    },
    
    attender:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    remarks:{
        type:String,
        required:true
    }
})

const visitors=mongoose.model('visitors',visitorSchema)
module.exports=visitors