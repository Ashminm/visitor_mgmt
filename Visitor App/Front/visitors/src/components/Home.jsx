import React, { useState,useEffect } from "react";
import logo from '../assets/file.png'
import Profile from "./Profile";
import AddVisitors from "./AddVisitors";
import AllVisitors from "./AllVisitors";
import OtherSettings from "./OtherSettings";

function Home() {
const [username,setUsername]=useState("")



useEffect(()=>{
  const name=sessionStorage.getItem("name")
  if(name){
    setUsername(name)
  }
})


  const [activeTab, setActiveTab] = useState("home");


  const visitors = [
    {
      id: 1,
      name: "John Doe",
      gender: "Male",
      age: 35,
      aadhar: "1234-5678-9012",
      phone: "9876543210",
      purpose: "Business Meeting",
      remarks: "Returning in 2 hours",
      status: "Not Checked Out",
    },
    {
      id: 2,
      name: "Jane Smith",
      gender: "Female",
      age: 28,
      aadhar: "2345-6789-0123",
      phone: "8765432109",
      purpose: "Guest Visit",
      remarks: "Staying overnight",
      status: "Not Checked Out",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4"> {/* Added container with spacing */}
        <nav className="flex justify-between items-center py-4 border-b sticky top-0 z-2 bg-white"> {/* Adjusted spacing */}
            <div className="pl-4"> {/* Added left padding */}
            <img src={logo} className='w-11' alt="" />
            </div>
            <div>
            <div className="w-screen max-w-3xl bg-white h-auto flex flex-col">
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
        <div className="p-4">
          {activeTab === "home" && (
             <div className="gap-3 flex flex-col items-center md:flex-row justify-start">
             
             <div className="p-8 pt-1 max-w-8xl mx-auto">
              <h1 className="text-2xl font-bold">Welcome <span className="text-amber-600">{username}</span></h1>
      <h2 className="text-2xl  text-strat text-gray-900 mt-3 mb-2">
      Visitors
      </h2>
      <h2 className="text-md text-start text-gray-400 mb-6">
      All the visitors that are currently on the premises
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visitors.map((visitor) => (
          <div
            key={visitor.id}
            className="p-6 bg-amber-100 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-3 text-blue-700 dark:text-blue-400">
              {visitor.name}
            </h3>
            <div className="text-lg space-y-2">
              <p><strong>Gender:</strong> {visitor.gender}</p>
              <p><strong>Age:</strong> {visitor.age}</p>
              <p><strong>Aadhar:</strong> {visitor.aadhar}</p>
              <p><strong>Phone:</strong> {visitor.phone}</p>
              <p><strong>Purpose:</strong> {visitor.purpose}</p>
              <p><strong>Remarks:</strong> {visitor.remarks}</p>
              <p><strong>Status:</strong> <span className="font-semibold text-green-600 dark:text-green-400">{visitor.status}</span></p>
            </div>
            <div className="flex justify-between mt-6 gap-4">
              <button className="px-5 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-700 transition-all duration-300">
                View More
              </button>
              <button className="px-5 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300">
                Checked Out
              </button>
            </div>
          </div>
        ))}
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
