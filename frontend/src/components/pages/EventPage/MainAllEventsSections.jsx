import EventCard from '@/components/common/EventCard';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import EventFiltersDialog from './EventFiltersDialog';

const MainAllEventsSections = ({ allevents, pagination, isFetchingMore, loaderRef, sortBy, setSortBy, setStartDate, startDate })=> {
    if (!allevents) return null
    const [openFilter, setOpenFilter] = useState(false)
    const handleDateFilter = (value) => {
        if (startDate === value) {
            setStartDate("")
        } else {
            setStartDate(value)
        }
    }
     useEffect(() => {
      if (openFilter) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "auto"
      }
      return () => {
        document.body.style.overflow = "auto"
      }
    }, [openFilter])
    return (
        <>
            <div className='mx-auto px-4 gap-4 py-4  max-w-[1300px]'>
                <h3 className='text-[1.5rem] font-[500] mb-6'>All Events</h3>
                {/* filter section */}
                <div className='flex my-8 items-center overflow-y-auto gap-5'>
                    <span onClick={() => setOpenFilter(true)} className={`border px-3 cursor-pointer flex gap-2 items-center py-1 text-[0.8rem] rounded-md ${sortBy ? "bg-[#EAE5FF] border-[#8972FE]" : ""}`}>
                        Filters <MdKeyboardArrowDown /></span>
                    <span onClick={() => handleDateFilter("Today")} className={`border px-3 whitespace-nowrap cursor-pointer py-1 font-500 text-[0.8rem] rounded-md ${startDate === "Today" ? "bg-[#EAE5FF] border-[#8972FE]" : ""}`}>Today</span>
                    <span onClick={() => handleDateFilter("Tomorrow")} className={`border whitespace-nowrap px-3 cursor-pointer py-1 font-500 text-[0.8rem] rounded-md ${startDate === "Tomorrow" ? "bg-[#EAE5FF] border-[#8972FE]" : ""}`}>Tomorrow</span>
                    <span onClick={() => handleDateFilter("ThisWeek")} className={`border whitespace-nowrap px-3 cursor-pointer py-1 font-500 text-[0.8rem] rounded-md ${startDate === "ThisWeek" ? "bg-[#EAE5FF] border-[#8972FE]" : ""}`}>This Week</span>
                    <span onClick={() => handleDateFilter("ThisMonth")} className={`border whitespace-nowrap px-3 cursor-pointer py-1 font-500 text-[0.8rem] rounded-md ${startDate === "ThisMonth" ? "bg-[#EAE5FF] border-[#8972FE]" : ""}`}>This Month</span>
                </div>
                {/* events card */}
                <div className="grid grid-cols-1 md:place-items-center xl:place-items-start sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-2">
                    {
                        !isFetchingMore && allevents?.length === 0 ? (
                            <div className="col-span-full w-full flex flex-col items-center justify-center py-20 text-center">
                                <h3 className="text-lg font-medium">No events found</h3>
                                <p className="text-sm text-gray-500 mt-2">
                                    Try changing filters or selecting another date.
                                </p>
                            </div>
                        ) : (
                            allevents.map((event) => (
                                <EventCard key={event._id} event={event} />
                            ))
                        )
                    }
                </div>
                {/* Infinite Scroll Loader */}
                {pagination?.currentPage < pagination?.totalPages &&(
                    <div ref={loaderRef} className="h-20 flex justify-center items-center">
                        {isFetchingMore ? (
                            <div className="flex gap-2">
                                <Loader2 className='text-black w-8 h-8 animate-spin' />
                            </div>
                        ) : (
                            <span className='text-sm text-gray-400'>Scroll to load more</span>
                        )
                        }
                    </div>
                )}
            </div>
            {/* open filter  */}
            {
                openFilter && (
                    <EventFiltersDialog sortBy={sortBy} setSortBy={setSortBy} onClose={() => setOpenFilter(false)} />
                )
            }
        </>

    );
}

export default MainAllEventsSections;
