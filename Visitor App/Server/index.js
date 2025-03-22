require('dotenv').config()
const express=require('express')
const cors=require('cors')
require('./DBconnection/connection')
const router=require('./Routes/route')


const visitor=express()
visitor.use(cors())
visitor.use(express.json())
visitor.use(router)

const PORT=4000 || process.env.PORT

visitor.listen(PORT,()=>{
    console.log("Visitor server at:",PORT);
    
})

visitor.get("/",(req,res)=>{
    res.send("<h3>Visitor is Waiting.....</h3>")
})
