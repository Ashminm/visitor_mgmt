import React, { useState } from 'react';

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

  return (
    <div>
      <button className="bg-blue-300 text-black px-4 py-2 rounded-lg" onClick={() => setIsOpen(true)}>
        View
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
            <h2 className="text-lg font-bold bg-gray-100 p-2 rounded mb-5">View and Edit Visitor Details</h2>

            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img src={imagePreview} alt="Visitor" className="w-40 h-36 object-cover border" />
                <div>
                  <p className="text-2xl text-gray-500">Visitor Name</p>
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
                <button onClick={() => setIsEditing(true)} className="bg-green-500 text-white p-2 w-full rounded-lg hover:bg-green-600">
                  Edit
                </button>
              </div>
            ) : (
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" value={visitor.name} onChange={handleChange} className="p-2 border rounded" />
                <input type="text" name="aadhaar" value={visitor.aadhaar} onChange={handleChange} className="p-2 border rounded" />
                <input type="number" name="age" value={visitor.age} onChange={handleChange} className="p-2 border rounded" />
                <select name="gender" value={visitor.gender} onChange={handleChange} className="p-2 border rounded">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input type="file" onChange={handleImageChange} className="p-2 border rounded" />
                <button onClick={() => setIsEditing(false)} className="bg-blue-400 text-black p-2 rounded-lg hover:bg-blue-500">
                  Back to View
                </button>
                <button type="submit" className="bg-green-400 text-black p-2 rounded-lg hover:bg-green-500">
                  Save
                </button>
              </form>
            )}
            <button onClick={() => setIsOpen(false)} className="bg-red-400 w-full text-black p-2 rounded-lg hover:bg-red-500 mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Edit;