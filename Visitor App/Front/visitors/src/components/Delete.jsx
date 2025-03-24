import React,{useState} from 'react'

function Delete() {
    const [isOpen, setIsOpen] = useState(false);
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
            <h2 className="text-lg font-bold">Are you sure want to Delete?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <p>Name</p>
              <p>aadhaar</p>
            </div>
            <div className="flex justify-between">
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
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
