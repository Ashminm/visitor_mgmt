import React,{useState,useEffect} from 'react'
import { getAllvisitorApi } from '../services/AllApis'; 
import Edit from './Edit';
import Delete from './Delete';
import PdfConvert from './PdfConvert';

function AllVisitors() {
  const [search,setSearch]=useState('')
  const [AllVisitorsList,setAllVisitorsList]=useState([])
  const [sortBy, setSortBy] = useState("");
  const [token, setToken] = useState("");
  
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  
  useEffect(() => {
    if (token) {
      getAllVisitor()
    }
  }, [token,search]);
  
// console.log(AllVisitorsList[0]?.purposeVisit[0]?.purpose);

  const getAllVisitor=async()=>{
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res =await getAllvisitorApi(headers,search)
    
    if(res.status===200){
      setAllVisitorsList(res.data)
    }
  }

  const handleSort = (value) => {
    setSortBy(value);
  
    let sortedList = [...AllVisitorsList];
  
    switch (value) {
      case "male-female":
        sortedList.sort((a, b) => a.gender.localeCompare(b.gender));
        break;
      case "female-male":
        sortedList.sort((a, b) => b.gender.localeCompare(a.gender));
        break;
      case "name-asc":
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedList.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "age-asc":
        sortedList.sort((a, b) => a.age - b.age);
        break;
      case "age-desc":
        sortedList.sort((a, b) => b.age - a.age);
        break;
    }
    setAllVisitorsList(sortedList);
  };
    
  return (
    <>
    <div className="my-9 mt-2">
    <h2 className="text-3xl font-semibold text-gray-800 text-black mb-2 text-center">Visitor Table</h2>
    <h2 className="text-sm text-gray-500 text-black mb-6 text-center">Everyone who has visited so far</h2>
         <div className="flex justify-between ">
         <input
            type="text"
            className="w-5/6 px-3 py-2 bg-gray-100 rounded-md outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Search by aadhaar, phone number or name"
            onChange={(e)=>setSearch(e.target.value)}
          />
          <select
            className="rounded-md outline-none bg-gray-100 focus:ring-1 focus:ring-amber-500 ps-2"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="male-female">Female → Male</option>
            <option value="female-male">Male → Female</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="age-asc">Age (Low to High)</option>
            <option value="age-desc">Age (High to Low)</option>
          </select>
        </div>
         </div>
    <div className="p-4 max-w-8xl mx-auto bg-white shadow-lg rounded-md border border-gray-300">
   
      <table className="w-full border-collapse border border-amber-300 text-sm">
        <thead>
          <tr className="bg-amber-500">
            <th className="border p-2">Name</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Aadhar Number</th>
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Purpose of visit</th>
            <th className="border p-2">Last visit</th>
            <th className="border p-2">L' visit time</th>
            <th className="border p-2">Added by</th>
            <th className="border p-2">Remarks</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {AllVisitorsList.length > 0 ? (
  AllVisitorsList.map((visitor, index) => (
    <tr key={visitor._id || index} className="border hover:bg-gray-100 dark:hover:bg-gray-300">
      <td className="border p-2">{visitor.name?.slice(0, 10) || "N/A"}</td>
      <td className="border p-2">{visitor.gender || "N/A"}</td>
      <td className="border p-2">{visitor.age || "N/A"}</td>
      <td className="border p-2">
        {visitor.aadhaar ? visitor.aadhaar : <span className="text-red-500 font-semibold">Not provided</span>}
      </td>
      <td className="border p-2">{visitor.phone || "N/A"}</td>
      <td className="border p-2">
        {visitor.purposeVisit?.at(-1)?.purpose?.slice(0, 20) || "N/A"}
      </td>
      <td className="border p-2">
        {visitor.currentdate?.at(-1)?.date || "N/A"}
      </td>
      <td className="border p-2">
        {visitor.arrivedtime?.at(-1)?.time || "N/A"}
      </td>
      <td className="border p-2">
        {visitor.attender?.at(-1)?.attender || "N/A"}
      </td>
      <td className="border p-2">
        {visitor.remarks?.at(-1)?.remark?.slice(0, 15) || "N/A"}
      </td>
      <td className="border p-2 flex gap-2 justify-center">
        <Edit visitorsProp={visitor}/>
        <Delete visitorsProp={visitor._id} onDeleteSuccess={getAllVisitor}/>
        <PdfConvert visitorsProp={visitor}/>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="11" className="text-center p-4 text-gray-500">No visitors found.</td>
  </tr>
)}

        </tbody>

      </table>
    </div>
    </>
  )
}

export default AllVisitors
