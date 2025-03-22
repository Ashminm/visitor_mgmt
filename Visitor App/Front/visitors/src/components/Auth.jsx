import React, { useEffect, useState } from "react";
import { registerApi,loginApi } from "../services/AllApis";
import {Navigate, useNavigate} from "react-router-dom"
import logo from '../assets/file.png'

function Auth() {
  const [register, setRegister] = useState(false); 
  
  const [userData,setUserData]=useState({
      username: "",
      email: "",
      password: "",
      image:""
  })
  // console.log(userData);
  

  const handleReg = async (e) => {
    e.preventDefault();
    if (!userData.username || !userData.email|| !userData.password || !userData.image) {
      alert("Please fill your details!!");
    } else {
   
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("image", userData.image);
  
      try {
        const res = await registerApi(formData);
        if (res.status === 200) {
          alert(`Registration success ${res.data.username}!!`);
          // setUserData({
          //   username: "",
          //   email: "",
          //   password: "",
          //   image: "",
          // });
          setPhotoPreview(""); 
          setRegister(false);
        } else {
          alert(`Registration failed: ${res.data}`);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Something went wrong!");
      }
    }
  };
  

const handleLogin=async(e)=>{
  e.preventDefault();
  if (!userData.email|| !userData.password) {
    alert("Please fill your details!!");
  }else{
    const res =await loginApi(userData)
    if(res.status===200){
      sessionStorage.setItem("currentUser",JSON.stringify(res.data.existingUser))
      sessionStorage.setItem("role", res.data.role);
      sessionStorage.setItem("token", res.data.token);
      alert("Your successfully login!!")
      setUserData({
        username: "",
        email: "",
        password: "",
        image: "",
      });
      navigate('/home')
    }
    else {
      alert(`Login failed: ${res.data}`);
      console.log(res);
      
    }
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
            className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-amber-500"
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
       <button type="button" className="text-md ">
           Lost your password
          </button>
       <button type="button" onClick={toggleRegister} className="text-md ">
            {register ? "Go to Login" : "Create an Account"}
          </button>
       </div>
      </form>
    </div>
  );
}

export default Auth;
