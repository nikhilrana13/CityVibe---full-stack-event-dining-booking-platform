import React from "react"

const EventBookingTableShimmer = ({ rows = 5 }) => {
  return (
    <>
      {[...Array(rows)].map((_, index) => (
        <tr key={index} className="border-t animate-pulse">
          {/* Booking Id */}
          <td className="px-6 py-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </td>

          {/* Event */}
          <td className="px-6 py-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-40 bg-gray-200 rounded"></div>
              <div className="h-3 w-24 bg-gray-100 rounded"></div>
            </div>
          </td>

          {/* User */}
          <td className="px-6 py-4">
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
          </td>

          {/* Date */}
          <td className="px-6 py-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>

          {/* Tickets */}
          <td className="px-6 py-4">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </td>

          {/* Amount */}
          <td className="px-6 py-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>

          {/* Booking Status */}
          <td className="px-6 py-4">
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          </td>

          {/* Payment Status */}
          <td className="px-6 py-4">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </td>
        </tr>
      ))}
    </>
  )
}

export default EventBookingTableShimmer