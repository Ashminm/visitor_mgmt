import React from 'react'
import Auth from '../components/Auth';
import logo from '../assets/file.png'

function Landing() {
    
  return (
    <div className="flex justify-center items-center h-screen">
  <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-auto p-8 bg-white ">
      <Auth />
    </div>
  <section className="hidden lg:block lg:w-1/2 h-screen bg-amber-600 flex justify-center items-center ">
    <div className='min-h-screen flex justify-start items-center p-[10%]'>
        <div>
          <img src={logo} className='w-16 mb-5' alt="" />
        <h1 className='text-[30px] text-amber-400'>Advaithashramam</h1>
        <h1 className='text-[55px]'>Entry process for visitors.</h1>
        </div>
    </div>
  </section>
</div>

  )
}

export default Landing
