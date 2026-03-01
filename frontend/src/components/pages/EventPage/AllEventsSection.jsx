import EventCard from '../../../components/common/EventCard';
import EventCardShimmer from '../../../components/common/EventCardShimmer';
import React from 'react';

const AllEventsSection = ({loadEvents,pagination,allevents,location}) => {
    if (!allevents) return null 
  return (
    <div className='mx-auto px-4 gap-4 py-4  max-w-[1200px]'>
            <h3 className='text-[1.5rem] font-[500] mb-6'>All Events in {location?.city || "..."}</h3>
            {/* events card */}
            <div className='flex gap-6 overflow-x-auto scrollbar-hide'>
                {
                    loadEvents ? (
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
                }
            </div>
        </div>
  );
}

export default AllEventsSection;
