import React, { useState } from 'react'
import MobileDiningBookingShimmer from './MobileDiningBookingShimmer';
import DiningBookingTableShimmer from './DiningBookingTableShimmer';
import { useGetDiningBookingsQuery } from '@/redux/api/BookingApi';
import { formatDateRange } from '@/utils/Helpers';

const DiningBookingTable = () => {
    const [status, setStatus] = useState("")
    const [page, setPage] = useState(1)
    const diningbookingQuery = useGetDiningBookingsQuery({ page, status })
    const loading = diningbookingQuery?.isLoading
    const isError = diningbookingQuery?.isError
    const diningbookings = diningbookingQuery?.data?.data?.diningbookings
    const pagination = diningbookingQuery?.data?.data?.pagination


    const start = pagination?.currentpage ? (pagination.currentpage - 1) * pagination.limit + 1 : 0;
    const end = Math.min(pagination?.currentpage * pagination?.limit, pagination?.totalbookings)

    return (
        <>
            {/* filters */}
            <div className="w-full py-4 px-5 bg-white shadow-xl border-gray-300  rounded-lg ">
                <div className="flex justify-end  gap-3">
                    <select
                        value={status}
                        onChange={(e) => {setStatus(e.target.value);setPage(1)}}
                        className="w-full md:w-48 px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-[#6a4dff]"
                    >
                        <option value="">All Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>
            {/* table */}
            <div className="w-full pb-20 xl:pb-0">
                {/* desktop table */}
                <div className="hidden xl:block bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <div className='overflow-x-auto custom-scrollbar'>
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4 text-left">Booking Id</th>
                                    <th className="px-6 py-4 text-left">Customer</th>
                                    <th className="px-6 py-4 text-left">Date</th>
                                    <th className="px-6 py-4 text-left">Time Slot</th>
                                    <th className="px-6 py-4 text-left">Guests</th>
                                    <th className="px-6 py-4 text-right">Type</th>
                                    <th className="px-6 py-4 text-right"> Status</th>
                                </tr>
                            </thead>
                            {
                                loading ? (
                                    <tbody>
                                        <DiningBookingTableShimmer rows={5} />
                                    </tbody>
                                ) : diningbookings?.length > 0 ? (
                                    <tbody>
                                        {diningbookings?.map((booking) => {
                                            return (
                                                <tr
                                                    key={booking?._id}
                                                    className="border-t hover:bg-gray-50 transition-all duration-200"
                                                >
                                                    {/* Booking Id*/}
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {booking?._id.slice(0, 6) || "NA"}
                                                    </td>
                                                    {/* customer details */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    {booking?.user?.name || "NA"}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {booking?.user?.email || "NA"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* Date */}
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {formatDateRange(booking?.bookingdate) || "NA"}
                                                    </td>
                                                    {/* Time slot */}
                                                    <td className="px-6 py-4">
                                                        {booking?.timeSlot || "NA"}
                                                    </td>
                                                    {/* Guests */}
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {booking?.numberofGuests || 2}
                                                    </td>
                                                    {/* type */}
                                                    <td className="px-6 py-4 text-right text-gray-700">
                                                        {booking?.reservationType || "NA"}
                                                    </td>
                                                    {/* booking status */}
                                                    {
                                                        booking?.bookingStatus === "confirmed" && (
                                                            <td className="px-6 text-right py-4">
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                                    confirmed
                                                                </span>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        booking?.bookingStatus === "cancelled" && (
                                                            <td className="px-6 text-right py-4">
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                                    cancelled
                                                                </span>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        booking?.bookingStatus === "pending" && (
                                                            <td className="px-6 text-right py-4">
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                                    pending
                                                                </span>
                                                            </td>
                                                        )
                                                    }
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                ) : isError ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan="8" className="text-center py-10 text-red-500">
                                                Error loading Bookings.please try again
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan="8" className="text-center py-10 text-gray-500">
                                                No Bookings found
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            }
                        </table>
                    </div>
                    {/* pagination */}
                    {
                        !loading && (
                            pagination?.totalPages > 1 && (
                                <div className="w-full bg-[#f8f9fc] dark:bg-[#101322] border-t-[#cfd3e7] dark:border-t-[#2a2d3d] py-4 px-6 items-center  border-t flex justify-between">
                                    <div className='flex items-center gap-2'>
                                        <span className="text-[#747474] text-[0.9rem] sm:text-[0.8rem] font-[600]">
                                            Showing {start || "NA"}-{end || "NA"} of{" "}
                                            {pagination?.totalbookings || 0} events
                                        </span>
                                    </div>
                                    {/* page button */}
                                    <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
                                        {/* Prev */}
                                        <button
                                            onClick={() => page > 1 && setPage((prev) => prev - 1)}
                                            disabled={page === 1}
                                            className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-xl font-medium bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6] text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 transition-all duration-300">
                                            ←
                                            <span className="hidden sm:inline ml-1">Prev</span>
                                        </button>

                                        {/* Page Info */}
                                        <span className="text-[#3d4a3d] text-xs sm:text-sm font-semibold">
                                            {pagination?.currentpage} / {pagination?.totalPages}
                                        </span>
                                        {/* Next */}
                                        <button
                                            onClick={() =>
                                                page < pagination?.totalPages && setPage((prev) => prev + 1)
                                            }
                                            disabled={page === pagination?.totalPages}
                                            className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-xl font-medium bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6] text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 transition-all duration-300"
                                        >
                                            <span className="hidden sm:inline mr-1">Next</span>
                                            →
                                        </button>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
                {/* mobile cards */}
                <div className="xl:hidden flex flex-col gap-4">
                    {loading ? (
                        <div className="flex flex-col gap-4">
                            <MobileDiningBookingShimmer rows={3} />
                        </div>
                    ) : diningbookings?.length > 0 ? (
                        diningbookings.map((booking) => {
                            return (
                                <div key={booking?._id} className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex flex-col gap-5 transition hover:shadow-lg">
                                    {/* Top Section */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                #{booking?._id?.slice(0, 6)}
                                            </p>
                                            <h3 className="font-semibold text-gray-900 text-sm mt-1">
                                                {booking?.user?.name || "NA"}
                                            </h3>

                                            <p className="text-xs text-gray-500">
                                                {booking?.user?.email || "NA"}
                                            </p>
                                        </div>
                                        {/* Booking Status Badge */}
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${booking?.bookingStatus === "confirmed"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : booking?.bookingStatus === "pending"
                                                    ? "bg-amber-100 text-amber-700"
                                                    : "bg-rose-100 text-rose-700"
                                                }`}
                                        >
                                            {booking?.bookingStatus}
                                        </span>
                                    </div>
                                    {/* Info Grid */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-400 text-xs">Date</p>
                                            <p className="font-medium text-gray-800">
                                                {formatDateRange(booking?.bookingdate)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Time</p>
                                            <p className="font-medium text-gray-800">
                                                {booking?.timeSlot || "NA"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Guests</p>
                                            <p className="font-medium text-gray-800">
                                                {booking?.numberofGuests || 0} Guests
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Type</p>
                                            <p className="font-medium capitalize text-gray-800">
                                                {booking?.reservationType || "NA"}
                                            </p>
                                        </div>
                                    </div>
                                    {booking?.specialrequests && (
                                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-600">
                                            <span className="font-medium text-gray-700">
                                                Special Request:
                                            </span>{" "}
                                            {booking?.specialrequests}
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            No Bookings found
                        </div>
                    )}
                </div>
                {/*mobile pagination */}
                {
                    !loading && (
                        pagination?.totalPages > 1 && (
                            <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 flex justify-between items-center z-50">
                                <button
                                    disabled={page === 1}
                                    onClick={() => page > 1 && setPage((prev) => prev - 1)}
                                    className="text-sm font-medium disabled:opacity-50"
                                >
                                    ← Prev
                                </button>
                                <span className="text-sm font-semibold">
                                    {pagination?.currentpage} of {pagination?.totalPages}
                                </span>
                                <button
                                    disabled={page === pagination?.totalPages}
                                    onClick={() =>
                                        page < pagination?.totalPages &&
                                        setPage((prev) => prev + 1)
                                    }
                                    className="text-sm font-medium disabled:opacity-50"
                                >
                                    Next →
                                </button>
                            </div>
                        )
                    )
                }
            </div>

        </>
    )
}

export default DiningBookingTable