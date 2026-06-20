import LoginDialog from '../../../components/common/LoginDialog';
import { HiArrowSmLeft } from "react-icons/hi";
import React, { useEffect, useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import UserSidebar from '@/components/common/UserSidebar';
import { formatDateRange } from '@/utils/Helpers';

const BookNavbar = ({ title, startDate, starttime, handleBack, city, showBack = false }) => {
    const user = useSelector((state) => state.Auth.user)
    const [isSidebarOpen, SetIsSidebarOpen] = useState(false)

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
                    <div className='relative flex items-center justify-between w-full'>
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
                        <div className='flex items-center md:absolute md:left-1/2 md:-translate-x-1/2 text-center'>
                            <div className="flex items-center gap-3 min-w-0">
                                {showBack && (
                                    <HiArrowSmLeft
                                        onClick={handleBack}
                                        size={23}
                                        className="cursor-pointer md:hidden"
                                    />
                                )}
                                <div className='flex flex-col'>
                                     {title && (
                                    <h2 className="text-[1.2rem] truncate font-[500]">
                                        {title}
                                    </h2>
                                )}
                                {(startDate || starttime || city) && (
                                    <span className="text-[0.8rem] flex gap-1 truncate text-gray-500 font-[400]">
                                        {startDate && formatDateRange(startDate)}
                                        {starttime && (
                                            <> | {formatTime(starttime)}</>
                                        )}
                                        {city && (
                                            <> • <span className="capitalize">{city}</span></>
                                        )}
                                    </span>
                                )}
                                </div>
                            </div>
                        </div>
                        {/* right side */}
                        <div className='hidden md:flex items-center gap-5'>
                            {/* login dialog open */}
                            {
                                user ? (
                                    <button onClick={() => SetIsSidebarOpen(true)} className='rounded-full cursor-pointer p-2 bg-[#D1D5DB]'>
                                        <CiUser size={25} className='text-white' />
                                    </button>
                                ) : (
                                    <LoginDialog />
                                )}
                        </div>
                    </div>
                </nav>
            </header >
            {/* sidebar */}
            <UserSidebar isOpen={isSidebarOpen} onClose={() => SetIsSidebarOpen(false)} />
        </>
    );
}

export default BookNavbar;
