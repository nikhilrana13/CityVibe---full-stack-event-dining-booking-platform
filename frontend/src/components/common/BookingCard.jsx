import React from "react"
import { ChevronRight } from "lucide-react"

const statusStyles = {
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-600",
  pending: "bg-yellow-100 text-yellow-700",
}

const BookingCard = ({
  title,
  subtitle,
  date,
  time,
  location,
  image,
  status = "confirmed",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border w-full md:max-w-[500px] border-gray-200 rounded-xl p-5  flex flex-col gap-4 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex justify-between items-start">
        {/* left */}
        <div className="flex flex-col gap-1">
          <h3 className="text-[1rem] font-semibold text-gray-900">
            {title}
          </h3>

          {subtitle && (
            <span className="text-gray-500   text-[0.8rem]">
              {subtitle}
            </span>
          )}
        </div>
        {/* image */}
        {image && (
          <img
            src={image}
            className="w-16 h-16 rounded-xl object-cover"
          />
        )}
      </div>
      {/* date */}
      <div>
        <p className="text-gray-500 text-[0.8rem]">Date and time</p>
        <p className="text-gray-900 text-[1rem] font-[400]">{date} at {time}</p>
      </div>
      {/* location */}
      <div>
        <p className="text-gray-500 text-[0.8rem] text-sm">Location</p>
        <p className="text-gray-900 font-[400] text-[1rem]">{location}</p>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t pt-3">
        <span
          className={`px-3 py-1 rounded-lg text-sm font-medium ${
            statusStyles[status]
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>

        <div className="flex items-center gap-1 text-gray-700 font-medium text-sm">
          View details
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  )
}

export default BookingCard