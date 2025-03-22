import React,{useEffect,useState} from 'react'

function OtherSettings() {
  const [attender,setAttender]=useState(null)
  const [addCategory,setAddCategory]=useState({
    categoryName:"",
    addedBy:""
  })

console.log(addCategory);


  useEffect(() => {
    const existingUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (existingUser) {
      setAttender(existingUser.username);
    }
  }, []);

  
  const handleCategoryAdd=async(e)=>{
    e.preventDefault();
  }

  return (
    <div>
      <div className="p-7 text-center">
        <h1 className='text-2xl'>Other Settings</h1>
        <h1>Manage new attander, new category</h1>
      </div>
      <section>
      <div className="flex flex-col md:flex-row gap-6 p-6 max-w-4xl mx-auto">
      {/* Add New Attender Section */}
      <div className="w-full md:w-1/2 bg-slate-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Attender</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full p-2 border rounded" required />
          <input type="file" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" required />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" required />
          <select className="w-full p-2 border rounded" defaultValue="" required>
            <option value="">Added by</option>
            {attender && <option value={attender}>{attender}</option>}
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
        </form>
      </div>

      {/* Add Category Section */}
      <div className="w-full md:w-1/2 bg-white bg-slate-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add Category</h2>
        <form className="space-y-4" onSubmit={handleCategoryAdd}>
        <input type="text" placeholder="Category Name" className="w-full p-2 border rounded" onChange={(e)=>{setAddCategory({...addCategory,categoryName:e.target.value})}}
                value={addCategory.categoryName}  />
        
          <select className="w-full p-2 border rounded" defaultValue="" onChange={(e)=>{setAddCategory({...addCategory,addedBy:e.target.value})}} >
            <option value="">Added by</option>
            {attender && <option value={attender}>{attender}</option>}
          </select>
          
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">Submit</button>
        </form>
      </div>
    </div>
      </section>

    </div>
  )
}

export default OtherSettings
