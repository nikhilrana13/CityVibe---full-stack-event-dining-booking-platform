import React, { forwardRef, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { IoLocationOutline, IoSearch } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import LoginDialog from './LoginDialog';
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdDinnerDining } from "react-icons/md";
import {LuGuitar} from "react-icons/lu";
import { useSelector } from 'react-redux';
import LocationDialog from './LocationDialog';
import { useLocationContext } from '../../context/useLocationContext';
import EventAndDiningSuggestions from './EventAndDiningSuggestions';
import { useDialog } from '../../context/useDialog';
import UserSidebar from './UserSidebar';

const Navbar = () => {
  const [isSidebarOpen, SetIsSidebarOpen] = useState(false)
  const [isEventAndDiningOpen,setIsEventAndDiningOpen] = useState(false)
  const user = useSelector((state) => state.Auth.user)
  const {location} = useLocationContext()
  const routelocation = useLocation()
  const {isLocationOpen,setIsLocationOpen} = useDialog()
  //  console.log("select city",location)
  // console.log("response",organizer)
  // lock scroll on sidebar open
  useEffect(() => {
  if (isSidebarOpen || isLocationOpen || isEventAndDiningOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
  return () => {
    document.body.style.overflow = "auto"
  }
}, [isSidebarOpen,isLocationOpen,isEventAndDiningOpen])
const showNavTabs = routelocation?.pathname === "/" || routelocation?.pathname === "/events" || routelocation?.pathname === "/dining" 
  return (
    <>
      <header className='flex border bg-white w-full transition-all py-3 duration-300 ease-in-out px-2 sm:px-4 items-center z-[42] sticky top-0 left-0 right-0  opacity-100  translate-y-0 min-h-[75px]'>
        <nav className="flex  gap-3  flex-col  w-full">
          <div className='flex items-center justify-between w-full'>
            {/* left side*/}
            <div className='flex items-center gap-2'>
              <div className="hidden md:flex flex-col leading-none">
                <h1 className="text-[32px] font-black tracking-tight">
                  CITYVIBE
                </h1>
                <span className="text-[10px] tracking-[0.4em] font-semibold text-gray-500">
                  DISCOVER THE VIBE
                </span>
              </div>
              <div className='w-[1.4px] ml-2 hidden md:block bg-gray-300 h-[30px]'>
              </div>
              {/* location */}
              <div onClick={()=>setIsLocationOpen(true)} className='flex cursor-pointer items-center gap-2'>
                <IoLocationOutline size={23} className='text-[#6748E4]' />
                <div className='flex flex-col'>
                  <span className='text-[1rem] font-[500]'>{location?.city || "NA"}</span>
                  <span className='text-[0.8rem] font-[400] text-[#545459]'>{location?.state || "NA"}</span>
                </div>
              </div>
              {/* links */}
              {showNavTabs&& (
                 <ul className='lg:flex hidden ml-7 p-2 gap-8 items-center '>
                <NavLink to="/" className={({ isActive }) => `${isActive ? "rounded-full bg-[#EAE5FF] text-[#231268]" : "text-[#545459]"} md:px-3 py-2 text-[0.9rem] font-[500] `}>
                  For you</NavLink>
                <NavLink to="/dining" className={({ isActive }) => `${isActive ? "rounded-full bg-[#FFEBEF] text-[#F53F6F]" : "text-[#545459]"} md:px-3 py-2 text-[0.9rem] font-[500] `}>Dining</NavLink>
                <NavLink to="/events" className={({ isActive }) => `${isActive ? "rounded-full bg-[#F9F4DC] text-[#585004]" : "text-[#545459]"} md:px-3 py-2 text-[0.9rem] font-[500] `}>Events</NavLink>
              </ul>
              )}
             
            </div>
            {/* right side */}
            <div className='flex items-center gap-5'>
              {/* search dialog */}
              <div  onClick={()=>setIsEventAndDiningOpen(true)} className='border hidden xl:flex cursor-pointer px-2 md:px-4 py-2 gap-3  items-center rounded-xl '>
                <IoSearch size={20} className='text-[#6748E4]' />
                <span className='text-gray-500 whitespace-wrap text-[1rem]'>Search for events and restaurants</span>
              </div>
              {/* login dialog open */}
              {
                user ? (
                  <button onClick={() => SetIsSidebarOpen(true)} className='rounded-full cursor-pointer p-2 bg-[#D1D5DB]'>
                    <CiUser size={25} className='text-white' />
                  </button>
                ) : (
                  <LoginDialog  />
                )
              }
            </div>
          </div>
          {/* for mobile */}
          <div className='xl:hidden flex  flex-col gap-2'>
            {/* search input */}
            <div onClick={()=>setIsEventAndDiningOpen(true)} className='border flex cursor-pointer px-2 md:px-4 py-3 gap-3  items-center rounded-xl '>
              <IoSearch size={20} className='flex-shrink-0 text-[#6748E4]' />
              <span className='text-gray-500 whitespace-wrap overflow-hidden text-ellipsis text-[0.8rem] sm:text-[1rem]'>Search for events and restaurants</span>
            </div>
            {/* links */}
            {showNavTabs && (
                <ul className='flex w-full mt-1 pb-3  overflow-y-auto gap-2 sm:gap-8 justify-between  lg:hidden items-center '>
              <NavLink to="/" className={({ isActive }) => `${isActive ? "rounded-md sm:rounded-full bg-[#EAE5FF] text-[#231268]" : "text-[#545459]"} flex-1 px-4 md:px-3  whitespace-nowrap py-2 flex  flex-col items-center text-[0.9rem] font-[500] `}>
                <FaWandMagicSparkles size={23} className='block sm:hidden' />
                For you</NavLink>
              <NavLink to="/dining" className={({ isActive }) => `${isActive ? "rounded-md sm:rounded-full bg-[#FFEBEF] text-[#F53F6F]" : "text-[#545459]"} flex-1 px-4 md:px-3 flex  whitespace-nowrap flex-col items-center py-2 text-[0.9rem] font-[500] `}>
                <MdDinnerDining size={23} className='block sm:hidden' />
                Dining</NavLink>
              <NavLink to="/events" className={({ isActive }) => `${isActive ? "rounded-md sm:rounded-full bg-[#F9F4DC] text-[#585004]" : "text-[#545459]"} flex-1 px-4 md:px-3 flex  whitespace-nowrap flex-col items-center py-2 text-[0.9rem] font-[500] `}>
                <LuGuitar size={23} className='block sm:hidden' />
                Events</NavLink>
            </ul>
            )}
          </div>
        </nav>
      </header>
       {/* sidebar */}
       <UserSidebar isOpen={isSidebarOpen} onClose={()=>SetIsSidebarOpen(false)} />
      
        {/* location dialog */}
        {isLocationOpen && (
          <LocationDialog />
        )}
        {/* events and dining search dialog */}
        {isEventAndDiningOpen && (
          <EventAndDiningSuggestions onClose={()=>setIsEventAndDiningOpen(false)}  />
        )}
    </>
  )
}

export default Navbar