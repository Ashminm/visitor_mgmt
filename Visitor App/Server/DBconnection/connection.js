const mongoose= require('mongoose')

const connectionString= process.env.DATABASE;

mongoose.connect(connectionString).then(()=>{
    console.log("Data base is connected!!");
    
}).catch(rej=>{
    console.log("Data base connection faild!!",rej);
    
})

