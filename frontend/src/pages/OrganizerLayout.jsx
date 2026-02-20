import Sidebar from '../components/organizerdashboard/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const OrganizerLayout = () => {

  return (
   <div className="w-full">

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white border z-[9999] min-h-[75px] flex items-center px-4">
        <div className="flex flex-col leading-none">
          <h1 className="text-[32px] font-black tracking-tight">
            CITYVIBE
          </h1>
          <span className="text-[10px] tracking-[0.4em] font-semibold text-gray-500">
            DISCOVER THE VIBE
          </span>
        </div>
      </header>

      {/* Layout */}
      <div className="flex min-h-screen flex-col md:flex-row">

        {/* Sidebar */}
        <div className="hidden md:block md:w-[20%] border pt-[75px]">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="w-full md:w-[80%] bg-[#FAFAFA] pt-[75px] overflow-y-auto flex flex-col">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default OrganizerLayout