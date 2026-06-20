import EventCardShimmer from '../../events/EventCardShimmer'
import EventCard from '../../events/EventCard'
import React from 'react'

const ThisWeekEvent = ({thisweek,loading}) => {
  return (
    <div className='mx-auto px-4 gap-4 py-4  max-w-[1300px]'>
        <h3 className='text-[1.5rem] font-[500] mb-6'>Premiering this week</h3>
        {/* events card */}
        <div className='flex gap-6 overflow-x-auto scrollbar-hide'>
             {
                    loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <EventCardShimmer key={i} />
                        ))
                    ) : thisweek?.length > 0 ? (
                        thisweek.map((event) => {
                            return (
                                <EventCard key={event?._id} event={event} />
                            )
                        })
                    ) : (
                        <p className='text-sm w-full text-center py-10 text-gray-500'>No This Week Events found</p>
                    )
                }
        </div>
    </div>
  )
}

export default ThisWeekEvent