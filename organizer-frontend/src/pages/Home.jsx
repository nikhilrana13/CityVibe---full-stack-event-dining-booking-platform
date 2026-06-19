import LoginDialog from '@/components/common/LoginDialog'
import Analytics from '@/components/home/Analytics'
import Footer from '@/components/home/Footer'
import HeroSection from '@/components/home/HeroSection'
import HowToList from '@/components/home/HowToList'
import ListEventsCards from '@/components/home/ListEventsCards'
import { useDialog } from '@/context/useDialog'
import React from 'react'

const ListYourEvents = () => {
       const {isLoginDialogOpen,setIsLoginDialogOpen} = useDialog() 
    return (
        <>
        <div className='w-full'>
            <header className='flex bg-white border justify-between w-full transition-all py-3 duration-300 ease-in-out px-2 sm:px-4 items-center z-[9999] 
         fixed top-0 left-0 right-0  opacity-100  translate-y-0 min-h-[75px]'>
                <div className="flex flex-col leading-none">
                    <h1 className="text-[32px] font-black tracking-tight">
                        CITYVIBE
                    </h1>
                    <span className="text-[10px] tracking-[0.4em] font-semibold text-gray-500">
                        DISCOVER THE VIBE
                    </span>
                </div>
                {/* login */}
                <button onClick={()=>setIsLoginDialogOpen(true)} className="bg-black rounded-md px-5 py-2 text-sm text-white">
                    Get Started
                </button>
            </header>
            {/* hero section */}
            <HeroSection />
            {/* how to list */}
            <HowToList />
            {/* list events card */}
            <ListEventsCards />
            {/* Analytics */}
            <Analytics />
            {/* footer */}
            <Footer />
        </div>
        {isLoginDialogOpen && (
            <LoginDialog onClose={()=>setIsLoginDialogOpen(false)} />
        )}
        </>
        
    )
}

export default ListYourEvents