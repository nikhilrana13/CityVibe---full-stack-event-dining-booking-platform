import { formatDateRange, formatTime, generateSlug } from "../../lib/utils"
import React from "react"
import { useNavigate } from "react-router-dom"
const EventCard = ({ event }) => {
    // console.log("event",event)
     const navigate = useNavigate()
    const handleClick = () => {
     navigate(`/events/${event._id}/${generateSlug(event.title)}`)
    }
  return (
    <div onClick={handleClick} className="min-w-[300px] max-w-[300px] mx-auto sm:m-0  bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer group">
      {/* Image Section */}
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={event?.coverimage}
          alt={event?.title || "NA"}
          className="w-full h-full object-center group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Date */}
        <div className="flex items-center font-[500] gap-2 text-[0.8rem] text-[#8b8123]">
          <span>{formatDateRange(event?.startDate, event?.endDate)},</span>
          <span>{formatTime(event?.starttime) || "NA"}</span>
        </div>
        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 leading-snug">
          {event?.title || "NA"}
        </h3>
        {/* Location */}
        <div className="flex items-center gap-2 text-[0.8rem] font-[500] text-black">
          <span className="truncate">{event?.venue || "NA"},</span>
            <span className="truncate capitalize">{event?.city || "NA"}</span>
        </div>
        {/* Price */}
        <p className="text-[0.8rem] font-medium text-[#545459] mt-1">
          ₹{event?.minPrice || "NA"} onwards
        </p>
      </div>
    </div>
  )
}

export default EventCard