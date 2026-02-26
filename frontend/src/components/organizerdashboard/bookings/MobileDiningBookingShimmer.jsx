import React from 'react'

const MobileDiningBookingShimmer = ({rows}) => {
  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex flex-col gap-5 animate-pulse"
        >
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-40 bg-gray-100 rounded"></div>
            </div>

            {/* Status Badge */}
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-3 w-14 bg-gray-100 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Special Request Block */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-3">
            <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-full bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default MobileDiningBookingShimmer