import React,{useEffect,useState} from 'react'
import { categoryAddApi,AddAttenderApi,getUserSpecificApi,allCategoryApi,DeleteCategoryApi } from '../services/AllApis';
import toast from "react-hot-toast"

function OtherSettings() {
  const [attender,setAttender]=useState(null)
  const [token, setToken] = useState("");
  const [allcategory,setAllCategory]=useState([])
  const [addCategory,setAddCategory]=useState({
    categoryName:"",
    addedBy:""
  })
  const [addAttender,setAddAttender]=useState({
    username:"",
    phone:"",
    image:"",
    email:"",
    password:"",
    addedBy:""
  })
  
  // console.log(allcategory);

// console.log(addCategory);
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    if(token){
      getUserSpecific()
      getAllcategory()
    }
  },[token])

  const getUserSpecific = async()=>{
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }; 
    const res=await getUserSpecificApi(headers)
    if(res.status===200){
      setAttender(res.data.username)
    }
  }
  const getAllcategory = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
      const res = await allCategoryApi(headers); 
      if (res.status === 200) {
        setAllCategory(res.data);
      }
  }; 

  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    if (!addCategory.categoryName || !addCategory.addedBy) {
      toast.error("Please fill category");
    }else{
      const formdata= new FormData();
      formdata.append("categoryName",addCategory.categoryName);
      formdata.append("addedBy",addCategory.addedBy);
      const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      };
      try{
        const res = await categoryAddApi(formdata,reqHeader);
        if(res.status===200){
          toast.success(`${res.data.categoryName}: added success`)
          setAddCategory({categoryName:"",
            addedBy:""})
            getAllcategory()
        }else{
          toast.error("Category added faild: ",res.response.data)  
        }
      }catch(error){
          toast.error("An error occurred while adding the visitor");
      }
    } 
  };

  const handleAddAttender=async(e)=>{
    e.preventDefault();
    if(!addAttender.username ||!addAttender.phone || !addAttender.image || !addAttender.email || !addAttender.password || !addAttender.addedBy){
      toast.error("Please fill new attender details")
    }else{
      const dataform=new FormData();
      dataform.append("username",addAttender.username);
      dataform.append("phone",addAttender.phone);
      dataform.append("image",addAttender.image);
      dataform.append("email",addAttender.email);
      dataform.append("password",addAttender.password);
      dataform.append("addedBy",addAttender.addedBy);
      const HeaderReq = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
    };
    const result= await AddAttenderApi(dataform,HeaderReq)  
    if(result.status===200){
      toast.success(`New attender added!!`)
      setAddAttender({username:"",
        image:"",
        phone:'',
        email:"",
        password:"",
        addedBy:""})
    }else{
      toast.error("Attenter added faild: "+result.data)
    }
    }
  } 

  const categoryDelete=async(id)=>{
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
  };
  const res=await DeleteCategoryApi(reqHeader,id)
    if(res.status===200){
      toast.success(`${res.data.categoryName}: deleted!`)
      getAllcategory()
    }else{
      toast.error("Deletion faild!")
    }
  }


  return (
    <div className='border-e-2'>
      <section>
      <div className="flex flex-col md:flex-row gap-6 p-6 max-w-4xl mx-auto">
      {/* Add New Attender Section  */}
      <div className="w-full md:w-1/2 bg-slate-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Add New Attender</h2>
        <form className="space-y-4" onSubmit={handleAddAttender}>
          <input type="text" placeholder="Name*" className="w-full p-2 border rounded" autoComplete="username" onChange={(e)=>setAddAttender({...addAttender,username:e.target.value})} value={addAttender.username} />
          <label htmlFor="" className='block text-gray-400 w-full px-3 py-2 bg-white border outline-none rounded-md cursor-pointer focus:ring-2 focus:ring-amber-500'>Attender photo*
          <input type="file" className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none " accept="image/*" onChange={(e)=>setAddAttender({...addAttender,image:e.target.files[0]})} />
          </label>
          <input type="number" placeholder="Phone*" className="w-full p-2 border rounded" autoComplete="phone" onChange={(e)=>setAddAttender({...addAttender,phone:e.target.value})} value={addAttender.phone}  />
          <input type="email" placeholder="Email*" className="w-full p-2 border rounded" autoComplete="email" onChange={(e)=>setAddAttender({...addAttender,email:e.target.value})} value={addAttender.email}  />
          <input type="password" placeholder="Password*" className="w-full p-2 border rounded" autoComplete="current-password" onChange={(e)=>setAddAttender({...addAttender,password:e.target.value})} value={addAttender.password}  />
          <select className="w-full p-2 border rounded" onChange={(e)=>setAddAttender({...addAttender,addedBy:e.target.value})} value={addAttender.addedBy} >
            <option value="">Added by*</option>
            {attender && <option value={attender}>{attender}</option>}
          </select>
          <button type="submit" className="w-full bg-orange-400 text-white p-2 rounded hover:bg-orange-500">Submit</button>
        </form>
      </div>

      {/* Add Category Section */}
      <div className="w-full md:w-1/2">
        <div className='p-6 bg-slate-100 rounded-lg mb-4'>
        <h2 className="text-xl font-semibold mb-6">Add New Category</h2>
        <form className="space-y-4" onSubmit={handleCategoryAdd}>
        <input type="text" placeholder='Category Name*'  className="w-full p-2 border rounded" onChange={(e)=>{setAddCategory({...addCategory,categoryName:e.target.value})}}
                value={addCategory.categoryName}  />
          <select className="w-full p-2 border rounded" value={addCategory.addedBy} onChange={(e)=>{setAddCategory({...addCategory,addedBy:e.target.value})}} >
            <option value="">Added by*</option>
            {attender && <option value={attender}>{attender}</option>}
          </select>
          
          <button type="submit" className="w-full bg-orange-400 text-white p-2 rounded hover:bg-orange-500">Submit</button>
        </form>
        </div>
        <div className="bg-slate-100 rounded-lg p-6 pt-0 h-[17rem] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6 border-b-2 sticky top-0 pt-6 z-50 bg-slate-100">All Category</h2>
        {allcategory?.length > 0 ? (
          allcategory.map((item, index) => (
            <div key={index} className="flex justify-between gap-4 text-lg mb-4">
              <p>{item.categoryName}</p>
              <span className="material-symbols-outlined text-red-500 cursor-pointer" onClick={()=>categoryDelete(item._id)}>delete</span>
            </div>
          ))
        ) : (
          <p>No category</p>
        )}

            
           
        </div>
      </div>
    </div>
      </section>

    </div>
  )
}

export default OtherSettings
