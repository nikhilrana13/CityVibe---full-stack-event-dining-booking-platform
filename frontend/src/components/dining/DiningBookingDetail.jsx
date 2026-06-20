import React from 'react';
import { Loader2 } from 'lucide-react';
import { formatDateRange, formatTime } from '@/utils/Helpers';
import TicketDivider from '../common/TicketDivider';

const DiningBookingDetail = ({ booking, CancelBooking, iscancelbook }) => {
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
          <div className='flex justify-between items-center'>
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
            <div>
              {booking?.bookingStatus === "cancelled" ? (
                <button className="bg-red-100 text-red-600 rounded-xl px-7 py-2">
                  Cancelled
                </button>
              ) : (
                <button
                  onClick={CancelBooking}
                  disabled={iscancelbook}
                  className="bg-red-100 text-red-600 rounded-xl px-7 py-2 flex items-center justify-center"
                >
                  {iscancelbook ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Cancel"
                  )}
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default DiningBookingDetail;
