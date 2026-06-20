import { useLocation } from 'react-router-dom';
import EventCard from '../../events/EventCard';
import React from 'react';
import { Loader2 } from 'lucide-react';

const AllEventsSection = ({ isFetchingMore, pagination, allevents, location, loaderRef,category}) => {
    if (!allevents) return null
    return (
        <div className='mx-auto px-4 gap-4 py-4 max-w-[1300px]'>
            <h3 className='text-[1.5rem] font-[500] mb-6'>All {category || ""} Events in {location?.city || "..."}</h3>
            {/* events card */}
            <div className="grid  grid-cols-1 md:place-items-center xl:place-items-start sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-2">
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
