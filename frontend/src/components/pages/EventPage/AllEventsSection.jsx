import { useLocation } from 'react-router-dom';
import EventCard from '../../../components/common/EventCard';
import React from 'react';
import { Loader2 } from 'lucide-react';

const AllEventsSection = ({ isFetchingMore, pagination, allevents, location, loaderRef }) => {
    if (!allevents) return null
    const routelocation = useLocation()
    return (
        <div className='mx-auto px-4 gap-4 py-4  max-w-[1200px]'>
            <h3 className='text-[1.5rem] font-[500] mb-6'>All Events in {location?.city || "..."}</h3>
            {/* events card */}
            <div className={`${routelocation.pathname === "/events" ? "flex gap-6 overflow-y-auto scrollbar-hide" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-11"}`}>
             {/* {
                    isFetchingMore ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <EventCardShimmer key={i} />
                        ))
                    ) : allevents?.length > 0 ? (
                        allevents?.map((event) => {
                            return (
                                <EventCard key={event?._id} event={event} />
                            )
                        })
                    ) : (
                        <p className='text-sm w-full text-center py-10 text-gray-500'>No  Events found</p>
                    )
                } */}
                {
                    allevents?.length > 0 ? (
                        allevents.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))
                    ) : (
                        <p className='text-sm w-full text-center py-10 text-gray-500'>
                            No Events found
                        </p>
                    )
                }
            </div>
            {/* Infinite Scroll Loader */}
            {pagination?.currentPage < pagination?.totalPages && (
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
    );
}

export default AllEventsSection;
