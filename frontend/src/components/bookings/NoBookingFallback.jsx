import { TicketIcon } from 'lucide-react';
import React from 'react';

const NoBookingFallback = ({type,onExplore}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">

      {/* icon */}
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-100">
        <span className="text-2xl">
            <TicketIcon size={23} />
        </span>
      </div>

      {/* title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No bookings yet
      </h3>

      {/* description */}
      <p className="text-sm text-gray-500 max-w-xs mb-6">
        {type === "events"
          ? "You haven’t booked any events yet. Discover experiences happening around you."
          : "You haven’t made any dining reservations yet. Explore restaurants and book your table."}
      </p>

      {/* CTA */}
      <button
        onClick={onExplore}
        className="bg-black text-white text-sm px-5 py-2.5 rounded-lg hover:bg-gray-900 transition"
      >
        {type === "events" ? "Explore Events" : "Explore Restaurants"}
      </button>

    </div>
  );
}

export default NoBookingFallback;
