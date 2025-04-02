import React, { useState,useEffect } from "react";
import logo from '../assets/file.png'
import Profile from "./Profile";
import AddVisitors from "./AddVisitors";
import AllVisitors from "./AllVisitors";
import OtherSettings from "./OtherSettings";
import { getUserSpecificApi,getAllvisitorApi,updateCheckoutApi } from "../services/AllApis";
import Delete from "./Delete";
import toast from "react-hot-toast";


function Home() {
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [allVisitors,setAllVisitors]=useState([])
  const [search,setSearch]=useState('')
  const [nameUser,setNameUser]=useState([])


  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  useEffect(() => {
    if (token) {
      getVisitors()
      getUserName()
    }
  }, [token,search]);

  const getVisitors=async()=>{
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res=await getAllvisitorApi(headers,search)
    // console.log(res.data[0].age);
    
    if(res.status===200){
      setAllVisitors(res.data)
    }
  }
  const getUserName=async()=>{
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res=await getUserSpecificApi(headers)
    if(res.status===200){
      setNameUser(res.data)
    }
  }
// console.log(nameUser.username);
// console.log(allVisitors[1]);

const handleCheckOut=async(id)=>{
  let checkout = { status: "Check out" };
  const reqHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const res=await updateCheckoutApi(checkout,reqHeaders,id)
  if(res.status===200){
    toast.success("Check out")
    getVisitors()
  }else{
    toast.error("Check out faild!")
  }
  
}


  return (
    <div className="max-w-8xl mx-auto px-4">
        <nav className="flex justify-between items-center py-4 border-b bg-white  sticky top-0 "> 
            <div className="pl-4"> 
            <img src={logo} className='w-11' alt="" />
            </div>
            <div>
            <div className="w-screen max-w-3xl h-auto flex flex-col">
        {/* Tab Navigation */}
        <div className="flex h-16 items-center cursor-pointer">
          {["home", "add-visitor", "all-visitors","other-settings","profile-settings"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 text-center capitalize ${
                activeTab === tab ? "border-b-2 border-amber-600 text-amber-600 font-semibold" : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>
        {/* Tab Content */}
      </div>
    </div>
    </nav>
        <div className="p-4 ">
          {activeTab === "home" && (
             <div className="gap-3 flex flex-col items-center md:flex-row justify-start">
             
             <div className="p-8 pt-1 max-w-8xl mx-auto">
              <h1 className="text-2xl font-bold">Welcome <span className="text-amber-600">{nameUser.username ||"Name"}</span></h1>
      <h2 className="text-2xl  text-strat text-gray-900 mt-3 mb-2">
      Visitors
      </h2>
      <h2 className="text-md text-start text-gray-400 mb-6">
      All the visitors that are currently on the premises
      </h2>
      <input
            type="text"
            className="w-full px-3 py-2 text-sm bg-gray-100 border-amber-500 border rounded-md outline-none focus:ring-1 focus:ring-amber-500 sticky top-[106px] z-30"
            placeholder="Search by name, number and aadhaar"
            onChange={(e)=>setSearch(e.target.value)}
          />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {allVisitors.filter(visitor => visitor.status === "Check in").length > 0 ? (
  allVisitors
    .filter(visitor => visitor.status === "Check in")
    .map((item, index) => (
      <div
        key={item.id || index}
        className="p-6 w-80 rounded-2xl border border-gray-300 transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
      >
        <h3 className="text-2xl font-bold mb-3 text-black">
          {item.name}
        </h3>
        <hr />
        <div className="text-lg space-y-2 my-3">
          <div className="mb-4">
            <p className="text-sm text-gray-400">Phone</p>
            <span className="text-gray-600">{item?.phone || "-"}</span>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-400">Purpose of visit</p>
            <span className="text-gray-600">{item.purposeVisit?.at(-1)?.purpose || "-"}</span>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-400">Arrived</p>
            <span className="text-gray-600">{item.arrivedtime?.at(-1)?.time || "-"}</span>
          </div>
        </div>
        <div className="flex mt-6 gap-3">
          <button className="px-5 py-2 bg-green-300 text-black rounded-lg hover:bg-green-400 transition-all duration-300" onClick={()=>handleCheckOut(item._id)}>
            Check out
          </button>
          <div className="border px-2 rounded-md bg-red-200 hover:bg-red-300"><Delete visitorsProp={item._id} onDeleteSuccess={getVisitors}/></div>
         
        </div>
      </div>
    ))
) : (
  <p className="w-80">No pending visitors</p>
)}

      </div>
    </div>       
           </div>
          )}
          {activeTab === "add-visitor" && <AddVisitors />}
          {activeTab === "all-visitors" && <AllVisitors />}
          {activeTab === "other-settings" && <OtherSettings />}
          {activeTab === "profile-settings" && <Profile />}
        </div>
    </div>
  );
}

export default Home;
