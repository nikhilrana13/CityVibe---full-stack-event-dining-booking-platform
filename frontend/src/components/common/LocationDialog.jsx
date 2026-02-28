import { LocateFixedIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import PopularCitiesGrid from './PopularCitiesGrid';
import { useLocationContext } from '../../context/useLocationContext';
import useLocationSearch from '../../hooks/useLocationSearch';
import { IoLocationOutline } from 'react-icons/io5';

const LocationDialog = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false)
    const search = useLocationSearch()
    const { setLocation, handleUseCurrentLocation } = useLocationContext()
    // console.log("sugesstions",search.suggestions)

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
                <div className={`relative z-[70] max-w-3xl w-[80%] px-5 py-6 space-y-8 bg-white dark:bg-[#161a2d] rounded-2xl shadow-2xl overflow-y-auto h-[75vh] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible
                    ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}>
                    {/* location input */}
                    <div className='relative flex flex-col space-y-4 '>
                        <h3 className='text-[1rem] text-[#545459] font-[500]'>Select Location</h3>
                        {/* search input */}
                        <input value={search.value} onChange={(e) => search.SetValue(e.target.value)} type="text" placeholder="Search city, area or locality" className="w-full px-4 border rounded-xl py-2  outline-none focus:ring-2 placeholder:text-[1rem] focus:ring-purple-500" onFocus={() => search.SetOpen(true)} onBlur={() => setTimeout(() => search.SetOpen(false), 150)} />
                        {/* show dropdown */}
                        {
                            search.open && (
                                <>
                                    {/* Loading */}
                                    {search.Loading && (
                                        <span className="text-gray-500 text-center">Loading...</span>
                                    )}
                                    {/* Suggestions */}
                                    {!search.Loading && search.suggestions.length > 0 && (
                                        <div className=" absolute top-full left-0 w-full mt-2 max-h-60 overflow-y-auto z-50 space-y-3" >
                                            {search.suggestions.map((item, index) => (
                                                <div key={index} onMouseDown={() => {
                                                    search.SetValue(item.display);
                                                    search.SetOpen(false);
                                                    setLocation({
                                                        city: item.city,
                                                        state: item.state
                                                    })
                                                    handleClose()
                                                }}
                                                className="py-3 gap-3 cursor-pointer transition-all duration-200 flex items-center">
                                                    <IoLocationOutline className='text-gray-500' size={23} />
                                                    <div className='flex flex-col'>
                                                        <span className='font-semibold text-[0.9rem]'>{item.city}</span>
                                                        <span className='text-[0.8rem] text-gray-500'>{item.state}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {/* No result */}
                                    {!search.Loading && search.hasSearched && search.suggestions.length === 0 && (
                                        <div className="absolute top-full left-0 w-full mt-2 max-h-60 overflow-y-auto z-50 space-y-3 ">
                                         <span className="text-gray-500 text-center">No Location found</span>
                                        </div>
                                    )}
                                </>
                            )
                        }
                        {!search.open && (
                            <>
                                {/* detect current location */}
                                <span onClick={() => { handleUseCurrentLocation(), handleClose() }} className='flex cursor-pointer items-center gap-2'>
                                    <LocateFixedIcon size={23} className='text-[#6D49FD]' /><span className='text-sm font-[500]'>Use Current Location</span>
                                </span>
                            </>
                        )}
                    </div>
                    {/* popular cities */}
                    {
                        !search.open && (
                            <div className='flex flex-col space-y-4 '>
                                <h3 className='text-[1rem] text-[#545459] font-[500]'>Popular Cities</h3>
                                <PopularCitiesGrid onClose={handleClose} />
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    );
}

export default LocationDialog;
