import { useCancelEventMutation, useDeleteEventMutation, useGetOrganizerEventsQuery } from '@/redux/api/EventApi';
import React, { useEffect, useState } from 'react';
import EventsTableShimmer from './EventsTableShimmer';
import { formatDateRange } from '@/utils/Helpers';
import { CgMoreVertical } from 'react-icons/cg';
import MobileEventsCardShimmer from './MobileEventsCardShimmer';
import { MdLocationOn } from 'react-icons/md';
import { FaClock } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const EventsTable = ({ Search, isActive }) => {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError } = useGetOrganizerEventsQuery({
        page,
        limit: 5,
        title: Search,
        eventIsActive: isActive
    })
    const events = data?.data?.events || []
    const pagination = data?.data?.pagination || {}
    const [actionId, setActionId] = useState(null);
    const [actionType, setActionType] = useState(null)
    const [CancelEvent, { isLoading: isCanceling }] = useCancelEventMutation()
    const [DeleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation()

    useEffect(() => {
        setPage(1);
    }, [Search, isActive]);

    // handle cancel event 
    const handleCancelEvent = async (eventId) => {
        try {
            setActionId(eventId)
            setActionType("cancel")
            const res = await CancelEvent(eventId).unwrap()
            toast.success(res?.message)
        } catch (error) {
            console.error("failed to cancel event", error)
            toast.error(error?.data?.message || "Internal server error")
        } finally {
            setActionId(null)
            setActionType(null)
        }
    }
    // handle delete event 
    const handleDeleteEvent = async (eventId) => {
        try {
            setActionId(eventId)
            setActionType("delete")
            const res = await DeleteEvent(eventId).unwrap()
            toast.success(res?.message)
        } catch (error) {
            console.error("failed to delete event", error)
            toast.error(error?.data?.message || "Internal server error")
        } finally {
            setActionId(null)
            setActionType(null)
        }
    }
    const start = pagination?.currentPage ? (pagination.currentPage - 1) * pagination.limit + 1 : 0;
    const end = Math.min(pagination?.currentPage * pagination?.limit, pagination?.totalevents)
    return (
        <div className="w-full pb-20 xl:pb-0">
            {/* desktop table */}
            <div className="hidden xl:block bg-white rounded-2xl shadow-sm border overflow-hidden">
                <div className='overflow-x-auto custom-scrollbar'>
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 text-left">Event</th>
                                <th className="px-6 py-4 text-left">Date</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Tickets</th>
                                <th className="px-6 py-4 text-left">Start Time</th>
                                <th className="px-6 py-4 text-left">Category</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        {
                            isLoading ? (
                                <tbody>
                                    <EventsTableShimmer />
                                </tbody>
                            ) : events?.length > 0 ? (
                                <tbody>
                                    {events?.map((event) => (
                                        <tr
                                            key={event?._id}
                                            className="border-t hover:bg-gray-50 transition-all duration-200"
                                        >
                                            {/* Event */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={event?.coverimage}
                                                        alt=""
                                                        className="w-14 h-14 rounded-xl object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {event?.title || "NA"}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {event?.location || "NA"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-4 truncate text-gray-700">
                                                {formatDateRange(event?.startDate, event?.endDate)}
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${event.eventIsActive === true ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {event?.eventIsActive === true ? "Active" : "Inactive"}
                                                </span>
                                            </td>

                                            {/* Tickets */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-gray-900 font-medium">
                                                        {event?.availableSeats || 0} / {event?.totalSeats}
                                                    </span>
                                                    <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-purple-600 rounded-full transition-all duration-500"
                                                            style={{
                                                                width: `${event?.totalSeats
                                                                    ? (event.availableSeats / event.totalSeats) * 100
                                                                    : 0
                                                                    }%`
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            {/* start time */}
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {event?.starttime || "NA"}
                                            </td>
                                            {/* category */}
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {event?.category || "NA"}
                                            </td>
                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="relative group inline-block text-left">
                                                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                                                        <CgMoreVertical size={18} />
                                                    </button>
                                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                                                        <div className="flex flex-col text-sm">
                                                            {event?.eventIsActive === true && (
                                                                <button
                                                                    disabled={actionId === event?._id || isCanceling}
                                                                    onClick={() => handleCancelEvent(event?._id)}
                                                                    className="px-4 py-2 hover:bg-gray-50 flex items-center justify-center"
                                                                >
                                                                    {actionId === event?._id && actionType === "cancel" ? (
                                                                        <div className="w-4 h-4 border-2 border-yellow-400 border-t-yellow-600 rounded-full animate-spin" />
                                                                    ) : (
                                                                        "Cancel"
                                                                    )}
                                                                </button>
                                                            )}

                                                            <button
                                                                disabled={actionId === event?._id || isDeleting}
                                                                onClick={() => handleDeleteEvent(event?._id)}
                                                                className="px-4 py-2 hover:bg-red-50 text-red-600 flex items-center justify-center"
                                                            >
                                                                {actionId === event?._id && actionType === "delete" ? (
                                                                    <div className="w-4 h-4 border-2 border-red-400 border-t-red-600 rounded-full animate-spin" />
                                                                ) : (
                                                                    "Delete"
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : isError ? (
                                <tbody>
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-red-500">
                                            Error loading Events . Please try again.
                                        </td>
                                    </tr>
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="7" className="text-center text-gray-400 py-4">
                                            No Events found
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
                {/* pagination */}
                {
                    !isLoading && (
                        pagination?.totalPages > 1 && (
                            <div className="w-full bg-[#f8f9fc] dark:bg-[#101322] border-t-[#cfd3e7] dark:border-t-[#2a2d3d] py-4 px-6 items-center  border-t flex justify-between">
                                <div className='flex items-center gap-2'>
                                    <span className="text-[#747474] text-[0.9rem] sm:text-[0.8rem] font-[600]">
                                        Showing {start || "NA"}-{end || "NA"} of{" "}
                                        {pagination?.totalevents || 0} events
                                    </span>
                                </div>
                                {/* page button */}
                                <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
                                    {/* Prev */}
                                    <button
                                        onClick={() => page > 1 && setPage((prev) => prev - 1)}
                                        disabled={page === 1}
                                        className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-xl font-medium bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6]text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 transition-all duration-300">
                                        ←
                                        <span className="hidden sm:inline ml-1">Prev</span>
                                    </button>

                                    {/* Page Info */}
                                    <span className="text-[#3d4a3d] text-xs sm:text-sm font-semibold">
                                        {pagination?.currentPage} / {pagination?.totalPages}
                                    </span>
                                    {/* Next */}
                                    <button
                                        onClick={() =>
                                            page < pagination?.totalPages && setPage((prev) => prev + 1)
                                        }
                                        disabled={page === pagination?.totalPages}
                                        className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-xl font-medium bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6]text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 transition-all duration-300"
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
                {
                    isLoading ? (
                        <div className='flex flex-col gap-4'>
                            <MobileEventsCardShimmer />
                        </div>
                    ) : events?.length > 0 ? (
                        events?.map((event) => (
                            <div
                                key={event._id}
                                className="bg-white rounded-2xl shadow-sm border overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src={event?.coverimage}
                                        alt=""
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                </div>

                                <div className="p-4 flex flex-col gap-3">

                                    <div className="flex justify-between items-start">
                                        <div className='flex flex-col gap-1'>
                                            <h3 className="font-semibold text-gray-900">
                                                {event.title}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {formatDateRange(event?.startDate, event?.endDate)}
                                            </p>
                                            <p className="text-xs flex items-center gap-2 text-gray-500">
                                                <MdLocationOn /> {event?.location || "NA"}
                                            </p>
                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${event.eventIsActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {event.eventIsActive ? "Active" : "Inactive"}
                                        </span>
                                    </div>

                                    {/* Tickets */}
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Tickets</span>
                                            <span>
                                                {event?.availableSeats || 0} / {event?.totalSeats}
                                            </span>
                                        </div>

                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${event?.totalSeats
                                                        ? (event.availableSeats / event.totalSeats) * 100
                                                        : 0
                                                        }%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* Extra Info Row */}
                                    <div className="flex justify-between text-sm">
                                        <span className="flex gap-2 items-center text-gray-600">
                                            <FaClock /> {event?.starttime || "NA"}
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            {event?.category || "NA"}
                                        </span>
                                    </div>
                                    <div className={`${event?.eventIsActive === true ? "grid grid-cols-2" : "flex"} gap-2`}>

                                        <button
                                            disabled={actionId === event?._id || isDeleting}
                                            onClick={() => handleDeleteEvent(event?._id)}
                                            className="flex-1 py-2 rounded-xl border bg-red-100 text-red-600 text-sm hover:opacity-90 transition flex items-center justify-center"
                                        >
                                            {actionId === event?._id && actionType === "delete" ? (
                                                <div className="w-4 h-4 border-2 border-red-400 border-t-red-600 rounded-full animate-spin" />
                                            ) : (
                                                "Delete"
                                            )}
                                        </button>

                                        {event?.eventIsActive === true && (
                                            <button
                                                disabled={actionId === event?._id || isCanceling}
                                                onClick={() => handleCancelEvent(event?._id)}
                                                className="flex-1 py-2 rounded-xl bg-yellow-100 text-yellow-700 text-sm hover:opacity-90 transition flex items-center justify-center"
                                            >
                                                {actionId === event?._id && actionType === "cancel" ? (
                                                    <div className="w-4 h-4 border-2 border-yellow-400 border-t-yellow-600 rounded-full animate-spin" />
                                                ) : (
                                                    "Cancel"
                                                )}
                                            </button>
                                        )}

                                    </div>
                                </div>
                            </div>
                        ))
                    ) : isError ? (
                        <div className="text-center py-10 text-red-500">
                            Error loading Events.Please try again
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            No events found
                        </div>
                    )
                }
            </div>
            {/*mobile pagination */}
            {
                !isLoading && (
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
                                {pagination?.currentPage} of {pagination?.totalPages}
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
                    ))
            }
        </div >
    );
}

export default EventsTable;
