import React,{createContext,useState} from 'react'

export const addingContext=createContext()

function ContextShare({ children }) {
    const [addResponce,setAddResponce]=useState({})

  return (
    <>
        <addingContext.Provider value={{addResponce,setAddResponce}}>
            { children }
        </addingContext.Provider>
    </>
  )
}

export default ContextShare
