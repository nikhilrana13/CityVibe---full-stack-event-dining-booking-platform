import EventCard from '../../common/EventCard'
import EventCardShimmer from '../../common/EventCardShimmer'
import React from 'react'

const ComedySection = ({comedy,loading}) => {
  return (
   <div className='mx-auto px-4 gap-4 py-4  max-w-[1200px]'>
        <h3 className='text-[1.5rem] font-[500] mb-6'>Best in Comedy</h3>
        {/* events card */}
        <div className='flex gap-6 overflow-x-auto scrollbar-hide'>
            {
                    loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <EventCardShimmer key={i} />
                        ))
                    ) : comedy?.length > 0 ? (
                        comedy?.map((event) => {
                            return (
                                <EventCard key={event?._id} event={event} />
                            )
                        })
                    ) : (
                        <p className='text-sm w-full text-center py-10 text-gray-500'>No Comedy Events found</p>
                    )
                }
        </div>
    </div>
  )
}

export default ComedySection
