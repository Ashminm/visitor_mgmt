import React,{useState} from 'react'

function Profile() { 
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
      password: '********'
    });
  
    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);
    const handleChange = (e) => {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    };
    
  return (
    <section>
      <div className="p-7 text-center">
        <h1 className='text-2xl'>Account Settings</h1>
        <h1>Manage your profile</h1>
      </div>
      <div className='gap-3 flex flex-col items-center md:flex-row justify-center'>
        <div className="p-4 w-[40rem] shadow-lg rounded-lg border border-gray-200 h-auto">
          <div className="flex justify-center mb-4 p-7">
            <img 
              src="https://via.placeholder.com/100" 
              alt="Profile" 
              className="w-40 h-40 object-cover rounded-full border border-gray-300" 
            />
          </div>
          <div className="p-6">
            {!isEditing ? (
              <div>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p><strong>Password:</strong> {userData.password}</p>
                <button 
                  onClick={handleEdit} 
                  className="mt-4 bg-amber-600 text-black px-4 py-2 rounded-md hover:bg-amber-700"
                >Edit Profile</button>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button 
                    className="w-24 bg-amber-600 text-black py-2 rounded-md hover:bg-amber-700"
                  >Save</button>
                  <button 
                    onClick={handleCancel} 
                    className="w-24 bg-gray-400 text-black py-2 rounded-md hover:bg-gray-500"
                  >Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
