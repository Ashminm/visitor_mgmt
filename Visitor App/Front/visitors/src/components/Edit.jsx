import React, { useState } from 'react';
import { BASE_URL } from '../services/BaseURL';
import toast from "react-hot-toast"

function Edit({ visitorsProp }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [visitor, setVisitor] = useState({ ...visitorsProp });
  const [imagePreview, setImagePreview] = useState(visitor.image);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitor((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setVisitor((prev) => ({ ...prev, image: file }));
    }
  };
console.log(visitorsProp);

  return (
    <div>
      <span className="material-symbols-outlined cursor-pointer text-3xl text-blue-500 hover:text-blue-700" onClick={() => setIsOpen(true)}>
        visibility
        </span>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
            <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold bg-gray-100 p-2 px-6 rounded mb-5">View and Edit Visitor Details</h2>
            <span class="material-symbols-outlined text-4xl bg-gray-100 text-red-600 rounded-full cursor-pointer" title='Cancel' onClick={() => setIsOpen(false)}>
              cancel
              </span>
            </div>
            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img src={visitor?.image?`${BASE_URL}/upload/${visitor.image}`: "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"} alt="Visitor" className="w-62 h-72 object-cover border" />

                <div>
                  <p className="text-2xl text-gray-500">Visitor Name</p>
                  <span className="text-lg text-gray-900">{visitor.name || "-"}</span>
                </div>
                <div>
                  <p className="text-2xl text-gray-500">Visitor Address</p>
                  <span className="text-lg text-gray-900">{visitor.name || "-"}</span>
                </div>
                <div>
                  <p className="text-2xl text-gray-500">Aadhar Number</p>
                  <span className="text-lg text-gray-900">{visitor.aadhaar || "-"}</span>
                </div>
                <div>
                  <p className="text-2xl text-gray-500">Age</p>
                  <span className="text-lg text-gray-900">{visitor.age || "-"}</span>
                </div>
                <div>
                  <p className="text-2xl text-gray-500">Gender</p>
                  <span className="text-lg text-gray-900">{visitor.gender || "-"}</span>
                </div>
                <div>
                  <p className="text-2xl text-gray-500">Category</p>
                  <span className="text-lg text-gray-900">{visitor.category || "-"}</span>
                </div>
                <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white p-2 w-32 rounded-lg hover:bg-green-600">
                  Edit
                </button>
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="Name*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
      <input type="text" placeholder="aadhaar Number" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" pattern="\d{4}-\d{4}-\d{4}" title="Aadhar number must be in the format XXXX-XXXX-XXXX" />
      <input type="tel" placeholder="Phone Number*" pattern="\d{10}" title="Phone number must 10 digit and not include Alphabets" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
      <input type="tel" placeholder="Other Contact" pattern="\d{10}" title="Phone number must 10 digit and not include Alphabets" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none">
        <option value="">Select Gender*</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none">
        <option value="">Select Category*</option>
      </select>
      <input type="number" placeholder="Age*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
      <input type="text" placeholder="Purpose of Visit*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
      <textarea placeholder="Address*" className="p-2 border rounded col-span-2 focus:ring-amber-500 focus:ring-2 outline-none"></textarea>
      <label>Arrived Time*</label>
      <input type="time" placeholder="Arrived Time" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
      <label>Despatch Time</label>
      <input type="time" placeholder="Departed Time" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
      <input type="date" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
      <input type="text" placeholder="Support Given*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
      <label className="block text-gray-400 w-full px-3 py-2 border rounded-md cursor-pointer focus:ring-2 focus:ring-amber-500">Upload your Photo
        <input type="file" accept="image/*" className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none hidden" />
      </label> 
      <input type="text" placeholder="Number of days stay" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none">
        <option value="">Select Attender*</option>
      </select>
      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none">
        <option value="">Status*</option>
        <option value="Pending">Check in</option>
        <option value="Check out">Check out</option> 
      </select>
      <textarea placeholder="Remarks*" rows={1} className="p-2 border rounded col-span-2 focus:ring-amber-500 focus:ring-2 outline-none"></textarea>
      <button onClick={() => setIsEditing(false)} className="bg-green-500 text-white p-2 w-full rounded-lg hover:bg-green-600">
                  Back to view
                </button>
      <button className=" bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700">Submit</button>
    </form>
            )}
        
          </div>
        </div>
      )}
    </div>
  );
}

export default Edit;