import React from "react"

const DiningBookingTableShimmer = ({ rows }) => {
  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <tr key={index} className="border-t animate-pulse">
          
          {/* Booking ID */}
          <td className="px-6 py-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </td>

          {/* Customer Details */}
          <td className="px-6 py-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-40 bg-gray-100 rounded"></div>
            </div>
          </td>

          {/* Date */}
          <td className="px-6 py-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>

          {/* Time Slot */}
          <td className="px-6 py-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </td>

          {/* Guests */}
          <td className="px-6 py-4">
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
          </td>

          {/* Reservation Type */}
          <td className="px-6 py-4 text-right">
            <div className="h-4 w-16 bg-gray-200 rounded ml-auto"></div>
          </td>

          {/* Booking Status */}
          <td className="px-6 py-4 text-right">
            <div className="h-6 w-24 bg-gray-200 rounded-full ml-auto"></div>
          </td>

        </tr>
      ))}
    </>
  )
}

export default DiningBookingTableShimmer