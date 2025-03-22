import React,{useState} from 'react'

function AddVisitors() {
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
console.log(visitorData);



  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-lg rounded-lg border">
    <h2 className="text-xl font-semibold mb-2 mt-3 text-center">Add a New Visitor</h2>
    <h2 className="text-sm mb-9 text-center">We're delighted to have you with us. Kindly fill in the following information.</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="Name" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,name:e.target.value})}}
            value={visitorData.name}  />
      <input type="text" placeholder="aadhaar Number" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" pattern="\d{4}-\d{4}-\d{4}" title="Aadhar number must be in the format XXXX-XXXX-XXXX" onChange={(e)=>{setVisitorData({...visitorData,aadhaar:e.target.value})}}
            value={visitorData.aadhaar} />
      <input type="tel" placeholder="Phone Number" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,phone:e.target.value})}}
            value={visitorData.phone} />
      <input type="tel" placeholder="Other Contact" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,othernumber:e.target.value})}}
            value={visitorData.othernumber}/>
      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,gender:e.target.value})}} defaultValue=""
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,category:e.target.value})}} defaultValue="">
        <option value="">Select Category</option>
        <option value="Guest">Guest</option>
        <option value="Staff">Staff</option>
        <option value="Vendor">Vendor</option>
      </select>
      <input type="number" placeholder="Age" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,age:e.target.value})}}
            value={visitorData.age} />
      <input type="text" placeholder="Purpose of Visit" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,purposeVisit:e.target.value})}}
            value={visitorData.purposeVisit}/>
      <textarea placeholder="Address" className="p-2 border rounded col-span-2 focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,address:e.target.value})}}
            value={visitorData.address}></textarea>
      <label htmlFor="">Arrived Time</label>
      <input type="time" placeholder="Arrived Time" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,arrivedtime:e.target.value})}}/>
      <label htmlFor="">Despatch Time</label>
      <input type="time" placeholder="Departed Time" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,despachtime:e.target.value})}}/>
      <input type="date" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,currentdate:e.target.value})}}
            value={visitorData.currentdate} />
      <input type="text" placeholder="Support Given" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,support:e.target.value})}}/>
      <label className="block text-gray-400 w-full px-3 py-2 border rounded-md cursor-pointer focus:ring-2 focus:ring-amber-500">Upload your Photo<input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none hidden"
                onChange={(e)=>{setVisitorData({...visitorData,image:e.target.files[0]})}}
                /></label> 
      <input type="number" placeholder="Number of days stay" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,numberofstay:e.target.value})}}
            value={visitorData.numberofstay}/>
      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,attender:e.target.value})}} defaultValue="">
        <option value="">Select Attender</option>
        <option value="Guest">Guest</option>
        <option value="Staff">Staff</option>
        <option value="Vendor">Vendor</option>
      </select>
      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,status:e.target.value})}} defaultValue="">
        <option value="">Status</option>
        <option value="Guest">Pending</option>
        <option value="Staff">Checkout</option> 
      </select>
      <textarea placeholder="Remarks" rows={1} className="p-2 border rounded col-span-2 focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,remarks:e.target.value})}}
            value={visitorData.remarks}></textarea>

      <button className="col-span-2 bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600">Submit</button>
    </form>
  </div>
  )
}

export default AddVisitors
