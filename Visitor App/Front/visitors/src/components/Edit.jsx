import React, { useState,useEffect,useContext } from 'react';
import { BASE_URL } from '../services/BaseURL';
import toast from "react-hot-toast";
import { updateVisitorApi,allCategoryApi } from '../services/AllApis';
import { addingContext } from '../context/ContextShare';


function Edit({ visitorsProp }) {
  const [token, setToken] = useState("");
  const {addResponce,setAddResponce}=useContext(addingContext)
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [allcategory,setAllCategory]=useState([])
  const [visitor, setVisitor] = useState({
    name: visitorsProp.name,
    aadhaar: visitorsProp.aadhaar,
    phone: visitorsProp.phone,
    othernumber: visitorsProp.othernumber ? Number(visitorsProp.othernumber) : 0, 
    gender: visitorsProp.gender,
    category: visitorsProp.category,
    age: visitorsProp.age,
    purposeVisit: visitorsProp?.purposeVisit?.at(-1)?.purpose,
    address: visitorsProp.address,
    arrivedtime: visitorsProp?.arrivedtime?.at(-1)?.time,
    despachtime: visitorsProp?.despachtime?.at(-1)?.time,
    currentdate: visitorsProp?.currentdate?.at(-1)?.date,
    support: visitorsProp?.support?.at(-1)?.support,
    image: visitorsProp.image, 
    numberofstay: visitorsProp?.numberofstay?.at(-1)?.number,
    attender: visitorsProp?.attender?.at(-1)?.attender,
    status: visitorsProp.status,
    remarks: visitorsProp?.remarks?.at(-1)?.remark,
  });
  // console.log(visitor);
  
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  
  },[])

  const handleUpdateVisitor=async(e,id)=>{
    e.preventDefault();
    if (
      !visitor.name ||
      !visitor.gender ||
      !visitor.phone ||
      !visitor.category ||
      !visitor.age ||
      !visitor.purposeVisit ||
      !visitor.address ||
      !visitor.arrivedtime ||
      !visitor.currentdate ||
      !visitor.support ||
      !visitor.attender ||
      !visitor.status ||
      !visitor.remarks
    ) {
      toast.error("Please fill all details!");
    }else{
      const formData = new FormData();
      formData.append("name", visitor.name);
      formData.append("aadhaar", visitor.aadhaar);
      formData.append("phone", visitor.phone);
      formData.append("othernumber", visitor.othernumber);
      formData.append("gender", visitor.gender);
      formData.append("category", visitor.category);
      formData.append("age", visitor.age);
      formData.append("purposeVisit", visitor.purposeVisit);
      formData.append("address", visitor.address);
      formData.append("arrivedtime", visitor.arrivedtime);
      formData.append("despachtime", visitor.despachtime);
      formData.append("currentdate", visitor.currentdate);
      formData.append("support", visitor.support);
      formData.append("image", visitor.image);
      formData.append("numberofstay", visitor.numberofstay);
      formData.append("attender", visitor.attender);
      formData.append("status", visitor.status);
      formData.append("remarks", visitor.remarks);
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
    };
    const res=await updateVisitorApi(formData,reqHeader,id)
    if(res.status===200){
      toast.success("Visitor update success!")
      setAddResponce(res.data)
      setIsOpen(false)
    }else{
      toast.error("visitor updation faild!")
    }
    }
  }
  useEffect(() => {
    if (token) {
      getAllcategory();
    }
  }, [token]);

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

  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  return (
    <div>
      <span className="material-symbols-outlined cursor-pointer text-3xl text-blue-500 hover:text-blue-700" onClick={() => setIsOpen(true)}>
        visibility
      </span>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-slate-100 p-6 rounded shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold bg-gray-100 p-2 px-6 rounded mb-5">View and Edit Visitor Details</h2>
              <div className="flex justify-between gap-5">
              {!isEditing?(
                <button onClick={() => setIsEditing(true)} className="bg-green-400 text-black px-5 py-1 rounded-md hover:bg-green-500">
                Edit
              </button>
              ):(
                <button onClick={() => setIsEditing(false)} className="bg-red-400 text-black px-5 py-1 rounded-md hover:bg-red-500">
                  Back
                </button>
              )}
              <span className="material-symbols-outlined text-4xl bg-gray-100 text-red-600 rounded-full cursor-pointer" title='Cancel' onClick={() => setIsOpen(false)}>
                cancel
              </span>
              </div>
              
            </div>
            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img src={visitor?.image ? `${BASE_URL}/upload/${visitor.image}` : "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"} alt="Visitor" className="w-62 h-full object-cover rounded-md border" />
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <p className="text-2xl text-gray-500">Visitor Name</p>
                    <span className="text-lg text-gray-900 ">{visitor.name || "-"}</span>
                  </div>
                  <div>
                    <p className="text-2xl text-gray-500">Visitor Address</p>
                    <span className="text-lg text-gray-900 ">{visitor.address || "-"}</span>
                  </div>
                  <div>
                    <p className="text-2xl text-gray-500">Aadhar Number</p>
                    <span className="text-lg text-gray-900 ">{visitor.aadhaar || "-"}</span>
                  </div>
                  <div>
                    <p className="text-2xl text-gray-500">Age</p>
                    <span className="text-lg text-gray-900 ">{visitor.age || "-"}</span>
                  </div>
                  <div>
                  <p className="text-2xl text-gray-500">Status</p>
                  <span className={`text-lg ${visitor.status === "Check in" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}`}>
                    {visitor.status || "-"}
                  </span>
                </div>
                </div>

                {/* Accordion Sections Start */}
                <div className="accordion-section">
                  <div className="accordion-header border py-2 px-3 rounded-md bg-gray-100 cursor-pointer flex justify-between items-center" onClick={() => toggleAccordion(1)}>
                    <p className="text-2xl text-gray-500">Purpose of Visit</p>
                    <span className="material-symbols-outlined text-2xl">
                      expand_all
                    </span>
                  </div>
                  {activeAccordion === 1 && (
                    <ul className="text-lg text-gray-900 bg-gray-100 border rounded-md p-2">
                      {visitorsProp.purposeVisit.map((item, index) => (
                        <li key={index}>{index + 1}. {item.purpose}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="accordion-section">
                  <div className="accordion-header border py-2 px-3 rounded-md bg-gray-100 cursor-pointer flex justify-between items-center" onClick={() => toggleAccordion(2)}>
                    <p className="text-2xl text-gray-500">Arrived Time</p>
                    <span className="material-symbols-outlined text-2xl">
                      expand_all
                    </span>
                  </div>
                  {activeAccordion === 2 && (
                    <ul className="text-lg text-gray-900 bg-gray-100 border rounded-md p-2">
                      {visitorsProp.arrivedtime.map((item, index) => (
                        <li key={index}>{index + 1}. {item.time}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="accordion-section">
                  <div className="accordion-header border py-2 px-3 rounded-md bg-gray-100 cursor-pointer flex justify-between items-center" onClick={() => toggleAccordion(3)}>
                    <p className="text-2xl text-gray-500">Despatch Time</p>
                    <span className="material-symbols-outlined text-2xl">
                      expand_all
                    </span>
                  </div>
                  {activeAccordion === 3 && (
                    <ul className="text-lg text-gray-900 bg-gray-100 border rounded-md p-2">
                      {visitorsProp.despachtime.map((item, index) => (
                        <li key={index}>{index + 1}. {item.time || "None"}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="accordion-section">
                  <div className="accordion-header border py-2 px-3 rounded-md bg-gray-100 cursor-pointer flex justify-between items-center" onClick={() => toggleAccordion(4)}>
                    <p className="text-2xl text-gray-500">Date</p>
                    <span className="material-symbols-outlined text-2xl">
                      expand_all
                    </span>
                  </div>
                  {activeAccordion === 4 && (
                    <ul className="text-lg text-gray-900 bg-gray-100 border rounded-md p-2">
                      {visitorsProp.currentdate.map((item, index) => (
                        <li key={index}>{index + 1}. {item.date}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="accordion-section">
                  <div className="accordion-header border py-2 px-3 rounded-md bg-gray-100 cursor-pointer flex justify-between items-center" onClick={() => toggleAccordion(5)}>
                    <p className="text-2xl text-gray-500">Support Given</p>
                    <span className="material-symbols-outlined text-2xl">
                      expand_all
                    </span>
                  </div>
                  {activeAccordion === 5 && (
                    <ul className="text-lg text-gray-900 bg-gray-100 border rounded-md p-2">
                      {visitorsProp.support.map((item, index) => (
                        <li key={index}>{index + 1}. {item.support}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="accordion-section">
                  <div className="accordion-header border py-2 px-3 rounded-md bg-gray-100 cursor-pointer flex justify-between items-center" onClick={() => toggleAccordion(6)}>
                    <p className="text-2xl text-gray-500">Number of Stay</p>
                    <span className="material-symbols-outlined text-2xl">
                      expand_all
                    </span>
                  </div>
                  {activeAccordion === 6 && (
                    <ul className="text-lg text-gray-900 bg-gray-100 border rounded-md p-2">
                      {visitorsProp.numberofstay.map((item, index) => (
                        <li key={index}>{index + 1}. {item.number || "No"}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="accordion-section">
                  <div className="accordion-header border py-2 px-3 rounded-md bg-gray-100 cursor-pointer flex justify-between items-center" onClick={() => toggleAccordion(7)}>
                    <p className="text-2xl text-gray-500 ">Attended By</p>
                    <span className="material-symbols-outlined text-2xl">
                      expand_all
                    </span>
                  </div>
                  {activeAccordion === 7 && (
                    <ul className="text-lg text-gray-900 bg-gray-100 border rounded-md p-2">
                      {visitorsProp.attender.map((item, index) => (
                        <li key={index}>{index + 1}. {item.attender}</li>
                      ))}
                    </ul>
                  )}
                </div>
      
                <div className="accordion-section">
                  <div className="accordion-header border py-2 px-3 rounded-md bg-gray-100 cursor-pointer flex justify-between items-center" onClick={() => toggleAccordion(8)}>
                    <p className="text-2xl text-gray-500 ">Remarks</p>
                    <span className="material-symbols-outlined text-2xl">
                      expand_all
                    </span>
                  </div>
                  {activeAccordion === 8 && (
                    <ul className="text-lg text-gray-900 bg-gray-100 border rounded-md p-2">
                      {visitorsProp.remarks.map((item, index) => (
                        <li key={index}>{index + 1}. {item.remark}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              // Form Section
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Name*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,name:e.target.value})} defaultValue={visitorsProp.name} />
                <input type="text" placeholder="aadhaar Number" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,aadhaar:e.target.value})} defaultValue={visitorsProp.aadhaar} pattern="\d{4}-\d{4}-\d{4}" title="Aadhar number must be in the format XXXX-XXXX-XXXX" />
                <input type="tel" placeholder="Phone Number*" pattern="\d{10}" title="Phone number must 10 digit and not include Alphabets" onChange={(e)=>setVisitor({...visitor,phone:e.target.value})} defaultValue={visitorsProp.phone} className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
                <input type="tel" placeholder="Other Contact" pattern="\d{10}" title="Phone number must 10 digit and not include Alphabets" onChange={(e)=>setVisitor({...visitor,othernumber:e.target.value})} defaultValue={visitorsProp.othernumber} className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" />
                <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,gender:e.target.value})} defaultValue={visitorsProp.gender}>
                  <option value="">Select Gender*</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,category:e.target.value})} defaultValue={visitorsProp.category}>
                  <option value="">Select Category*</option>
                  {allcategory.map((category, index) => (
            <option key={index} value={category.categoryName}>
                {category.categoryName}
            </option>
        ))}
                </select>
                <input type="number" placeholder="Age*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,age:e.target.value})} defaultValue={visitorsProp.age} />
                <input type="text" placeholder="Purpose of Visit*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,purposeVisit:e.target.value})} defaultValue={visitorsProp?.purposeVisit?.at(-1)?.purpose} />
                <textarea placeholder="Address*" className="p-2 border rounded col-span-2 focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,address:e.target.value})} defaultValue={visitorsProp.address}></textarea>
                <label>Arrived Time*</label>
                <input type="time" placeholder="Arrived Time" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,arrivedtime:e.target.value})} defaultValue={visitorsProp?.arrivedtime?.at(-1)?.time} />
                <label>Despatch Time</label>
                <input type="time" placeholder="Departed Time" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,despachtime:e.target.value})} defaultValue={visitorsProp?.despachtime?.at(-1)?.time} />
                <input type="date" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,currentdate:e.target.value})} defaultValue={visitorsProp?.currentdate?.at(-1)?.date} />
                <input type="text" placeholder="Support Given*" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,support:e.target.value})} defaultValue={visitorsProp?.support?.at(-1)?.support} />
                <label className="block text-gray-400 w-full px-3 py-2 border rounded-md cursor-pointer focus:ring-2 focus:ring-amber-500">Upload your Photo
                  <input type="file" accept="image/*" className="w-full px-3 py-2 bg-gray-200 rounded-md outline-none hidden" onChange={(e)=>setVisitor({...visitor,image:e.target.files[0]})} />
                </label>
                <input type="text" placeholder="Number of days stay" className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,numberofstay:e.target.value})} defaultValue={visitorsProp?.numberofstay?.at(-1)?.number} />
                <select className="p-2 border rounded focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,status:e.target.value})} defaultValue={visitorsProp.status}>
                  <option value="">Status*</option>
                  <option value="Check in">Check in</option>
                  <option value="Check out">Check out</option>
                </select>
                <textarea placeholder="Remarks*" rows={1} className="p-2 border rounded col-span-1 focus:ring-amber-500 focus:ring-2 outline-none" onChange={(e)=>setVisitor({...visitor,remarks:e.target.value})} defaultValue={visitorsProp?.remarks?.at(-1)?.remark}></textarea>
                <button onClick={() => setIsEditing(false)} className="bg-green-500 text-white p-2 w-full rounded-lg hover:bg-green-600">
                  Back to view
                </button>
                <button type='submit' className="bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700" onClick={(e) => handleUpdateVisitor(e, visitorsProp._id)}>Submit</button>
              </form>
            )}
        
          </div>
        </div>
      )}
    </div>
  );
}

export default Edit;
