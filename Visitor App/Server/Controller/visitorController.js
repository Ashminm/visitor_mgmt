const visitors = require('../Models/visitors')

// exports.addVisitor=async(req,res)=>{
//     const {name,aadhaar,phone,othernumber,gender,category,age,purposeVisit,address,arrivedtime,despachtime,currentdate,support,numberofstay,attender,status,remarks}=req.body;
//     const image = req.file ? req.file.filename : null; 
//     const userId = req.payload;
//     // console.log("userId is: ",userId);
    
//     try{
//         if(aadhaar){
//             const existingVisitor =await visitors.findOne({aadhaar})
//             if(existingVisitor){
//                 return res.status(406).json("Visitor already exist in your list based on aadaar number");
//             }
//         }
//         if(phone){
//             const existingVisitorNum =await visitors.findOne({phone})
//             if(existingVisitorNum){
//                 return res.status(406).json("Visitor already exist in your list based on phone number");
//             }
//         }
//         if (!aadhaar && !phone) {
//             const existingVisitorName = await visitors.findOne({name });
//             if (existingVisitorName) {
//                 return res.status(406).json("Visitor already exists based on Visitor Name");
//             }
//         }

//         const formattedPurposeVisit = Array.isArray(purposeVisit)
//         ? purposeVisit.map(purpose => ({ purpose }))
//         : [{ purpose: purposeVisit }];

//         const newVisitor = new visitors({name,aadhaar,phone,othernumber,gender,category,age,purposeVisit: formattedPurposeVisit,address,arrivedtime,despachtime,currentdate,support,numberofstay,attender,status,remarks,image,userId})
//         await newVisitor.save()
//         return res.status(200).json(newVisitor);
//     }catch(err){
//         console.log(err);
//         return res.status(500).json("New visitor adding faild");
//     }
// }

exports.addUpdateVisitor = async (req, res) => {
    const {
        name, aadhaar, phone, othernumber, gender, category, age, purposeVisit,
        address, arrivedtime, despachtime, currentdate, support,
        numberofstay, attender, status, remarks
    } = req.body;

    const image = req.file ? req.file.filename : null;
    const userId = req.payload;

    try {
        if (!phone) {
            return res.status(400).json({ message: "Phone number is required" });
        }
        let query = aadhaar 
        ? { $or: [{ phone: phone }, { aadhaar: aadhaar }] } 
        : { phone: phone };
      
      let existingVisitor = await visitors.findOne(query);
        if (existingVisitor) {
            // Convert new inputs into array format
            const newPurposeVisit = Array.isArray(purposeVisit) ? purposeVisit.map(purpose => ({ purpose })) : [{ purpose: purposeVisit }];
            const newArrivedTime = Array.isArray(arrivedtime) ? arrivedtime.map(time => ({ time })) : [{ time: arrivedtime }];
            const newDespatchTime = Array.isArray(despachtime) ? despachtime.map(time => ({ time })) : [{ time: despachtime }];
            const newCurrentDate = Array.isArray(currentdate) ? currentdate.map(date => ({ date })) : [{ date: currentdate }];
            const newSupport = Array.isArray(support) ? support.map(s => ({ support: s })) : [{ support }];
            const newNumberOfStay = Array.isArray(numberofstay) ? numberofstay.map(n => ({ number: n })) : [{ number: numberofstay }];
            const newAttender = Array.isArray(attender) ? attender.map(a => ({ attender: a })) : [{ attender }];
            const newRemarks = Array.isArray(remarks) ? remarks.map(r => ({ remark: r })) : [{ remark: remarks }];

            // Append new data to existing records
            existingVisitor.purposeVisit = [...existingVisitor.purposeVisit, ...newPurposeVisit];
            existingVisitor.arrivedtime = [...existingVisitor.arrivedtime, ...newArrivedTime];
            existingVisitor.despachtime = [...existingVisitor.despachtime, ...newDespatchTime];
            existingVisitor.currentdate = [...existingVisitor.currentdate, ...newCurrentDate];
            existingVisitor.support = [...existingVisitor.support, ...newSupport];
            existingVisitor.numberofstay = [...existingVisitor.numberofstay, ...newNumberOfStay];
            existingVisitor.attender = [...existingVisitor.attender, ...newAttender];
            existingVisitor.remarks = [...existingVisitor.remarks, ...newRemarks];

            // Update visitor
            const updatedVisitor = await visitors.findByIdAndUpdate(
                existingVisitor._id,
                { $set: { purposeVisit: existingVisitor.purposeVisit, arrivedtime: existingVisitor.arrivedtime, despachtime: existingVisitor.despachtime, currentdate: existingVisitor.currentdate, support: existingVisitor.support, numberofstay: existingVisitor.numberofstay, attender: existingVisitor.attender, remarks: existingVisitor.remarks } },
                { new: true }
            );

            return res.status(200).json({message:"Existing visitor new detailse add successfully",updatedVisitor});
        } else {
            // Format input data for a new visitor
            const formattedPurposeVisit = Array.isArray(purposeVisit) ? purposeVisit.map(purpose => ({ purpose })) : [{ purpose: purposeVisit }];
            const formattedArrivedTime = Array.isArray(arrivedtime) ? arrivedtime.map(time => ({ time })) : [{ time: arrivedtime }];
            const formattedDespatchTime = Array.isArray(despachtime) ? despachtime.map(time => ({ time })) : [{ time: despachtime }];
            const formattedCurrentDate = Array.isArray(currentdate) ? currentdate.map(date => ({ date })) : [{ date: currentdate }];
            const formattedSupport = Array.isArray(support) ? support.map(s => ({ support: s })) : [{ support }];
            const formattedNumberOfStay = Array.isArray(numberofstay) ? numberofstay.map(n => ({ number: n })) : [{ number: numberofstay }];
            const formattedAttender = Array.isArray(attender) ? attender.map(a => ({ attender: a })) : [{ attender }];
            const formattedRemarks = Array.isArray(remarks) ? remarks.map(r => ({ remark: r })) : [{ remark: remarks }];

            const newVisitor = new visitors({
                name, aadhaar, phone, othernumber, gender, category, age,address,
                purposeVisit: formattedPurposeVisit,
                arrivedtime: formattedArrivedTime,
                despachtime: formattedDespatchTime,
                currentdate: formattedCurrentDate,
                support: formattedSupport,
                numberofstay: formattedNumberOfStay,
                attender: formattedAttender,
                status, remarks: formattedRemarks,
                image, userId
            });

            await newVisitor.save();
            return res.status(201).json({messege:"New visitor add sucessfully",newVisitor}); 
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Visitor processing failed" });
    }
};


// exports.visitorList=async(req,res)=>{
//     try{
//         const result=await visitors.find();
//         console.log(result);   
//         res.status(200).json(result)
//     }catch(err){
//         res.status(401).json(err);
//         console.log("Visitors is: ",err);  
//     }
// }


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
        console.log(err);
        
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

exports.updateVisitor = async (req, res) => {
    const {
        name, aadhaar, phone, othernumber, gender, category, age, purposeVisit,
        address, arrivedtime, despachtime, currentdate, support,
        numberofstay, attender, status, remarks
    } = req.body;

    const image = req.file ? req.file.filename : null;
    const { id } = req.params;
    const userId = req.payload;

    try {
        const existingVisitor = await visitors.findById(id);
        if (!existingVisitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }

        // Function to update the last element in an array
        const updateLastArrayItem = (array, key, newValue) => {
            if (array.length > 0) {
                array[array.length - 1][key] = newValue;
            }
        };

        // Update the last object in each array field if a new value is provided
        if (purposeVisit) updateLastArrayItem(existingVisitor.purposeVisit, "purpose", purposeVisit);
        if (arrivedtime) updateLastArrayItem(existingVisitor.arrivedtime, "time", arrivedtime);
        if (despachtime) updateLastArrayItem(existingVisitor.despachtime, "time", despachtime);
        if (currentdate) updateLastArrayItem(existingVisitor.currentdate, "date", currentdate);
        if (support) updateLastArrayItem(existingVisitor.support, "support", support);
        if (numberofstay) updateLastArrayItem(existingVisitor.numberofstay, "number", numberofstay);
        if (attender) updateLastArrayItem(existingVisitor.attender, "attender", attender);
        if (remarks) updateLastArrayItem(existingVisitor.remarks, "remark", remarks);

        // Update other fields
        existingVisitor.name = name || existingVisitor.name;
        existingVisitor.aadhaar = aadhaar || existingVisitor.aadhaar;
        existingVisitor.phone = phone || existingVisitor.phone;
        existingVisitor.othernumber = othernumber || existingVisitor.othernumber;
        existingVisitor.gender = gender || existingVisitor.gender;
        existingVisitor.category = category || existingVisitor.category;
        existingVisitor.age = age || existingVisitor.age;
        existingVisitor.address = address || existingVisitor.address;
        existingVisitor.status = status || existingVisitor.status;
        existingVisitor.userId = userId || existingVisitor.userId;

        // Update image if a new one is provided
        if (image) {
            existingVisitor.image = image;
        }

        const updatedVisitor = await existingVisitor.save();

        res.status(200).json({
            message: "Visitor details updated successfully",
            updatedVisitor
        });
    } catch (err) {
        console.error("Error updating visitor:", err);
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};

exports.CheckoutUpdate=async(req,res)=>{
    const {status}=req.body
    const {id}=req.params
    try{
        const result= await visitors.findByIdAndUpdate({_id:id},{status},{ new: true })
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}
