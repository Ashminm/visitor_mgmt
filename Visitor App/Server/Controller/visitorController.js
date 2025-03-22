const visitors = require('../Models/visitors')

exports.addVisitor=async(req,res)=>{
    const {name,aadhaar,phone,othernumber,gender,category,age,purposeVisit,address,arrivedtime,despachtime,currentdate,support,numberofstay,attender,status,remarks}=req.body;
    const image = req.file ? req.file.filename : null; 
    const userId = req.payload;
    console.log("userId is: ",userId);
    
    try{
        if(aadhaar){
            const existingVisitor =await visitors.findOne({userId,aadhaar})
            if(existingVisitor){
                return res.status(406).json("Visitor already exist in your list based on aadaar number");
            }
        }
        if(phone){
            const existingVisitorNum =await visitors.findOne({userId,phone})
            if(existingVisitorNum){
                return res.status(406).json("Visitor already exist in your list based on phone number");
            }
        }
        if (!aadhaar && !phone) {
            const existingVisitorName = await visitors.findOne({ userId, name });
            if (existingVisitorName) {
                return res.status(406).json("Visitor already exists based on Visitor Name");
            }
        }

        const newVisitor = new visitors({name,aadhaar,phone,othernumber,gender,category,age,purposeVisit,address,arrivedtime,despachtime,currentdate,support,numberofstay,attender,status,remarks,image,userId})
        await newVisitor.save()
        return res.status(200).json(newVisitor);
    }catch(err){
        console.log(err);
        return res.status(500).json("New visitor adding faild");
    }
}