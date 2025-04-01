import React, { useState,useEffect } from 'react';
import { getUserSpecificApi,updateProfileApi } from '../services/AllApis';
import { BASE_URL } from '../services/BaseURL';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"

function Profile() { 
  const [token, setToken] = useState("");
  const [userProfile,setUserProfile]=useState({})
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [photoPreview,setPhotoPreview]=useState('')
  const [profile,setProfile]=useState({
      username:  "",
      email:  "",
      password: "",
      image: "",
      addedBy: "",
      date: ""
  })

useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
  }
},[])

useEffect(() => {
  if (profile.image && profile.image instanceof File) {
    setPhotoPreview(URL.createObjectURL(profile.image));
  }
}, [profile.image]);


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
      toast.error("Please fill details")
  }else{
    const formData= new FormData()
    formData.append("username",profile.username);
    // formData.append("image",profile.image);
    formData.append("email",profile.email);
    formData.append("password",profile.password);
    formData.append("image",profile.image);
    const HeaderReq = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
  };
  const res=await updateProfileApi(formData,HeaderReq)
  if(res.status===200){
    toast.success('profile update success!!')
    setIsEditing(false)
  }else{
    toast.error("Updation faild!")
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
// console.log(profile);

// console.log("feching userProfile",userProfile);

const handilelogOut=async()=>{
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("role");
  setToken("");
  setUserProfile({});
  toast.success('Logout successfull!')
  navigate('/')
}

    const navigate=useNavigate()

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () =>{
      setIsEditing(false);
    } 
    

    return (
      <section>
      <div className="p-7 text-center">
        <h1 className="text-2xl">Account Settings</h1>
        <h1>Manage your profile</h1>
      </div>

         <div className="w-screen h-auto flex">
                {/* Sidebar Navigation (Vertical Tabs) */}
                <div className="w-1/4 flex flex-col items-start space-y-2 p-4 border-e-2">
                  {["profile","dashboard" ,"settings"].map((tab) => (
                    <button
                      key={tab}
                      className={`w-full py-3 text-left capitalize ${
                        activeTab === tab ? "border-l-4 border-amber-600 text-amber-600 font-semibold pl-3" : "text-gray-600 pl-3"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.replace("-", " ")}
                    </button>
                  ))}
                </div>
                  {activeTab === "profile" && (

                  
                <div className="gap-3 flex flex-col items-center md:flex-row justify-center">
                      <div className="p-4 w-[48rem] flex justify-center border-e-2 bg-white rounded-lg h-auto">
                        {!isEditing ? (
                          <div className="p-6 flex justify-center items-center">
                            <div className="m-4 me-10 ">
                              <img
                                src={profile?`${BASE_URL}/upload/${profile.image}`: ""}
                                alt="Profile"
                                className="w-64 h-64 object-cover rounded-md border-2 border-gray-300"
                              />
                            </div>
                            <div>
                              <div className='mb-3'>
                                <p className='text-lg text-gray-400'> Your Name </p>
                                <p className='text-md text-gray-600'>{profile.username}</p>
                              </div>
                              <div className='mb-3'>
                                <p className='text-lg text-gray-400'>Your Email</p>
                                <p className='text-md text-gray-600'>{profile.email}</p>
                              </div>
                              <div className='mb-3'>
                                <p className='text-lg text-gray-400'>Your registred date</p>
                                <p className='text-md text-gray-600'>{profile.date ? new Date(profile.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(',', '-') : ""}</p>
                              </div>

                              <div className="flex gap-6 mt-6">
                              <button
                                onClick={handleEdit}
                                className=" bg-green-300 text-black px-5 py-2 gap-1 rounded-md hover:bg-green-400 flex items-center"
                              >
                                Edit <span className="material-symbols-outlined ">
                                edit_note
                                </span>
                              </button>
                              <button
                              onClick={() => setIsOpen(true)}
                                className=" bg-red-300 text-black px-3 py-2 gap-1 rounded-md hover:bg-red-400 flex items-center"
                              >
                                Log out <span className="material-symbols-outlined">
                                logout
                                </span>
                              </button>
                              {isOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                  <div className="bg-white p-6 rounded shadow-lg max-w-3xs">
                                    <div className="flex justify-center items-center">
                                    <span className="material-symbols-outlined text-3xl rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer p-3 px-4 text-gray-600">
                                    logout
                                      </span>
                                    </div>
                                    <h2 className="text-lg font-bold p-2 rounded text-gray-600">Are you sure want to Log out?</h2>
                                    <div className="flex justify-between gap-4">
                                      <button
                                        className="mt-4 bg-green-300 hover:bg-green-400 text-black px-4 py-2 w-full rounded-lg"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        No
                                      </button>
                                      <button
                                        className="mt-4 bg-red-300 text-black hover:bg-red-400 px-4 w-full py-2 rounded-lg"
                                        onClick={handilelogOut}
                                      >
                                        Logout
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <form onSubmit={updateProfile} className='w-full px-16'>
                            <h1 className='text-lg px-3 py-2 rounded text-center'>Edit your profile</h1>
                            <hr />
                            <div className="flex justify-center mb-4 p-7">
                              <label className='w-40 h-40 object-cover rounded-full border-2 border-gray-300 cursor-pointer'>
                                <input type="file" className='hidden'  accept="image/*" onChange={(e)=>setProfile({...profile,image:e.target.files[0]})} />
                                <img
                                src={photoPreview ? photoPreview : `${BASE_URL}/upload/${profile.image}`}
                                alt="Profile"
                                className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
                              />
                                </label>
                            
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
                                title="Enter a valid email address like example@example.com"
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
                              <p className='bg-gray-200 py-2 rounded-lg px-3 cursor-not-allowed'>{profile.addedBy}</p>
                            </div>
                            <div className="flex gap-3">
                              <button
                                type="submit"
                                className="w-24 bg-green-400 text-black py-2 rounded-md hover:bg-green-500"
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                onClick={handleCancel}
                                className="w-24 border text-black py-2 rounded-md hover:bg-gray-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                    )}
                    {activeTab === "dashboard" && (
                      <h1>Dashboard</h1>
                    )}
                    {activeTab === "settings" && (
                      <h1>settings</h1>
                    )}

  {/* Content Area */}
  {/* <div className="w-3/4 p-4">
    {activeTab === "profile" ? <ProfileComponent /> : <SettingsComponent />}
  </div> */}
</div>


      
    </section>
    );
}

export default Profile;
