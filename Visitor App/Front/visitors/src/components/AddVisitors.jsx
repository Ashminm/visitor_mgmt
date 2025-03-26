import React,{useState,useEffect} from 'react'
import { AddVisitorApi,allCategoryApi,getUserSpecificApi } from '../services/AllApis';


function AddVisitors() {
  const [token, setToken] = useState("");
  // const [allUsers,setAllUsers]=useState([])
  const [allcategory,setAllCategory]=useState([])
  const [attender,setAttender]=useState(null)
  const [visitorData,setVisitorData]=useState({
    name: "",
    aadhaar: "",
    phone: "",
    othernumber:"",
    gender: "",
    category: "",
    age: "",
    purposeVisit: "",
    address: "",
    arrivedtime: "",
    despachtime: "",
    currentdate: "",
    support: "",
    image: "",
    numberofstay: "",
    attender: "",
    status: "",
    remarks: "",
})
// console.log(visitorData);

useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
  }
},[])

useEffect(() => {
  if (token) {
    getAllcategory();
    getUserSpecific()
  }
}, [token]);

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

// const getAllUsers = async () => {
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     };

//     const res = await allUsersApi(headers);  
//     if (res.status === 200) {
//       setAllUsers(res.data);
//     }
// };

const handleAddVisitor = async (e) => {
      e.preventDefault();
    
      if (
        !visitorData.name ||
        !visitorData.gender ||
        !visitorData.phone ||
        !visitorData.category ||
        !visitorData.age ||
        !visitorData.purposeVisit ||
        !visitorData.address ||
        !visitorData.arrivedtime ||
        !visitorData.currentdate ||
        !visitorData.support ||
        !visitorData.attender ||
        !visitorData.status ||
        !visitorData.remarks
      ) {
        alert("Please fill in all the details!");
      } else {
        const formData = new FormData();
        formData.append("name", visitorData.name);
        formData.append("aadhaar", visitorData.aadhaar);
        formData.append("phone", visitorData.phone);
        formData.append("othernumber", visitorData.othernumber);
        formData.append("gender", visitorData.gender);
        formData.append("category", visitorData.category);
        formData.append("age", visitorData.age);
        formData.append("purposeVisit", visitorData.purposeVisit);
        formData.append("address", visitorData.address);
        formData.append("arrivedtime", visitorData.arrivedtime);
        formData.append("despachtime", visitorData.despachtime);
        formData.append("currentdate", visitorData.currentdate);
        formData.append("support", visitorData.support);
        formData.append("image", visitorData.image);
        formData.append("numberofstay", visitorData.numberofstay);
        formData.append("attender", visitorData.attender);
        formData.append("status", visitorData.status);
        formData.append("remarks", visitorData.remarks);
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
      };
        try {
          const res = await AddVisitorApi(formData,reqHeader);
          if (res.status === 200) {
            alert("Added successfully");
            setVisitorData({ name: "",
              aadhaar: "",
              phone: "",
              othernumber:"",
              gender: "",
              category: "",
              age: "",
              purposeVisit: "",
              address: "",
              arrivedtime: "",
              despachtime: "",
              currentdate: "",
              support: "",
              image: "",
              numberofstay: "",
              attender: "",
              status: "",
              remarks: "",})
          } else {
            alert("Addition failed: "+res.data);
          }
        } catch (error) {
          console.log("Error adding visitor:", error);
          alert("An error occurred while adding the visitor");
        }
      }
    };

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

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-lg rounded-lg border">
    <h2 className="text-xl font-semibold mb-1 mt-3 text-center">Add a New Visitor</h2>
    <h2 className="text-sm mb-9 text-slate-400 text-center">We're delighted to have you with us. Kindly fill in the following information.</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddVisitor}>
      <input type="text" placeholder="Name*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,name:e.target.value})}}
            value={visitorData.name}  />
      <input type="text" placeholder="aadhaar Number" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" pattern="\d{4}-\d{4}-\d{4}" title="Aadhar number must be in the format XXXX-XXXX-XXXX" onChange={(e)=>{setVisitorData({...visitorData,aadhaar:e.target.value})}}
            value={visitorData.aadhaar} />
      <input type="tel" placeholder="Phone Number*" pattern='\d{10}' title='Phone number must 10 digit and not include Alphabets' className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,phone:e.target.value})}}
            value={visitorData.phone} />
      <input type="tel" placeholder="Other Contact" pattern='\d{10}' title='Phone number must 10 digit and not include Alphabets'  className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,othernumber:e.target.value})}}
            value={visitorData.othernumber}/>
      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" value={visitorData.gender} onChange={(e)=>{setVisitorData({...visitorData,gender:e.target.value})}}
      >
        <option value="">Select Gender*</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <select
        className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none"
        onChange={(e) => setVisitorData({ ...visitorData, category: e.target.value })} value={visitorData.category}
    >
        <option value="">Select Category*</option>
        {allcategory.map((category, index) => (
            <option key={index} value={category.categoryName}>
                {category.categoryName}
            </option>
        ))}
    </select>
      <input type="number" placeholder="Age*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,age:e.target.value})}}
            value={visitorData.age} />
      <input type="text" placeholder="Purpose of Visit*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,purposeVisit:e.target.value})}}
            value={visitorData.purposeVisit}/>
      <textarea placeholder="Address*" className="p-2 border rounded col-span-2 focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,address:e.target.value})}}
            value={visitorData.address}></textarea>
      <label htmlFor="">Arrived Time*</label>
      <input type="time" placeholder="Arrived Time" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" value={visitorData.arrivedtime} onChange={(e)=>{setVisitorData({...visitorData,arrivedtime:e.target.value})}}/>
      <label htmlFor="">Despatch Time</label>
      <input type="time" placeholder="Departed Time" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" value={visitorData.despachtime} onChange={(e)=>{setVisitorData({...visitorData,despachtime:e.target.value})}}/>
      <input type="date" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,currentdate:e.target.value})}}
            value={visitorData.currentdate} />
      <input type="text" placeholder="Support Given*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,support:e.target.value})}} value={visitorData.support}/>
      <label className="block text-gray-400 w-full px-3 py-2 border rounded-md cursor-pointer focus:ring-2 focus:ring-amber-500">Upload your Photo<input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none hidden"
                onChange={(e)=>{setVisitorData({...visitorData,image:e.target.files[0]})}}
                /></label> 
      <input type="text" placeholder="Number of days stay" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,numberofstay:e.target.value})}}
            value={visitorData.numberofstay}/>
            <select 
          className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" 
          onChange={(e) => setVisitorData({ ...visitorData, attender: e.target.value })} value={visitorData.attender}
        >
          <option value="">Select Attender*</option>
          {attender && <option value={attender}>{attender}</option>}
        </select>

      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,status:e.target.value})}} value={visitorData.status}>
        <option value="">Status*</option>
        <option value="Pending">Check in</option>
        <option value="Check out">Check out</option> 
      </select>
      <textarea placeholder="Remarks*" rows={1} className="p-2 border rounded col-span-2 focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,remarks:e.target.value})}}
            value={visitorData.remarks}></textarea>

      <button className="col-span-2 bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700">Submit</button>
    </form>
  </div>
  )
}

export default AddVisitors
