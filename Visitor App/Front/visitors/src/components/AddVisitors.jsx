import React,{useState,useEffect,useRef} from 'react'
import { AddVisitorApi,allCategoryApi,getUserSpecificApi,getAllvisitorApi } from '../services/AllApis';
import Webcam from 'react-webcam'
import { BASE_URL } from '../services/BaseURL';
import toast from "react-hot-toast"

const videoConstraints = {
  width: 1200,
  height: 720,
  facingMode: "user"
};

function AddVisitors() {
  const [token, setToken] = useState("");
  // const [allUsers,setAllUsers]=useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCam, setIsOpenCam] = useState(false);
  const [allcategory,setAllCategory]=useState([])
  const [attender,setAttender]=useState(null)
  const [AllVisitorsList,setAllVisitorsList]=useState([])
  const [selectedVisitorId, setSelectedVisitorId] = useState(null);
  const [imageCap,setImageCap]=useState('') // re verify maybe waste state
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
    image: null, 
    numberofstay: "",
    attender: "",
    status: "",
    remarks: "",
})
// console.log("Visitordata= ",visitorData);
const [search, setSearch] = useState("");

const webcamRef = React.useRef(null);

const capture = () => {
  const imageSrc = webcamRef.current.getScreenshot();
  setImageCap(imageSrc);
  

  if(imageSrc){
    fetch(imageSrc)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
      setVisitorData(prevData => ({
        ...prevData,
        image: file,
      }));
    });
    toast.success("Image Captured!")
    setIsOpen(false)
  }else{
    toast.error('Capture faild. please reupload!')
    setIsOpen(false)
  }
};

// console.log(imageCap);


useEffect(() => {
  if (selectedVisitorId && Object.keys(selectedVisitorId).length > 0) {
    setVisitorData({
      name: selectedVisitorId.name || "",
      aadhaar: selectedVisitorId.aadhaar || "",
      phone: selectedVisitorId.phone || "",
      othernumber: selectedVisitorId.othernumber || "",
      gender: selectedVisitorId.gender || "",
      category: selectedVisitorId.category || "",
      age: selectedVisitorId.age || "",
      purposeVisit: selectedVisitorId.purposeVisit?.length ? selectedVisitorId.purposeVisit.at(-1)?.purpose : "",
      address: selectedVisitorId.address || "",
      arrivedtime: selectedVisitorId.arrivedtime?.length ? selectedVisitorId.arrivedtime.at(-1)?.time : "",
      despachtime: selectedVisitorId.despachtime?.length ? selectedVisitorId.despachtime.at(-1)?.time : "",
      currentdate: selectedVisitorId.currentdate?.length ? selectedVisitorId.currentdate.at(-1)?.date : "",
      support: selectedVisitorId.support?.length ? selectedVisitorId.support.at(-1)?.support : "",
      image: selectedVisitorId.image || "", 
      numberofstay: selectedVisitorId.numberofstay?.length ? selectedVisitorId.numberofstay.at(-1)?.number : "",
      attender: selectedVisitorId.attender?.length ? selectedVisitorId.attender.at(-1)?.attender : "",
      status: selectedVisitorId.status || "",
      remarks: selectedVisitorId.remarks?.length ? selectedVisitorId.remarks.at(-1)?.remark : "",
    });
  }
}, [selectedVisitorId]); 


useEffect(() => {
  setSearch(visitorData.phone || visitorData.aadhaar || "");
}, [visitorData.phone, visitorData.aadhaar]);

// console.log("Search data: ",search);

useEffect(()=>{
  if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
  }

},[])

useEffect(() => {
  if (token) {
    getAllcategory();
    getUserSpecific()
    getAllVisitor()
  }
}, [token,search]);

const getAllcategory = async () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
    const res = await allCategoryApi(headers); 
    if (res.status === 200) {
      setAllCategory(res.data);
    }
};

const getAllVisitor = async () => {
  if (!search) {
    setAllVisitorsList([]); 
    return; 
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const res = await getAllvisitorApi(headers, search);

  if (res.status === 200) {
    setAllVisitorsList(res.data);
  }
};

// console.log(AllVisitorsList);

// const getAllUsers = async () => {
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     };

//     const res = await allUsersApi(headers);  
//     if (res.status === 200) {
//       setAllUsers(res.data);
//     }
// };

const handleAddVisitor = async (e) => {
      e.preventDefault();
    
      if (
        !visitorData.name ||
        !visitorData.gender ||
        !visitorData.phone ||
        !visitorData.category ||
        !visitorData.age ||
        !visitorData.purposeVisit ||
        !visitorData.address ||
        !visitorData.arrivedtime ||
        !visitorData.currentdate ||
        !visitorData.support ||
        !visitorData.attender ||
        !visitorData.status ||
        !visitorData.remarks
      ) {
        toast.error("Please fill all details!");
      } else {
        const formData = new FormData();
        formData.append("name", visitorData.name);
        formData.append("aadhaar", visitorData.aadhaar);
        formData.append("phone", visitorData.phone);
        formData.append("othernumber", visitorData.othernumber);
        formData.append("gender", visitorData.gender);
        formData.append("category", visitorData.category);
        formData.append("age", visitorData.age);
        formData.append("purposeVisit", visitorData.purposeVisit);
        formData.append("address", visitorData.address);
        formData.append("arrivedtime", visitorData.arrivedtime);
        formData.append("despachtime", visitorData.despachtime);
        formData.append("currentdate", visitorData.currentdate);
        formData.append("support", visitorData.support);
        formData.append("image", visitorData.image);
        formData.append("numberofstay", visitorData.numberofstay);
        formData.append("attender", visitorData.attender);
        formData.append("status", visitorData.status);
        formData.append("remarks", visitorData.remarks);
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
      };
        try {
          const res = await AddVisitorApi(formData,reqHeader);         
          if (res.status === 200 || res.status === 201) {
            toast.success("visitor details add success!!");
            console.log(res.data.messege); 
            setVisitorData({ name: "",
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
              remarks: "",})
          } else {
            toast.error("Addition failed: "+res.data);
          }
        } catch (error) {
          console.log("Error adding visitor:", error);
          toast.error("An error occurred while adding the visitor");
        }
      }
    };

    const getUserSpecific = async()=>{
      const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      }; 
      const res=await getUserSpecificApi(headers)
      if(res.status===200){
        setAttender(res.data.username)
      }
    }  

    const handleCorrect = (visitor) => {
      if (selectedVisitorId) {
          toast.success('Already fille the form');
      } else {
          setSelectedVisitorId(visitor);
      }
  };
  
  const handleCancel = () => {
      if (!selectedVisitorId) {
          toast.error('Already clear the form');
      } else {
          setSelectedVisitorId(null);
      }
  };


  const clearForm = (e) => {
    e.preventDefault();
    const hasData = Object.values(visitorData).some(value => value && value.trim() !== "");
  
    if (hasData) {
      setVisitorData({
        name: "",
        aadhaar: "",
        phone: "",
        othernumber: "",
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
      });
      toast.success("Form cleared successfully!");
    } else {
      toast.error("No details to clear in the form.");
    }
  };
   

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto p-4">
      
    <div className="p-4 w-5/6 mx-auto bg-white shadow-lg rounded-lg border">
    <h2 className="text-xl font-semibold mb-1 mt-3 text-center">Fill the visiter information</h2>
    <h2 className="text-sm mb-9 text-slate-400 text-center">We're delighted to have you with us. Kindly fill in the following information.</h2>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input type="tel" placeholder="Phone Number*" pattern='\d{10}' title='Phone number must 10 digit and not include Alphabets' className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,phone:e.target.value})}}
            value={visitorData.phone}            />
      <input type="text" placeholder="aadhaar Number" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" pattern="\d{4}-\d{4}-\d{4}" title="Aadhar number must be in the format XXXX-XXXX-XXXX" onChange={(e)=>{setVisitorData({...visitorData,aadhaar:e.target.value})}}
            value={visitorData.aadhaar} />
            <input type="text" placeholder="Name*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,name:e.target.value})}}
            value={visitorData.name}  />
      <input type="tel" placeholder="Other Contact" pattern='\d{10}' title='Phone number must 10 digit and not include Alphabets'  className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,othernumber:e.target.value})}}
            value={visitorData.othernumber}/>
      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" value={visitorData.gender} onChange={(e)=>{setVisitorData({...visitorData,gender:e.target.value})}}
      >
        <option value="">Select Gender*</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <select
        className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none"
        onChange={(e) => setVisitorData({ ...visitorData, category: e.target.value })} value={visitorData.category}
    >
        <option value="">Select Category*</option>
        {allcategory.map((category, index) => (
            <option key={index} value={category.categoryName}>
                {category.categoryName}
            </option>
        ))}
    </select>
      <input type="number" placeholder="Age*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,age:e.target.value})}}
            value={visitorData.age} />
      <input type="text" placeholder="Purpose of Visit*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,purposeVisit:e.target.value})}}
            value={visitorData.purposeVisit}/>
      <textarea placeholder="Address*" className="p-2 border rounded col-span-2 focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,address:e.target.value})}}
            value={visitorData.address}></textarea>
      <label htmlFor="">Arrived Time*</label>
      <input type="time" placeholder="Arrived Time" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" value={visitorData.arrivedtime} onChange={(e)=>{setVisitorData({...visitorData,arrivedtime:e.target.value})}}/>
      <label htmlFor="">Despatch Time</label>
      <input type="time" placeholder="Departed Time" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" value={visitorData.despachtime} onChange={(e)=>{setVisitorData({...visitorData,despachtime:e.target.value})}}/>
      <input type="date" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,currentdate:e.target.value})}}
            value={visitorData.currentdate} />
      <input type="text" placeholder="Support Given*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,support:e.target.value})}} value={visitorData.support}/>
      <p className='bg-blue-100 rounded-md flex justify-center items-center cursor-pointer' onClick={() => setIsOpenCam(true)}>Upload Photo</p>

      {isOpenCam && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded shadow-lg max-w-3xs">
                        <div className="flex justify-center items-center">
                        </div>
                        <h2 className="text-lg font-bold p-2 text-center rounded text-gray-600">Please select methode</h2>
                        <hr />

                        <div className="flex gap-6 mt-4">
                        <label className="block text-black w-32 h-20 px-3 py-2 rounded-md cursor-pointer bg-blue-300 hover:bg-blue-400">Upload Photo<span className="material-symbols-outlined text-3xl">
                          upload_file
                          </span><input
                          type="file"
                          accept="image/*"
                          className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none hidden"
                          onChange={(e) => {
                            if (e.target.files.length > 0) {
                              setVisitorData({...visitorData, image: e.target.files[0]});
                            }
                          }}
                          /></label> 
                          <p className='py-2 px-2 w-32 h-20 rounded-md cursor-pointer bg-orange-300 hover:bg-orange-400'  onClick={() => setIsOpen(true)} >Tacke a photo <span className="material-symbols-outlined text-3xl">
                          photo_camera
                          </span></p>
                        </div>


                        <div className="flex justify-between gap-4">
                          <button
                            className="mt-4 bg-red-300 hover:bg-red-400 text-black px-4 py-2 w-full rounded-lg"
                            onClick={() => setIsOpenCam(false)}
                          >
                            Cancel
                          </button>

                          

                    {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded shadow-lg max-w-3xs">
                        <div className="flex justify-center items-center">
                        </div>
                        <h2 className="text-lg font-bold p-2 rounded text-gray-600">Please take a photo</h2>
                        <Webcam
                          audio={false}
                          height={720}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          width={1280}
                          videoConstraints={videoConstraints}
                        />
                        <div className="flex justify-between gap-4">
                          <button
                            className="mt-4 bg-red-300 hover:bg-red-400 text-black px-4 py-2 w-full rounded-lg"
                            onClick={() => setIsOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="mt-4 bg-green-300 text-black hover:bg-green-400 px-4 w-full py-2 rounded-lg"
                            onClick={capture}
                          >
                            Capture
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                        </div>
                      </div>
                    </div>
                  )}
      <input type="text" placeholder="Number of days stay" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,numberofstay:e.target.value})}}
            value={visitorData.numberofstay}/>
            <select 
          className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" 
          onChange={(e) => setVisitorData({ ...visitorData, attender: e.target.value })} value={visitorData.attender}
        >
          <option value="">Select Attender*</option>
          {attender && <option value={attender}>{attender}</option>}
        </select>

      <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,status:e.target.value})}} value={visitorData.status}>
        <option value="">Status*</option>
        <option value="Check in">Check in</option>
        <option value="Check out">Check out</option> 
      </select>
      <textarea placeholder="Remarks*" rows={1} className="p-2 border rounded col-span-2 focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>{setVisitorData({...visitorData,remarks:e.target.value})}}
            value={visitorData.remarks}></textarea>

      <button className="col-span-1 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600" onClick={clearForm}>Clear</button>
      <button className="col-span-1 bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700" onClick={handleAddVisitor}>Submit</button>
    </form>
  </div>

  {search && (
  <div className="bg-white max-w-2xl shadow-lg rounded-lg border p-4">
    <h2 className="text-xl font-semibold mb-1 mt-3 text-center">Existing visitor details</h2>
    <h2 className="text-sm mb-9 text-slate-400 text-center">This is the already visited visitor data</h2>

    <div className="space-y-4 overflow-y-auto h-[700px]">
      {AllVisitorsList.length > 0 ? (
        AllVisitorsList.map((visitor, index) => (
          <div key={visitor._id || index} className="border rounded-lg p-3 hover:bg-gray-100 space-y-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <img className='object-center bg-cover rounded-md' src={visitor?.image ? `${BASE_URL}/upload/${visitor.image}`: "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"}alt="" />
              </div>
              <div className="">
              <p className='text-xl text-gray-800'>Address </p>
              <p className='mb-4 text-gray-600'>{visitor.address || "N/A"}</p>
              <p className='text-xl text-gray-800'>Aadhaar </p>
              <p className='mb-4 text-gray-600'>{visitor.aadhaar ? visitor.aadhaar : <span className="text-red-500 font-semibold">Not provided</span>}</p>
              <p className="text-xl text-gray-800">Gender</p>
              <p className="mb-4 text-gray-600">{visitor.gender}</p>
              </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
              <p className="text-xl text-gray-800">Name </p>
              <p className="mb-4 text-gray-600">{visitor.name}</p>
              <p className="text-xl text-gray-800">Phone</p>
              <p className="mb-4 text-gray-600">{visitor.phone}</p>
              <p className="text-xl text-gray-800">Other contact</p>
              <p className="mb-4 text-gray-600">{visitor.othernumber || "Not provide"}</p>
              <p className='text-xl text-gray-800'>Purpose of visit </p>
              <ul className="mb-4 text-gray-600">
                {
                  visitor.purposeVisit.map((item,index) =>(
                    <li key={index}>{index + 1}. {item.purpose}</li>
                  ))
                }
              </ul>
              <p className="text-xl text-gray-800">Age</p>
              <p className="mb-4 text-gray-600">{visitor.age}</p>
              <p className="text-xl text-gray-800">Visit dates</p>
              <ul className="mb-4 text-gray-600">
                {
                  visitor.currentdate.map((item,index)=>(
                    <li key={index}>{index + 1}. {item.date}</li>
                  ))
                }
              </ul>
              <p className="text-xl text-gray-800">Remarks</p>
                <ul className="mb-4 text-gray-600">
                {
                  visitor.remarks.map((item,index)=>(
                    <li key={index}>{index + 1}. {item.remark}</li>
                  ))
                }
              </ul>
                </div>
                <div>
                <p className="text-xl text-gray-800">Visit times</p>
              <ul className="mb-4 text-gray-600">
                {
                  visitor.arrivedtime.map((item,index)=>(
                    <li key={index}>{index + 1}. {item.time}</li>
                  ))
                }
              </ul>
              <p className="text-xl text-gray-800">Category</p>
              <p className="mb-4 text-gray-600">{visitor.category}</p>
              <p className="text-xl text-gray-800">Number of day</p>
              <ul className="mb-4 text-gray-600">
                {
                  visitor.numberofstay.map((item,index)=>(
                    <li key={index}>{index + 1}. {item.number || "Not provide"}</li>
                  ))
                }
              </ul>
              <p className="text-xl text-gray-800">Support given</p>
              <ul className="mb-4 text-gray-600">
                {
                  visitor.support.map((item,index)=>(
                    <li key={index}>{index + 1}. {item.support}</li>
                  ))
                }
              </ul>
              <p className="text-xl text-gray-800">Status</p>
              <p className="mb-4 text-gray-600">{visitor.status}</p>
              <p className="text-xl text-gray-800">Attend by</p>
              <ul className="mb-4 text-gray-600">
                {
                  visitor.attender.map((item,index)=>(
                    <li key={index}>{index + 1}. {item.attender}</li>
                  ))
                }
              </ul>
              </div>
            </div>
            <div className="flex justify-end gap-4">
            <button className='p-2 bg-red-200 rounded-lg' onClick={handleCancel}>Cancel</button>
            <button className='p-2 bg-green-200 rounded-lg' onClick={() => handleCorrect(visitor)}>Confirm</button>

            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No existing visitors found.</p>
      )}
    </div>
  </div>
)}


    </div>
    </>
  )
}

export default AddVisitors
