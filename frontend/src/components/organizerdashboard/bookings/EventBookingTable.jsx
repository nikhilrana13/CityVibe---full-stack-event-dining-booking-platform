import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../ui/select'
import React, { useEffect, useState } from 'react'
import { formatDateRange, formatIndianNumber } from "@/lib/utils";
import axios from 'axios';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../../ui/pagination';
import EventBookingTableShimmer from './EventBookingTabelShimmer';
import MobileEventBookingShimmer from './MobileEventBookingShimmer';

const EventBookingTable = () => {
    const [status, setStatus] = useState("")
    const [events, SetEvents] = useState([])
    const [loading, Setloading] = useState(false)
    const [pagination, SetPagination] = useState({})
    const [page, setPage] = useState(1)

    // fetch events 
    useEffect(() => {
        const fetchEventsBooking = async () => {
            try {
                Setloading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/event/bookings`, {
                    params: {
                        page: page,
                        status: status,
                    }, headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                // console.log("response", response.data)
                if (response.data) {
                    SetEvents(response?.data?.data.eventbookings)
                    SetPagination(response?.data?.data?.pagination)
                }
            } catch (error) {
                console.error("Failed to fetch Events Bookings", error)
            } finally {
                Setloading(false)
            }
        }
        fetchEventsBooking()
    }, [status, page])


    const start = pagination?.currentpage ? (pagination.currentpage - 1) * pagination.limit + 1 : 0;
    const end = Math.min(pagination?.currentpage * pagination?.limit, pagination?.totalbookings)

    return (
        <>
            {/* filters */}
            <div className="w-full py-4 px-5 bg-white shadow-xl border-gray-300  rounded-lg ">
                <div className="flex justify-end  gap-3">
                    <Select onValueChange={(value) => setStatus(value)}>
                        <SelectTrigger className="w-full md:max-w-48">
                            <SelectValue placeholder="Select a Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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
                                    <th className="px-6 py-4 text-left">Event</th>
                                    <th className="px-6 py-4 text-left">User</th>
                                    <th className="px-6 py-4 text-left">Date</th>
                                    <th className="px-6 py-4 text-left">Tickets</th>
                                    <th className="px-6 py-4 text-left">Amount</th>
                                    <th className="px-6 py-4 text-right">Booking Status</th>
                                    <th className="px-6 py-4 text-right"> Payment Status</th>
                                </tr>
                            </thead>
                            {
                                loading ? (
                                    <tbody>
                                        <EventBookingTableShimmer rows={5} />
                                    </tbody>
                                ) : events?.length > 0 ? (
                                    <tbody>
                                        {events?.map((booking) => {
                                            const totalTickets = booking?.tickets?.reduce((sum, item) => sum + item.quantity, 0)
                                            return (
                                                <tr
                                                    key={booking?._id}
                                                    className="border-t hover:bg-gray-50 transition-all duration-200"
                                                >
                                                    {/* Booking Id*/}
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {booking?._id.slice(0, 6) || "NA"}
                                                    </td>
                                                    {/* Event */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    {booking?.event?.title || "NA"}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {booking?.event?.city || "NA"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* User */}
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {booking?.user?.name || "NA"}
                                                    </td>
                                                    {/* Date */}
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {formatDateRange(booking?.event?.startDate)}
                                                    </td>
                                                    {/* Tickets */}
                                                    <td className="px-6 py-4">
                                                        {totalTickets} Tickets
                                                    </td>
                                                    {/* Total amount */}
                                                    <td className="px-6 py-4 text-gray-700">
                                                        ₹{formatIndianNumber(booking?.totalAmount) || "NA"}
                                                    </td>
                                                    {/* booking status */}
                                                    {
                                                        booking?.bookingStatus === "confirmed" && (
                                                            <td className="px-6 py-4">
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                                    confirmed
                                                                </span>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        booking?.bookingStatus === "pending" && (
                                                            <td className="px-6 py-4">
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                                    Pending
                                                                </span>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        booking?.bookingStatus === "cancelled" && (
                                                            <td className="px-6 py-4">
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                                    cancelled
                                                                </span>
                                                            </td>
                                                        )
                                                    }
                                                    {/* payment status */}
                                                    {
                                                        booking?.paymentStatus === "paid" && (
                                                            <td className="px-6 py-4">
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                                    Paid
                                                                </span>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        booking?.paymentStatus === "pending" && (
                                                            <td className="px-6 py-4">
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                                    Pending
                                                                </span>
                                                            </td>
                                                        )
                                                    }
                                                    {
                                                        booking?.paymentStatus === "failed" && (
                                                            <td className="px-6 py-4">
                                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                                    Failed
                                                                </span>
                                                            </td>
                                                        )
                                                    }
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan="7" className="text-center py-10 text-gray-500">
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
                                    <div>
                                        <Pagination className="flex gap-2">
                                            <PaginationContent>
                                                <PaginationItem
                                                    className={`${page === 1
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : "cursor-pointer"
                                                        }  `}
                                                >
                                                    <PaginationPrevious
                                                        onClick={() => {
                                                            if (page > 1) {
                                                                setPage((prev) => prev - 1);
                                                            }
                                                        }}
                                                    />
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink className="p-3">
                                                        {pagination?.currentpage} of {pagination?.totalPages}
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem
                                                    className={`${page === pagination.totalPages
                                                        ? "opacity-50 cursor-not-allowed"
                                                        : " cursor-pointer"
                                                        }  `}
                                                >
                                                    <PaginationNext
                                                        onClick={() => {
                                                            if (page < pagination?.totalPages) {
                                                                return setPage((prev) => prev + 1);
                                                            }
                                                        }}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
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
                            <MobileEventBookingShimmer rows={3}  />
                        </div>
                    ) : events?.length > 0 ? (
                        events.map((booking) => {
                            const totalTickets = booking?.tickets?.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                            )
                            return (
                                <div
                                    key={booking?._id}
                                    className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex flex-col gap-4 transition hover:shadow-lg"
                                >
                                    {/* Top Row */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                #{booking?._id?.slice(0, 6)}
                                            </p>
                                            <h3 className="font-semibold text-gray-900 text-sm mt-1">
                                                {booking?.event?.title || "NA"}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {booking?.event?.city || "NA"}
                                            </p>
                                        </div>

                                        {/* Booking Status */}
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
                                            <p className="text-gray-400 text-xs">User</p>
                                            <p className="font-medium text-gray-800">
                                                {booking?.user?.name || "NA"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-400 text-xs">Date</p>
                                            <p className="font-medium text-gray-800">
                                                {formatDateRange(booking?.event?.startDate)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-400 text-xs">Tickets</p>
                                            <p className="font-medium text-gray-800">
                                                {totalTickets} Tickets
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-400 text-xs">Amount</p>
                                            <p className="font-semibold text-gray-900">
                                                ₹{formatIndianNumber(booking?.totalAmount)}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Payment Status */}
                                    <div className="flex justify-between items-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${booking?.paymentStatus === "paid"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : booking?.paymentStatus === "pending"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-rose-100 text-rose-700"
                                                }`}
                                        >
                                            {booking?.paymentStatus}
                                        </span>
                                    </div>
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

export default EventBookingTable