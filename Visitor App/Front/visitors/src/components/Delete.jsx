import React,{useState,useEffect,useContext} from 'react'
import { DeleteVistorApi } from '../services/AllApis';
import toast from "react-hot-toast"
import { addingContext } from '../context/ContextShare';

function Delete({visitorsProp}) {
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState("");
    const {addResponce,setAddResponce}=useContext(addingContext)

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
      }
    },[token])
// console.log(token);
// console.log(visitorsProp);

    const handleDelete=async(id)=>{   
      const reqHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res= await DeleteVistorApi(reqHeaders,id)
      if(res.status===200){
        toast.success("deleted success")
        setIsOpen(false)
        setAddResponce(res.data)
      }else{
        toast.error(res.data)
        setIsOpen(false)
      }   
    }

  return (
    <div>
      <span className="material-symbols-outlined cursor-pointer text-3xl text-red-500 hover:text-red-700"  onClick={() => setIsOpen(true)}>
        delete
        </span>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-3xs">
            <div className="flex justify-center items-center">
            <span className="material-symbols-outlined text-5xl rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer p-3 text-gray-600">
              delete
              </span>
            </div>
            <h2 className="text-lg font-bold p-2 rounded text-gray-600">Are you sure want to Delete?</h2>
            <div className="flex justify-between gap-4">
              <button
                className="mt-4 bg-green-300 hover:bg-green-400 text-black px-4 py-2 w-full rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
              <button
                className="mt-4 bg-red-300 text-black hover:bg-red-400 px-4 w-full py-2 rounded-lg"
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
