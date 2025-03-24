import React, { useState,useEffect } from 'react';
import { getUserSpecificApi,updateProfileApi } from '../services/AllApis';
import { BASE_URL } from '../services/BaseURL';

function Profile() { 
  const [token, setToken] = useState("");
  const [userProfile,setUserProfile]=useState({})
  const [profile,setProfile]=useState({
      username:  "",
      email:  "",
      password: "",
      image: "",
      addedBy: "",
      date: ""
  })
// console.log(profile);
console.log("Image URL:", `${BASE_URL}/uploads/${profile.image}`);


useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
  }
},[])

useEffect(() => {
  if (token) {
    getUserSpecific()
  }
}, [token]);

useEffect(() => {
  if (Object.keys(userProfile).length > 0) {
    setProfile({
      username: userProfile.username || "",
      email: userProfile.email || "",
      password: userProfile.password || "",
      image: userProfile.image || "",
      addedBy: userProfile.addedBy || "",
      date: userProfile.date || "",
    });
  }
}, [userProfile]);


const updateProfile=async(e)=>{
  e.preventDefault();
  if(!profile.username || !profile.email || !profile.password){
      alert("Please fill")
  }else{
    const formData= new FormData()
    formData.append("username",profile.username);
    // formData.append("image",profile.image);
    formData.append("email",profile.email);
    formData.append("password",profile.password);
    const HeaderReq = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
  };
  const res=await updateProfileApi(formData,HeaderReq)
  if(res.status===200){
    alert('profile update success!!')
  }else{
    alert("Updation faild!")
    console.log(res);
  }
  }
}


const getUserSpecific = async()=>{
  const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
  }; 
  const res=await getUserSpecificApi(headers)
  if(res.status===200){
    setUserProfile(res.data)
  }
}

// console.log("feching userProfile",userProfile);



const handilelogOut=async()=>{
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
  setToken("");
  setUserProfile({});
}

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);

    return (
      <section>
      <div className="p-7 text-center">
        <h1 className="text-2xl">Account Settings</h1>
        <h1>Manage your profile</h1>
      </div>
      <div className="gap-3 flex flex-col items-center md:flex-row justify-center">
        <div className="p-4 w-[40rem] shadow-lg bg-slate-100 rounded-lg border h-auto">
          {!isEditing ? (
            <div className="p-6">
              <div className="flex justify-center mb-4 p-7">
                <img
                  src={`${BASE_URL}/uploads/${encodeURIComponent(profile.image)}`}
                  alt="Profile"
                  className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
                />
              </div>
              <div>
                <p>
                  <strong>Name:</strong> {profile.username}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Password:</strong>*******
                </p>
                <p>
                <strong>Registration date:</strong> {profile.date ? new Date(profile.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(',', '-') : ""}
                </p>

                <div className="flex justify-between">
                <button
                  onClick={handleEdit}
                  className="mt-4 bg-amber-600 text-black px-4 py-2 rounded-md hover:bg-amber-700"
                >
                  Edit Profile
                </button>
                <button
                onClick={handilelogOut}
                  className="mt-4 bg-red-600 text-black px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Log out
                </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={updateProfile}>
              <div className="flex justify-center mb-4 p-7">
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
                  value={profile.username}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
                  value={profile.password}
                  onChange={(e) =>
                    setProfile({ ...profile, password: e.target.value })
                  }
                />
              </div>
              <div className="mb-9">
                <label className="block text-gray-600">Added by (Not editable)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none read-only cursor-not-allowed"
                  value={profile.addedBy}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="w-24 bg-amber-600 text-black py-2 rounded-md hover:bg-amber-700"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-24 bg-gray-400 text-black py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
    );
}

export default Profile;
