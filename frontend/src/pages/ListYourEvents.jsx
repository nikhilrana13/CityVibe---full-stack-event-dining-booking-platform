import HowToList from '../components/pages/listyourevent/HowToList'
import HeroSection from '../components/pages/listyourevent/HeroSection'
import React from 'react'
import ListEventsCards from '../components/pages/listyourevent/ListEventsCards'
import Analytics from '@/components/pages/listyourevent/Analytics'
import Footer from '@/components/pages/listyourevent/Footer'

const ListYourEvents = () => {
    return (
        <div className='w-full'>
            <header className='flex bg-white border w-full transition-all py-3 duration-300 ease-in-out px-2 sm:px-4 items-center z-[9999] 
         fixed top-0 left-0 right-0  opacity-100  translate-y-0 min-h-[75px]'>
                <div className="flex flex-col leading-none">
                    <h1 className="text-[32px] font-black tracking-tight">
                        CITYVIBE
                    </h1>
                    <span className="text-[10px] tracking-[0.4em] font-semibold text-gray-500">
                        DISCOVER THE VIBE
                    </span>
                </div>
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
    )
}

export default ListYourEvents