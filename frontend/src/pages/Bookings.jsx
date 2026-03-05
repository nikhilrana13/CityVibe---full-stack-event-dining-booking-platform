import { useNavigate } from 'react-router-dom';
import BookNavbar from '../components/pages/EventPage/BookNavbar';
import React, { useEffect, useRef, useState } from 'react';
import BookingCard from '../components/common/BookingCard';
import { formatDateRange, formatTime } from '../lib/utils';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import BookingCardShimmer from '../components/common/BookingCardShimmer';
import NoBookingFallback from '../components/common/NoBookingFallback';

const Bookings = () => {
    const navigate = useNavigate()
    const [type, setType] = useState("dining")
    const [loading, setLoading] = useState(true)
    const [bookings, setbookings] = useState([])
    const [isFetchingMore, setIsFetchingMore] = useState(false)
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({})
    const loaderRef = useRef()
    const scrollRef = useRef()

    // fetch bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (page === 1) {
                    setLoading(true)
                } else {
                    setIsFetchingMore(true)
                }
                const url = type === "events" ? "/api/event/userbookings" : "/api/restaurant/userbookings"
                const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}${url}?page=${page}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                await delay(1200) // for fake delay testing
                if (response.data) {
                    const newBookings = response?.data?.data?.bookings || []
                    const newPagination = response?.data?.data?.pagination || {}
                    // replace on first page and append on next pages 
                    setbookings(prev => page === 1 ? newBookings : [...prev, ...newBookings])
                    setPagination(newPagination)
                }
            } catch (error) {
                console.error('failed to get bookings', error)
            } finally {
                setLoading(false)
                setIsFetchingMore(false)
            }
        }
        fetchBookings()
    }, [type, page])
    // Infinite Scroll Observer Loads next page when bottom loader comes into viewport
    useEffect(() => {
        const hasNextPage = pagination?.currentpage && pagination?.totalPages && pagination.currentpage < pagination.totalPages
        if (!hasNextPage || isFetchingMore || loading) return
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !isFetchingMore) {
                    //   console.log("Loading next page...")
                    setPage(prev => prev + 1)
                }
            },
            { root: scrollRef.current, rootMargin: "150px" } // smoother trigger before reaching exact bottom
        )
        const current = loaderRef.current
        if (current) observer.observe(current)
        return () => {
            observer.disconnect()
        }
    }, [pagination?.currentpage, pagination?.totalPages, isFetchingMore, loading])
    // console.log("bookings", bookings)
    // console.log("pagination", pagination)
    return (
        <div className='w-full'>
            <BookNavbar title={"Review your bookings"} handleBack={() => navigate("/")} showBack />
            <section className='bg-[#F9F9FA] min-h-screen w-full'>
                <div className='flex flex-col w-full md:max-w-2xl  mx-auto p-5 justify-center items-center  space-y-8'>
                    {/* tabs */}
                    <div className='bg-[#E5E7EB] relative rounded-full py-1 w-fit mx-auto'>
                        {/* sliding indicator */}
                        <div className={`absolute top-1 bottom-1 w-[50%] bg-black rounded-full transition-all duration-300 ease-out ${type === "dining" ? "left-1" : "left-[50%]"}`} />
                        <div className="relative flex items-center">
                            <button onClick={() => { setType("dining"), setPage(1), setbookings([]) }} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${type === "dining" ? "text-white" : "text-gray-700"}`}>
                                Dining
                            </button>
                            <button onClick={() => { setType("events"), setPage(1), setbookings([]) }} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${type === "events" ? "text-white" : "text-gray-700"}`}>
                                Events
                            </button>
                        </div>
                    </div>
                    {/* cards */}
                    <div ref={scrollRef} className='flex flex-col md:px-5 w-full place-items-center h-[90vh] overflow-y-auto space-y-5 '>
                        {
                            loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <BookingCardShimmer key={i} />
                                ))
                            ) : bookings?.length > 0 ? (
                                bookings?.map((booking) => {
                                    return (
                                        <BookingCard key={booking?._id}
                                            title={(booking?.event?.title || booking?.restaurant?.name)}
                                            subtitle={`${booking?.tickets?.length || booking?.numberofguests} ${type === "events" ? "Tickets" : "Guests"}`}
                                            date={(formatDateRange(booking?.bookingdate) || formatDateRange(booking?.event?.startDate))}
                                            time={(formatTime(booking?.event?.starttime) || formatTime(booking?.timeSlot))}
                                            location={(booking?.event?.location) || booking?.restaurant?.location}
                                            image={(booking?.event?.coverimage) || booking?.restaurant?.images?.[0]}
                                            status={booking?.bookingStatus}
                                            onClick={() => navigate(`/booking/${type}/${booking?._id}`)}
                                        />
                                    )
                                })
                            ) : (
                               <NoBookingFallback type={type} onExplore={() => 
                                navigate(type === "events" ? "/events" : "/dining")} />
                            )}
                        {/* Infinite Scroll Loader */}
                        {pagination?.totalPages && pagination?.currentpage < pagination?.totalPages && (
                            <div ref={loaderRef} className="h-20 flex justify-center items-center">
                                {isFetchingMore ? (
                                    <div className="flex gap-2">
                                        <Loader2 className='text-black w-8 h-8 animate-spin' />
                                    </div>
                                ) : (
                                    <span className='text-sm text-gray-400'>Scroll for more bookings</span>
                                )
                                }
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Bookings;
