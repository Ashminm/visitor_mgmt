const visitors = require('../Models/visitors')

exports.addVisitor=async(req,res)=>{
    const {name,aadhaar,phone,othernumber,gender,category,age,purposeVisit,address,arrivedtime,despachtime,currentdate,support,numberofstay,attender,status,remarks}=req.body;
    const image = req.file ? req.file.filename : null; 
    const userId = req.payload;
    // console.log("userId is: ",userId);
    
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

exports.visitorList=async(req,res)=>{
    try{
        const res=await visitors.find();
        res.status(200).json(res)
        console.log(res);   
    }catch(err){
        res.status(401).json(err);
        console.log("Visitors is: "+err);  
    }
}


exports.allVisitors=async(req,res)=>{
    const searchKey=req.query.search
    // console.log(req.query);
    const query = {
        $or: [
          { aadhaar: { $regex: searchKey, $options: "i" } },
          { phone: { $regex: searchKey, $options: "i" } },
          { name: { $regex: searchKey, $options: "i" } },
          { $expr: { $regexMatch: { input: { $toString: "$phone" }, regex: searchKey, options: "i" } } }, 
          { $expr: { $regexMatch: { input: { $toString: "$aadhaar" }, regex: searchKey, options: "i" } } }
        ]
      };
    try{
        const result= await visitors.find(query)
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}


exports.deleteVisitor = async (req, res) => {
    const { id } = req.params;
    console.log("params Id:", id);

    try {
        const deletedVisitor = await visitors.findByIdAndDelete(id);
        if (!deletedVisitor) {
            return res.status(404).json("Visitor not found");
        }

        res.status(200).json(deletedVisitor);
        console.log(deletedVisitor);
        
    } catch (err) {
        console.error("Error deleting visitor:", err);
        res.status(500).json("Internal Server Error");
    }
};
