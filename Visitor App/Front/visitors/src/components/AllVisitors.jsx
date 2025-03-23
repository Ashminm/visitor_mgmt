import React,{useState,useEffect} from 'react'
import { getAllvisitorApi } from '../services/AllApis'; 

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
            className="w-5/6 px-3 py-2 bg-gray-200 rounded-md outline-none border-amber-600 border-2 focus:ring-2 focus:ring-amber-500"
            placeholder="Search by aadhaar, phone number or name"
            onChange={(e)=>setSearch(e.target.value)}
          />
          <select
            className="rounded-md border-amber-600 border-2 outline-none focus:ring-2 focus:ring-amber-500"
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
    <div className="p-4 max-w-8xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
   
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-amber-600">
            <th className="border p-2">Name</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Aadhar Number</th>
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Purpose of visit</th>
            <th className="border p-2">Last visit</th>
            <th className="border p-2">L' visit time</th>
            <th className="border p-2">Remarks</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {AllVisitorsList.length > 0 ? (
            AllVisitorsList.map((visitor, index) => (
              <tr key={index} className="border hover:bg-gray-100 dark:hover:bg-gray-300">
                <td className="border p-2">{visitor.name.slice(0,10)}</td>
                <td className="border p-2">{visitor.gender}</td>
                <td className="border p-2">{visitor.age}</td>
                <td className="border p-2">{visitor.aadhaar?(visitor.aadhaar):(<span className="text-red-500 font-semibold">Not provided</span>)}</td>
                <td className="border p-2">{visitor.phone?(visitor.phone):(<span className="text-red-500 font-semibold">Not provided</span>)}</td>
                <td className="border p-2">{visitor.purposeVisit.slice(0,20)}</td>
                <td className="border p-2">{visitor.currentdate}</td>
                <td className="border p-2">{visitor.arrivedtime}</td>
                <td className="border p-2">{visitor.remarks}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                  <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                  <button className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">View More</button>
                  <button className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700">Print</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-500">No visitors found.</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
    </>
  )
}

export default AllVisitors
