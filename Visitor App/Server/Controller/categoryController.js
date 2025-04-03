const categorys=require('../Models/category')


exports.addNewCategory=async(req,res)=>{
    const {categoryName,addedBy}=req.body
    const userId = req.payload;
    // console.log("userId is: ",userId);
    try{
        const existingCategory= await categorys.findOne({categoryName})
        if(existingCategory){
            res.status(406).json("Existing category!!")
        }else{
            const newCategory=new categorys({categoryName,addedBy,userId,date:Date.now()})
            await newCategory.save()
            res.status(200).json(newCategory)
        }
    }catch(err){
        res.status(401).json("Somthing went wrong:"+ err)
        console.log(err);
        

    }

}

exports.allcategory=async(req,res)=>{
    try{
        const result=await categorys.find()
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)  
    }
}

exports.deleteCategory=async(req,res)=>{
    const {id}=req.params
    try{
        const result= await categorys.findByIdAndDelete(id)
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}