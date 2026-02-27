import { LocateFixedIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import PopularCitiesGrid from './PopularCitiesGrid';
import { useLocationContext } from '../../context/useLocationContext';

const LocationDialog = ({ onClose }) => {
    const { handleUseCurrentLocation } = useLocationContext()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10)
    }, [])
    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => {
            onClose()
        }, 500)
    }
    return (
        <>
            <div className="fixed inset-0 z-50  flex items-center justify-center overflow-y-auto ">
                {/* BACKDROP */}
                <div
                    className={`fixed inset-0 bg-black/40 backdrop-blur-xl transition-opacity duration-500 ease-out backdrop-saturate-150 ${isVisible ? "opacity-100" : "opacity-0"} `}
                    onClick={handleClose}
                />
                {/* dialog */}
                <div className={`relative z-[70] max-w-3xl w-[80%] px-5 py-6 space-y-8 bg-white dark:bg-[#161a2d] rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible
                    ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}>
                    {/* location input */}
                    <div className=' flex flex-col space-y-4 '>
                        <h3 className='text-[1rem] text-[#545459] font-[500]'>Select Location</h3>
                        {/* search input */}
                        <input type="text" placeholder="Search city, area or locality" className="w-full px-4 border rounded-xl py-2  outline-none focus:ring-2 placeholder:text-[1rem] focus:ring-purple-500" />
                        {/* detect current location */}
                        <span onClick={() => { handleUseCurrentLocation(), handleClose() }} className='flex cursor-pointer items-center gap-2'>
                            <LocateFixedIcon size={23} className='text-[#6D49FD]' /><span className='text-sm font-[500]'>Use Current Location</span>
                        </span>
                    </div>
                    {/* popular cities */}
                    <div className='flex flex-col space-y-4 '>
                        <h3 className='text-[1rem] text-[#545459] font-[500]'>Popular Cities</h3>
                        <PopularCitiesGrid onClose={handleClose} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LocationDialog;
