import React, { useEffect, useState } from "react";
import { registerApi,loginApi,forgottePasswordApi,getUserSpecificApi } from "../services/AllApis";
import {Navigate, useNavigate} from "react-router-dom"
import logo from '../assets/file.png'
import toast from "react-hot-toast"

function Auth() {
  const [token, setToken] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [register, setRegister] = useState(false); 
  const [userDetail, setUserDetail] = useState([]); 
  
  const [userData,setUserData]=useState({
      username: "",
      phone: "",
      email: "",
      password: "",
      image:""
  })
  const [forgotte,setForgotte]=useState({
    email:"",
    phone:"",
    password:""
  })
  // console.log(forgotte);
  
  const handleReg = async (e) => {
    e.preventDefault();
    if (!userData.username || !userData.phone || !userData.email|| !userData.password || !userData.image) {
      toast.error("Please fill your details!!");
    } else {
   
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("phone", userData.phone);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("image", userData.image);
      const reqHeader = {
        "Content-Type": "multipart/form-data"
    };
      try {
        const res = await registerApi(formData,reqHeader);
        if (res.status === 200) {
          toast.success(`Registration success ${res.data.username}!!`);
          // setUserData({
          //   username: "",
          //   email: "",
          //   password: "",
          //   image: "",
          // });
          setPhotoPreview(""); 
          setRegister(false);
        } else {
          toast.error(`Registration failed: ${res.data}`);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("Something went wrong!");
      }
    }
  }; 

const handleLogin=async(e)=>{
  e.preventDefault();
  if (!userData.email|| !userData.password) {
    toast.error("Please fill your details!!");
  }else{
    const res =await loginApi(userData)
    if(res.status===200){
      // sessionStorage.setItem("role", res.data.role);
      sessionStorage.setItem("token", res.data.token);
      toast.success("Your successfully login!!")
      setUserData({
        username: "",
        email: "",
        phone: "",
        password: "",
        image: "",
      });
      navigate('/home', { replace: true })
    }
    else {
      toast.error(`Login failed: ${res.data}`);
      setUserData({
        username: "",
        email: "",
        phone: "",
        password: "",
        image: "",
      });
      console.log(res);
    }
  }
}
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

const getUserSpecific = async()=>{
  const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
  }; 
  const res=await getUserSpecificApi(headers)
  if(res.status===200){
    setUserDetail(res.data)
  }
}

useEffect(()=>{
  if(userData.image){
    setPhotoPreview(URL.createObjectURL(userData.image))
  }
},[userData.image])

  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState("");

  const toggleRegister = () => {
    setRegister(!register);
    setPhotoPreview(null);
  };

const handleForgotte=async(id)=>{
  if(!forgotte.password){
    toast.error("please enter your email or phone and new password")
  }else{
    const reqHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
  }; 
  const res=await forgottePasswordApi(forgotte,reqHeaders,id)
  if(res.status===200){
    toast.success("Password change success")
    setIsOpen(false)
    setForgotte({
      email:"",
      phone:"",
      password:""
    })
  }else{
    toast.error("Request failed! Please try again.");
    setIsOpen(false)
    setForgotte({
      email:"",
      phone:"",
      password:""
    })
  }
  } 
}


  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent px-4">
      <img src={logo} className='w-9 mb-5 absolute left-8 top-8' alt="" />
      <form
        onSubmit={register ? handleReg : handleLogin}
        className="bg-white px-6 py-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md"
      >
        <div className="text-start mb-6">
          <h2 className="text-4xl font-bold">{register ? "Register" : "Login"}</h2>   
        </div>
        {register && (
          <>
            <div className="mb-4">
              <label className="block text-gray-600">Name*</label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your name"
                onChange={(e)=>{setUserData({...userData,username:e.target.value})}}
                value={userData.username} 
              />
            </div>
            <div className="mb-4 flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-gray-600">Upload Photo*</label>
              <label className="block text-gray-400 w-full px-3 py-2 bg-gray-200 outline-none rounded-md cursor-pointer focus:ring-2 focus:ring-amber-500">Upload your Photo<input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none hidden"
                onChange={(e)=>{setUserData({...userData, image:e.target.files[0]})}}
              /></label>  
            </div>
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
            )}
          </div>
          <div className="mb-4">
          <label className="block text-gray-600">Phone number*</label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your number"
            onChange={(e)=>{setUserData({...userData,phone:e.target.value})}}
            value={userData.phone} 
          />
        </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-600">Email*</label>
          <input
            type="email"
            className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your email"
            onChange={(e)=>{setUserData({...userData,email:e.target.value})}}
            value={userData.email} 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600">Password*</label>
          <input
            type="password"
            className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500" min={5} max={10}
            placeholder="Enter your password"
            onChange={(e)=>{setUserData({...userData,password:e.target.value})}}
            value={userData.password} 
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-600 text-black py-2 rounded-md hover:bg-amber-700"
        >
          {register ? "Register" : "Continue"}
        </button>

       <div className="mt-5 flex justify-between">
       <button type="button" className="text-md hover:underline" onClick={() => setIsOpen(true)}>
           Lost your password
          </button>
       <button type="button" onClick={toggleRegister} className="text-md hover:underline">
            {register ? "Go to Login" : "Create an Account"}
          </button>
       </div>
      </form>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold py-2 rounded text-gray-600">Reset your password</h2>
            <h2 className="text-lg  text-gray-700 bg-slate-200 p-2 rounded-md">You can reset your password using registerd email or phone number</h2>
            <div className="flex flex-col my-6 mt-3">
              <label htmlFor="" className="text-gray-600 text-xl pb-1">Enter your register email</label>
              <input type="email" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none mb-2" onChange={(e)=>setForgotte({...forgotte,email:e.target.value})} placeholder="Email"  />
                <p className="text-xl text-center">OR</p>
              <label htmlFor="" className="text-gray-600 text-xl pb-1">Enter your register phone number</label>
              <input type="tel" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none mb-5" onChange={(e)=>setForgotte({...forgotte,phone:e.target.value})} placeholder="Phone number"  />
              <hr />
              <label htmlFor="" className="text-gray-600 text-xl pb-1 mt-3">Enter your new password*</label>
            <input type="text" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none mb-3" onChange={(e)=>setForgotte({...forgotte,password:e.target.value})} placeholder="Password"  />
            {/* <label htmlFor="" className="text-gray-600">Conform*</label>

            <input type="password" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" placeholder="Confirm password" name="" id="" /> */}
            </div>
            <div className="flex justify-between gap-4">
              <button
                className="mt-4 bg-green-300 hover:bg-green-400 text-black px-4 py-2 w-full rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>

              <button
               className={`mt-4 px-4 w-full py-2 rounded-lg 
                ${forgotte.password ? "bg-red-300 text-black hover:bg-red-400" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
                onClick={()=>handleForgotte(userDetail._id)} disabled={!forgotte.password}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
