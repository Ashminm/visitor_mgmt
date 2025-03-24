import React,{useState,useEffect} from 'react'
import { DeleteVistorApi } from '../services/AllApis';

function Delete({visitorsProp}) {
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState("");

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
      }
    },[token])
// console.log(token);

    const handleDelete=async(id)=>{   
      const reqHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res= await DeleteVistorApi(reqHeaders,id)
      if(res.status===200){
        alert("deleted success")
        setIsOpen(false)
      }else{
        alert(res.data)
        setIsOpen(false)
      }   
    }

  return (
    <div className="">
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-3xs">
            <div className="flex justify-center items-center">
            <span className="material-symbols-outlined text-5xl rounded-full bg-gray-200 p-3">
              delete
              </span>
            </div>
            <h2 className="text-lg font-bold p-2 rounded">Are you sure want to Delete?</h2>
            <div className="flex justify-between gap-4">
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 w-full rounded"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
              <button
                className="mt-4 bg-blue-500 text-white px-4 w-full py-2 rounded"
                onClick={()=>handleDelete(visitorsProp)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Delete
