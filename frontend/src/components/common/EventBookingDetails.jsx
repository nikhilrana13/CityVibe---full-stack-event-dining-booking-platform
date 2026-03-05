import React from 'react';
import TicketDivider from './TicketDivider';
import TicketPill from './TicketCountPill';
import QRCode from 'react-qr-code';
import { formatDateRange, formatTime } from '../../lib/utils';

const EventBookingDetails = ({ booking }) => {
    return (
        <div className="max-w-xl mx-auto p-4">
            {/* Premium Glass Card */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden border">
                {/* Event Image */}
                <img
                    src={booking?.event?.coverimage}
                    className="w-full h-56 object-cover"
                />
                <div className="p-5 space-y-4">
                    <h2 className="text-xl font-semibold">
                        {booking?.event?.title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {booking?.event?.location}
                    </p>
                    <p className="text-sm text-gray-600">
                        {formatDateRange(booking?.event?.startDate)} •{" "}
                        {formatTime(booking?.event?.starttime)}
                    </p>
                    <TicketPill count={booking?.tickets?.length} />
                    <TicketDivider />
                    {/* QR Section */}
                    {booking?.ticketCode && (
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Scan at entry gate
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Show this QR code to the staff
                                </p>
                            </div>
                            <div className="relative bg-white p-2 border rounded-xl">
                                 <div className="absolute inset-0 border-2 border-purple-500 rounded-xl animate-pulse opacity-40"></div>
                                {booking?.ticketCode && (
                                    <QRCode
                                        value={booking?.ticketCode}
                                        size={90}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    <TicketDivider />
                    {/* Entry Instructions */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">
                            Entry Instructions
                        </h3>
                        <ul className="text-xs text-gray-500 space-y-1">
                            <li>• Reach venue 30 minutes before event</li>
                            <li>• Carry valid ID proof</li>
                            <li>• Outside food not allowed</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventBookingDetails;
