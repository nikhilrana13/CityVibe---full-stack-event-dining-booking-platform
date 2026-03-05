import React from 'react';
import TicketDivider from './TicketDivider';
import { formatDateRange, formatTime } from '../../lib/utils';

const DiningBookingDetails = ({booking}) => {
  return (
     <div className="max-w-xl mx-auto p-4">
      <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
        <img
          src={booking?.restaurant?.images?.[0]}
          className="w-full h-56 object-cover"
        />
        <div className="p-5 space-y-4">
          <h2 className="text-xl font-semibold">
            {booking?.restaurant?.name}
          </h2>
          <p className="text-gray-500 text-sm">
            {booking?.restaurant?.location}
          </p>
          <div className="bg-black text-white px-4 py-1 rounded-full text-sm w-fit">
            {booking?.numberofguests} Guests
          </div>
          <TicketDivider />
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Reservation Details
            </p>
            <p className="text-sm text-gray-500">
              Date: {formatDateRange(booking?.bookingdate)}
            </p>
            <p className="text-sm text-gray-500">
              Time: {formatTime(booking?.timeSlot)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiningBookingDetails;
