import React from "react"

const MobileEventBookingShimmer = ({rows}) => {
  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex flex-col gap-4 animate-pulse"
        >
          {/* Top Row */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-3 w-24 bg-gray-100 rounded"></div>
            </div>

            {/* Booking Status Badge */}
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-12 bg-gray-100 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-3 w-12 bg-gray-100 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-3 w-12 bg-gray-100 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="h-3 w-12 bg-gray-100 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="flex justify-between items-center">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default MobileEventBookingShimmer