import { useNavigate } from 'react-router-dom';
import BookNavbar from '../components/pages/EventPage/BookNavbar';
import React, { useEffect, useRef, useState } from 'react';
import BookingCard from '../components/bookings/BookingCard';
import { Loader2 } from 'lucide-react';
import BookingCardShimmer from '../components/bookings/BookingCardShimmer';
import NoBookingFallback from '../components/bookings/NoBookingFallback';
import { formatDateRange, formatTime } from '@/utils/Helpers';
import { useGetUserDiningBookingsQuery, useGetUserEventBookingsQuery } from '@/redux/api/BookingApi';

const Bookings = () => {
    const navigate = useNavigate()
    const [type, setType] = useState("dining")
    const [allbookings, setAllBookings] = useState([])
    const [page, setPage] = useState(1)
    const EventBookingQuery = useGetUserEventBookingsQuery(page, {
        skip: type !== "events"
    })
    const DiningBookingQuery = useGetUserDiningBookingsQuery(page, {
        skip: type !== "dining"
    })
    const bookingQuery = type === "events" ? EventBookingQuery : DiningBookingQuery
    const bookings = bookingQuery?.data?.data?.bookings || []
    const pagination = bookingQuery?.data?.data?.pagination
    const isFetchingMore = bookingQuery.isFetching && page > 1;
    const initialLoading = !bookingQuery.data && (bookingQuery.isLoading || bookingQuery.isFetching) && page === 1;
    const showNoBookings = bookingQuery.isSuccess && !bookingQuery.isFetching && !initialLoading && page === 1 && bookings.length === 0
    const showShimmer = page === 1 && (bookingQuery.isLoading || bookingQuery.isFetching);
    const loaderRef = useRef()
    const scrollRef = useRef()
    const displayedBookings = page === 1 ? bookings : allbookings;


    // Append paginated bookings to local state
    useEffect(() => {
        if (!bookings.length) return;
        // if (page === 1) {
        //     setAllBookings(bookings);
        //     return;
        // }
        setAllBookings(prev => {
            // First page replaces existing bookings
            if (page === 1) return bookings;
            const merged = [...prev, ...bookings];
            // Prevent duplicate events during pagination/refetches
            return merged.filter(
                (booking, index, self) =>
                    index === self.findIndex(
                        b => b._id === booking._id
                    )
            );
        });
    }, [page, bookings]);

    useEffect(() => {
        setPage(1);
    }, [type]);
  
  // Infinite Scroll Observer Loads next page when bottom loader comes into viewport
    useEffect(() => {
        const hasNextPage = pagination?.currentpage < pagination?.totalPages
        if (!hasNextPage || isFetchingMore) return
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
    }, [pagination?.currentpage, pagination?.totalPages, isFetchingMore, allbookings.length])
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
                            <button onClick={() => setType("dining")} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${type === "dining" ? "text-white" : "text-gray-700"}`}>
                                Dining
                            </button>
                            <button onClick={() => setType("events")} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${type === "events" ? "text-white" : "text-gray-700"}`}>
                                Events
                            </button>
                        </div>
                    </div>
                    {/* cards */}
                    <div ref={scrollRef} className='flex flex-col md:px-5 w-full place-items-center h-[90vh] overflow-y-auto space-y-5 '>
                        {
                            showShimmer ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <BookingCardShimmer key={i} />
                                ))
                            ) : displayedBookings?.length > 0 ? (
                                displayedBookings?.map((booking) => {
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
                            ) : showNoBookings ? (
                                <NoBookingFallback type={type} onExplore={() =>
                                    navigate(type === "events" ? "/events" : "/dining")} />
                            ) : null
                        }
                        {/* Infinite Scroll Loader */}
                        {pagination?.totalPages && pagination?.currentpage < pagination?.totalPages && (
                            <div ref={loaderRef} className="h-40 flex justify-center items-center">
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
