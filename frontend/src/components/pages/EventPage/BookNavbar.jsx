import LoginDialog from '../../../components/common/LoginDialog';
import { HiArrowSmLeft } from "react-icons/hi";
import React, { useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDateRange, formatTime, generateSlug } from '../../../lib/utils';

const BookNavbar = ({title,startDate,starttime,handleBack,city}) => {
    const user = useSelector((state) => state.Auth.user)
    const [isSidebarOpen, SetIsSidebarOpen] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isSidebarOpen])
   
    return (
        <>
            <header className='flex shadow-md bg-white w-full transition-all py-3 duration-300 ease-in-out px-2 sm:px-4 items-center z-[42] sticky top-0 left-0 right-0  opacity-100  translate-y-0 min-h-[75px]'>
                <nav className="flex  gap-3  flex-col  w-full">
                    <div className='flex items-center justify-between w-full'>
                        {/* left side*/}
                        <div className='md:flex hidden items-center gap-2'>
                            <div className="hidden md:flex flex-col leading-none">
                                <h1 className="text-[32px] font-black tracking-tight">
                                    CITYVIBE
                                </h1>
                                <span className="text-[10px] tracking-[0.4em] font-semibold text-gray-500">
                                    DISCOVER THE VIBE
                                </span>
                            </div>
                        </div>
                        {/* center */}
                        <div className='flex   gap-5 min-w-0 items-center'>
                            <HiArrowSmLeft onClick={handleBack} size={23} className='flex-shrink-0 md:hidden flex' />
                            <div className='flex flex-col min-w-0'>
                                <h2 className='text-[1.2rem] truncate font-[500]'>{title}</h2>
                            <span className='text-[0.8rem] flex gap-1 truncate text-gray-500 font-[400]'>{formatDateRange(startDate)} | {formatTime(starttime)} • <span className='capitalize'>{city}</span></span>
                            </div>
                            
                        </div>
                        {/* right side */}
                        <div className='flex items-center gap-5'>
                            {/* login dialog open */}
                            {
                                user ? (
                                    <button onClick={() => SetIsSidebarOpen(true)} className='rounded-full cursor-pointer p-2 bg-[#D1D5DB]'>
                                        <CiUser size={25} className='text-white' />
                                    </button>
                                ) : (
                                    <LoginDialog />
                                )
                            }
                        </div>
                    </div>
                </nav>
            </header>

        </>
    );
}

export default BookNavbar;
