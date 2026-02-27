import React from "react"

const EventCardShimmer = () => {
  return (
    <div className="min-w-[300px] max-w-[300px] bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-[420px] bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.5s_infinite]" />
      </div>
      {/* Content Skeleton */}
      <div className="p-4 flex flex-col gap-3">
        {/* Date */}
        <div className="h-4 w-2/3 bg-gray-200 rounded-md"></div>
        {/* Title */}
        <div className="h-5 w-full bg-gray-200 rounded-md"></div>
        <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>
        {/* Location */}
        <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
        {/* Price */}
        <div className="h-4 w-1/3 bg-gray-200 rounded-md mt-2"></div>
      </div>
    </div>
  )
}

export default EventCardShimmer