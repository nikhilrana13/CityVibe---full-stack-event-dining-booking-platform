import { useSearchContext } from '../../context/useSearchContext';
import React, { useEffect, useState } from 'react';
import SearchResultCard from './SearchResultCard';
import { useLocationContext } from '../../context/useLocationContext';
import SearchResultCardShimmer from './SearchResultCardShimmer';
import { useDialog } from '../../context/useDialog';

const EventAndDiningSuggestions = () => {
    const [isVisible, setIsVisible] = useState(false)
    const { results, loading, type, query, setType, setQuery } = useSearchContext()
    const { location } = useLocationContext()
    const {setIsEventAndDiningOpen} = useDialog()

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10)
    }, [])
    const handleClose = () => {
        setQuery("")
        setIsVisible(false)
        setTimeout(() => {
            setIsEventAndDiningOpen(false)
        }, 500)
    }
    // console.log("results", results)
    return (
        <>
            <div className="fixed inset-0 z-50  flex items-center justify-center overflow-y-auto ">
                {/* BACKDROP */}
                <div
                    className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ease-out backdrop-saturate-150 ${isVisible ? "opacity-100" : "opacity-0"} `}
                    onClick={handleClose}
                />
                {/* dialog */}
                <div className={`relative z-[70] max-w-3xl w-[85%] px-3 md:px-5 py-6  bg-white dark:bg-[#161a2d] rounded-2xl shadow-2xl flex flex-col h-[75vh] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible
                    ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}>
                    {/* location input */}
                        <div className='flex-shrink-0 space-y-5'>
                        {/* search input */}
                        <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search for Events and restaurants" className="w-full px-4 border rounded-xl py-2  outline-none focus:ring-2 placeholder:text-[0.9rem] focus:ring-purple-500" />
                        {/* tabs */}
                        <div className='flex items-center space-x-4 md:space-x-8 overflow-y-auto'>
                            <span onClick={() => setType("all")} className={`font-[500] cursor-pointer text-sm  rounded-[18px] px-8 py-2 ${type === "all" ? "bg-[#775CFF] text-white" : "text-black"}`}>All</span>
                            <span onClick={() => setType("dining")} className={`text-black cursor-pointer font-[500] text-sm  rounded-[18px] px-8 py-2 ${type === "dining" ? "bg-[#960D32] text-white" : "text-black"}`}>Dining</span>
                            <span onClick={() => setType("event")} className={`text-black cursor-pointer font-[500] text-sm  rounded-[18px] px-8 py-2 ${type === "event" ? "bg-[#847915] text-white" : "text-black"}`}>Event</span>
                        </div>
                        </div>
                        {/* events and dining cards */}
                        <div className='flex-1 scrollbar-hide overflow-y-auto mt-6 pr-2'>
                             {loading ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                {[...Array(6)].map((_, i) => (
                                    <SearchResultCardShimmer key={i} />
                                ))}
                            </div>
                        ) : results?.length > 0 ? (
                            <div className='flex flex-col space-y-5'>
                                {type === "all" && (
                                    <h3 className='text-[1rem] font-[500]'>
                                        {query ? `Top Results in ${location?.city}` : `Trending in ${location?.city}`}
                                    </h3>
                                )}
                                {(type === "dining" || type === "event") && (
                                    <h3 className='text-[1rem] font-[500]'>
                                        {query ? `Search results in ${location?.city}` : `Trending in ${location?.city}`}
                                    </h3>
                                )}
                                <div className={`${query ? "flex flex-col  space-y-5" : "grid grid-cols-1 md:grid-cols-2 gap-6"}`}>
                                    {results?.map((item) => {
                                        return (
                                            <SearchResultCard key={item?._id} item={item} />
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className='flex justify-center items-center w-full py-10'>
                                <span className="text-gray-500 text-center">Sorry! We do not have results for {query}</span>
                            </div>
                        )
                        }
                        </div>
                       
                    </div>
                </div>
        </>
    );
}

export default EventAndDiningSuggestions;
