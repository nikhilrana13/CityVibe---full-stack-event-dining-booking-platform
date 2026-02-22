import { Menu } from 'lucide-react'
import Sidebar from '../components/organizerdashboard/Sidebar'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const OrganizerLayout = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
  }, [isOpen])
  return (
    <div className="w-full">

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 justify-between bg-white border-b z-[9999] min-h-[75px] flex items-center px-4">
        <div className="flex flex-col leading-none">
          <h1 className="text-[32px] font-black tracking-tight">
            CITYVIBE
          </h1>
          <span className="text-[10px] tracking-[0.4em] font-semibold text-gray-500">
            DISCOVER THE VIBE
          </span>
        </div>
        <Menu onClick={() => setIsOpen(true)} className='block lg:hidden cursor-pointer' />
      </header>

      {/* Layout */}
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="hidden lg:block md:w-[20%] border pt-[75px]">
          <Sidebar />
        </div>
        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen w-[280px] bg-white z-[10000] transform transition-transform duration-300 
            ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
        >
          <div className="pt-[75px] h-full">
            <Sidebar />
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999] lg:hidden"
          />
        )}
        {/* Content */}
        <div className="w-full lg:w-[80%] bg-[#FAFAFA] pt-[75px] overflow-y-auto ">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default OrganizerLayout