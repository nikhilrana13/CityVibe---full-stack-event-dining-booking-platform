import EventCardShimmer from '../../events/EventCardShimmer'
import EventCard from '../../events/EventCard'
import React from 'react'

const IndiaTopEventSection = ({indiatop,loading}) => {
  return (
    <div className='mx-auto px-4 gap-4 py-4  max-w-[1300px]'>
        <h3 className='text-[1.5rem] font-[500] mb-6'>India's Top Event</h3>
        {/* events card */}
        <div className='flex gap-6 overflow-x-auto scrollbar-hide'>
            {
                    loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <EventCardShimmer key={i} />
                        ))
                    ) : indiatop?.length > 0 ? (
                        indiatop.map((event) => {
                            return (
                                <EventCard key={event?._id} event={event} />
                            )
                        })
                    ) : (
                        <p className='text-sm w-full text-center py-10 text-gray-500'>No India Top Events found</p>
                    )
                }
        </div>
    </div>
  )
}

export default IndiaTopEventSection