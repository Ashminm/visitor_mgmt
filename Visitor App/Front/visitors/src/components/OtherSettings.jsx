import React,{useEffect,useState} from 'react'
import { categoryAddApi,AddAttenderApi } from '../services/AllApis';

function OtherSettings() {
  const [attender,setAttender]=useState(null)
  const [token, setToken] = useState("");
  const [addCategory,setAddCategory]=useState({
    categoryName:"",
    addedBy:""
  })
  const [addAttender,setAddAttender]=useState({
    username:"",
    image:"",
    email:"",
    password:"",
    addedBy:""
  })
  // console.log(addAttender);

// console.log(addCategory);

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    if (name) {
      setAttender(name);
    }
  }, []);

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[token])

  const handleCategoryAdd = async (e) => {
    e.preventDefault();
    if (!addCategory.categoryName || !addCategory.addedBy) {
      alert("Please fill!!");
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
          alert(`${res.data.categoryName}: added success`)
          setAddCategory({categoryName:"",
            addedBy:""})
        }else{
          alert("Category added faild: ",res.data)  
        }
      }catch(error){
        console.log("Error adding visitor:", error);
          alert("An error occurred while adding the visitor");
      }
    } 
  };

  const handleAddAttender=async(e)=>{
    e.preventDefault();
    if(!addAttender.username || !addAttender.image || !addAttender.email || !addAttender.password || !addAttender.addedBy){
      alert("Please fill new attender details")
    }else{
      const dataform=new FormData();
      dataform.append("username",addAttender.username);
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
      alert(`New attender added!!`)
      setAddAttender({username:"",
        image:"",
        email:"",
        password:"",
        addedBy:""})
    }else{
      alert("Attenter added faild: ",res.data)
    }
    }
  }



  

  return (
    <div>
      <div className="p-7 text-center">
        <h1 className='text-2xl'>Other Settings</h1>
        <h1>Adding for new attander, new category</h1>
      </div>
      <section>
      <div className="flex flex-col md:flex-row gap-6 p-6 max-w-4xl mx-auto">
      {/* Add New Attender Section  */}
      <div className="w-full md:w-1/2 bg-slate-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Add New Attender</h2>
        <form className="space-y-4" onSubmit={handleAddAttender}>
          <input type="text" placeholder="Name*" className="w-full p-2 border rounded" onChange={(e)=>setAddAttender({...addAttender,username:e.target.value})} value={addAttender.username} />
          <label htmlFor="" className='block text-gray-400 w-full px-3 py-2 bg-white border outline-none rounded-md cursor-pointer focus:ring-2 focus:ring-amber-500'>Attender photo*
          <input type="file" className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none " accept="image/*" onChange={(e)=>setAddAttender({...addAttender,image:e.target.files[0]})} />
          </label>
          <input type="email" placeholder="Email*" className="w-full p-2 border rounded"onChange={(e)=>setAddAttender({...addAttender,email:e.target.value})} value={addAttender.email}  />
          <input type="password" placeholder="Password*" className="w-full p-2 border rounded" onChange={(e)=>setAddAttender({...addAttender,password:e.target.value})} value={addAttender.password}  />
          <select className="w-full p-2 border rounded" defaultValue="" onChange={(e)=>setAddAttender({...addAttender,addedBy:e.target.value})} value={addAttender.addedBy} >
            <option value="">Added by*</option>
            {attender && <option value={attender}>{attender}</option>}
          </select>
          <button type="submit" className="w-full bg-amber-600 text-white p-2 rounded hover:bg-amber-700">Submit</button>
        </form>
      </div>

      {/* Add Category Section */}
      <div className="w-full md:w-1/2 bg-slate-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Add New Category</h2>
        <form className="space-y-4" onSubmit={handleCategoryAdd}>
        <input type="text" placeholder='Category Name*'  className="w-full p-2 border rounded" onChange={(e)=>{setAddCategory({...addCategory,categoryName:e.target.value})}}
                value={addCategory.categoryName}  />
          <select className="w-full p-2 border rounded" defaultValue="" value={addCategory.addedBy} onChange={(e)=>{setAddCategory({...addCategory,addedBy:e.target.value})}} >
            <option value="">Added by*</option>
            {attender && <option value={attender}>{attender}</option>}
          </select>
          
          <button type="submit" className="w-full bg-amber-600 text-white p-2 rounded hover:bg-amber-700">Submit</button>
        </form>
      </div>
    </div>
      </section>

    </div>
  )
}

export default OtherSettings
