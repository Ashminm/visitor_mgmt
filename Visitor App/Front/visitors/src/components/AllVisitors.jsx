import React,{useState} from 'react'

function AllVisitors() {
    const [data, setData] = useState([
        {
          name: "Ashwin",
          gender: "Male",
          age: 23,
          aadhar: "1234-5678-9012",
          phone: "9876543210",
          purpose: "Official Visit",
          remarks: "Meeting with manager"
        },
        {
          name: "Priya",
          gender: "Female",
          age: 25,
          aadhar: "2345-6789-0123",
          phone: "8765432109",
          purpose: "Delivery",
          remarks: "Parcel delivered"
        },
        {
          name: "Priya",
          gender: "Female",
          age: 25,
          aadhar: "2345-6789-0123",
          phone: "8765432109",
          purpose: "Delivery",
          remarks: "Parcel delivered"
        },
        {
          name: "Priya",
          gender: "Female",
          age: 25,
          aadhar: "2345-6789-0123",
          phone: "8765432109",
          purpose: "Delivery",
          remarks: "Parcel delivered"
        },
        {
          name: "Priya",
          gender: "Female",
          age: 25,
          aadhar: "2345-6789-0123",
          phone: "8765432109",
          purpose: "Delivery",
          remarks: "Parcel delivered"
        },
        {
          name: "Priya",
          gender: "Female",
          age: 25,
          aadhar: "2345-6789-0123",
          phone: "8765432109",
          purpose: "Delivery",
          remarks: "Parcel delivered"
        },
        {
          name: "Priya",
          gender: "Female",
          age: 25,
          aadhar: "2345-6789-0123",
          phone: "8765432109",
          purpose: "Delivery",
          remarks: "Parcel delivered"
        },
        {
          name: "Priya",
          gender: "Female",
          age: 25,
          aadhar: "2345-6789-0123",
          phone: "8765432109",
          purpose: "Delivery",
          remarks: "Parcel delivered"
        },
        {
          name: "Priya",
          gender: "Female",
          age: 25,
          aadhar: "2345-6789-0123",
          phone: "8765432109",
          purpose: "Delivery",
          remarks: "Parcel delivered"
        },
        {
          name: "Priya",
          gender: "Female",
          age: 25,
          aadhar: "2345-6789-0123",
          phone: "8765432109",
          purpose: "Delivery",
          remarks: "Parcel delivered"
        }
      ]);
    
      const handleEdit = (index) => {
        console.log("Edit", index);
      };
    
      const handleDelete = (index) => {
        setData(data.filter((_, i) => i !== index));
      };
    
      const handleViewMore = (index) => {
        console.log("View More", data[index]);
      };
  return (
    <>
    <div className="my-9">
         
          <input
            type="text"
            className="w-5/6 px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Search"
        
          />
        </div>
    <div className="p-4 max-w-8xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Visitor Table</h2>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200 ">
            <th className="border p-2">Name</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Aadhar Number</th>
            <th className="border p-2">Phone Number</th>
            <th className="border p-2">Purpose of Visit</th>
            <th className="border p-2">Remarks</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border hover:bg-gray-100 dark:hover:bg-gray-600">
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.gender}</td>
              <td className="border p-2">{item.age}</td>
              <td className="border p-2">{item.aadhar}</td>
              <td className="border p-2">{item.phone}</td>
              <td className="border p-2">{item.purpose}</td>
              <td className="border p-2">{item.remarks}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => handleEdit(index)}>Edit</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => handleDelete(index)}>Delete</button>
                <button className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700" onClick={() => handleViewMore(index)}>View More</button>
                <button className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700" onClick={() => handleViewMore(index)}>Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default AllVisitors
