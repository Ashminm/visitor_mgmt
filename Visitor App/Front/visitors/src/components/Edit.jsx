import React,{useState} from 'react'


function Edit({visitorsProp}) {
    const [isOpen, setIsOpen] = useState(false);
    const [visitors,setVisitors]= useState({
      username:visitorsProp.name,
      aadhaar:visitorsProp.aadhaar,
      address:visitorsProp.address,
      age:visitorsProp.age,
      arrivedtime:visitorsProp.arrivedtime,
      attender:visitorsProp.attender,
      category:visitorsProp.category,
      currentdate:visitorsProp.currentdate,
      despachtime:visitorsProp.despachtime,
      gender:visitorsProp.gender,
      image:visitorsProp.image,
      numberofstay:visitorsProp.numberofstay,
      othernumber:visitorsProp.othernumber,
      phone:visitorsProp.phone,
      purposeVisit:visitorsProp.purposeVisit,
      remarks:visitorsProp.remarks,
      status:visitorsProp.status,
      support:visitorsProp.support,
      userId:visitorsProp.userId,
      id:visitorsProp._id,
  })
console.log("All visitors: ",visitors);


  return (
    <div className="">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        View
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-5">View and Edit Visitor details</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Name" className="p-2 border rounded" />
        <input type="text" placeholder="Aadhar Number" className="p-2 border rounded" pattern="\d{4}-\d{4}-\d{4}" title="Aadhar number must be in the format XXXX-XXXX-XXXX" required />
        <input type="number" placeholder="Age" className="p-2 border rounded w-24" />
        <select className="p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select className="p-2 border rounded">
          <option value="">Select Category</option>
          <option value="Guest">Guest</option>
          <option value="Staff">Staff</option>
          <option value="Vendor">Vendor</option>
        </select>
        <input type="text" placeholder="Phone Number" className="p-2 border rounded" />
        <input type="text" placeholder="Other Contact" className="p-2 border rounded" />
        <textarea placeholder="Address" className="p-2 border rounded col-span-2"></textarea>
        <input type="time" placeholder="Arrived Time" className="p-2 border rounded" />
        <input type="time" placeholder="Departed Time" className="p-2 border rounded" />
        <input type="text" placeholder="Purpose of Visit" className="p-2 border rounded" />
        <input type="text" placeholder="Support Given" className="p-2 border rounded" />
        <textarea placeholder="Remarks" className="p-2 border rounded col-span-2"></textarea>
        <input type="date" className="p-2 border rounded" />
        <input type="file" className="p-2 border rounded" />
        <input type="number" placeholder="Days of Stay" className="p-2 border rounded" />
        <select className="p-2 border rounded">
          <option value="">Select Attender</option>
          <option value="Guest">Guest</option>
          <option value="Staff">Staff</option>
          <option value="Vendor">Vendor</option>
        </select>

        <button
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700"
              >
                Update
              </button>
      </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Edit
