import EventCardShimmer from '../../common/EventCardShimmer'
import EventCard from '../../common/EventCard'
import React from 'react'

const TrendingSection = ({ trending, loading }) => {
    return (
        <div className='mx-auto px-4 gap-4 py-4  max-w-[1200px]'>
            <h3 className='text-[1.5rem] font-[500] mb-6'>Trending in Delhi</h3>
            {/* events card */}
            <div className='flex gap-6 overflow-x-auto scrollbar-hide'>
                {
                    loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <EventCardShimmer key={i} />
                        ))
                    ) : trending?.length > 0 ? (
                        trending.map((event) => {
                            return (
                                <EventCard key={event?._id} event={event} />
                            )
                        })
                    ) : (
                        <p className='text-sm text-center text-gray-500'>No Trending Events found</p>
                    )
                }
            </div>
        </div>
    )
}

export default TrendingSection