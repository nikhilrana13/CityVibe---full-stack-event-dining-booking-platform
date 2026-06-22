import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import RestaurantBookHeader from './RestaurantBookHeader';
import slugify from 'slugify';
import RestaurantShimmerHeader from './RestaurantShimmerHeader';
import BookingSuccessDialog from './BookingSuccessDialog';
import { toast } from 'sonner';
import { useDialog } from '../../../context/useDialog';
import { useSelector } from 'react-redux';
import { useCreateDiningBookingMutation, useGetRestaurantDetailsQuery, useGetSlotsQuery } from '@/redux/api/DiningApi';

// generate next 17 days
const getNext17Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 17; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        const dayNum = date.getDate();
        const month = date.toLocaleDateString("en-US", { month: "short" });
        const iso = date.toISOString().split("T")[0]; // actual value
        let label = "";
        if (i === 0) {
            label = `Today, ${dayNum} ${month}`;
        } else if (i === 1) {
            label = `Tomorrow, ${dayNum} ${month}`;
        } else {
            label = `${day}, ${dayNum} ${month}`;
        }

        dates.push({ label, value: iso });
    }
    return dates;
}

const DiningBooking = () => {
    const { id } = useParams()
    const user = useSelector((state) => state.Auth.user)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const date = searchParams.get("date")
    const dates = React.useMemo(() => getNext17Days(), [])
    const [selectedDate, setSelectedDate] = useState(date || dates[0].value)
    // fetch restaurant details
    const resQuery = useGetRestaurantDetailsQuery(id, {
        skip: !id
    })
    const restaurant = resQuery?.data?.data?.restaurant
    const resloading = resQuery?.isLoading
    // fetch slots 
    const slotsQuery = useGetSlotsQuery({
        restaurantId:id,
        date:selectedDate
    }, {
        skip: !id || !selectedDate
    })
    const slots = slotsQuery?.data?.data
    const mealSlots = {
        lunch: slots?.lunchSlots || [],
        dinner: slots?.dinnerSlots || []
    }
    const slotsloading = slotsQuery?.isLoading
    const [activeMeal, setActiveMeal] = useState("lunch");
    const [selectedSlot, setSelectedSlot] = useState("")
    const [guests, setGuests] = useState(1)
    const [showSuccess, setShowSuccess] = useState(false)
    const { setIsLoginOpen, setLoginRedirect } = useDialog()
    const location = useLocation()
    // create booking 
    const [CreateDiningBooking, { isLoading }] = useCreateDiningBookingMutation()
    const [booking, setBooking] = useState({})


    // console.log("restaurant", restaurant)
    const safeSlug = (value) => slugify(value || "", { lower: true, strict: true })
    // console.log("slots", slots)

    const isSlotPast = (time) => {
        if (selectedDate !== dates[0].value) return false
        const now = new Date()
        const [hours, minutes] = time.split(":").map(Number)
        const slotTime = new Date()
        slotTime.setHours(hours, minutes, 0, 0)

        return slotTime < now
    }
    const handleBack = () => {
        if (!restaurant?._id) return
        navigate(`/dining/${safeSlug(restaurant?.city)}/${restaurant?._id}/${safeSlug(restaurant?.name)}`)
    }
    // handle create booking
    const handleDiningBooking = async () => {
        if (!user) {
            //  console.log("setting redirect:", location.pathname + location.search)
            setLoginRedirect(location.pathname + location.search)
            setIsLoginOpen(true)
            return
        }
        try {
            const response = await CreateDiningBooking({
                bookingdate: selectedDate,
                restaurantId: restaurant?._id,
                timeSlot: selectedSlot,
                numberofguests: guests,
            }).unwrap()
            setBooking(response?.data?.booking) 
            setShowSuccess(true) 
        } catch (error) {
            console.error("failed to booking dining", error)
            toast.error(error?.data?.message)
        } 
    }

    return (
        <div className='w-full'>
            {/* header */}
            {
                resloading ? (
                    <RestaurantShimmerHeader />
                ) : restaurant?._id ? (
                    <RestaurantBookHeader restaurant={restaurant} />
                ) : null
            }
            <div className="max-w-6xl mx-auto py-10  mt-20 px-6">
                {/* heading */}
                <div className="flex items-center gap-3 mb-8">
                    <ArrowLeft onClick={handleBack} size={26} className="cursor-pointer" />
                    <h1 className="text-2xl font-semibold">Book a table</h1>
                </div>
                {/* select date and guests */}
                <div className="flex gap-5 mb-10">
                    <div className="border rounded-xl px-5 py-3 w-[280px]">
                        <p className="text-gray-500 text-sm">Date</p>
                        <select value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value), setSelectedSlot("") }}
                            className="font-medium outline-none bg-transparent w-full">
                            {dates.map((d) => (
                                <option key={d.value} value={d.value}>
                                    {d.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="border rounded-xl px-5 py-3 w-[180px]">
                        <p className="text-gray-500 text-sm">No. of guests</p>
                        <select value={guests} onChange={(e) => {
                            const val = Number(e.target.value);
                            setGuests(val)
                        }}
                            className="font-medium outline-none bg-transparent w-full">
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((g) => (
                                <option key={g} value={g}>
                                    {g} {g === 1 ? "guest" : "guests"}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* select slot */}
                <h2 className="text-lg font-semibold mb-4">
                    Select time slot
                </h2>
                {/* meal tabs */}
                <div className="flex gap-3 mb-6">
                    {["lunch", "dinner"].map((meal) => (
                        <button
                            key={meal}
                            onClick={() => { setActiveMeal(meal), setSelectedSlot("") }}
                            className={`px-6 py-2 rounded-full border ${activeMeal === meal
                                ? "border-black bg-gray-100"
                                : "border-gray-300"
                                }`}
                        >
                            {meal.charAt(0).toUpperCase() + meal.slice(1)}
                        </button>
                    ))}
                </div>
                {/* slot grid */}
                {
                    slotsloading ? (
                        <SlotShimmer />
                    ) : mealSlots[activeMeal]?.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {mealSlots[activeMeal]?.map((time) => {
                                const isPast = isSlotPast(time)
                                return (
                                    <button
                                        key={time}
                                        onClick={() => !isPast && setSelectedSlot(time)}
                                        className={`border rounded-xl py-4 text-center transition
                                      ${isPast ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                                                : selectedSlot === time ? "border-black bg-gray-100"
                                                    : "border-gray-300 hover:border-gray-500"
                                            }`}
                                    >
                                        <p className="font-medium">{time}</p>
                                    </button>
                                )
                            })}
                        </div>
                    ) : (
                        <p className='text-center text-[1rem] text-gray-500'>No slots available for this meal</p>
                    )
                }
                {/* terms */}
                <div className="bg-gray-100 rounded-xl p-6 mt-10 text-sm text-gray-600">
                    <h3 className="font-semibold mb-2">
                        Terms & Conditions
                    </h3>
                    <ul className="list-disc ml-4 space-y-1">
                        <li>
                            An internet handling fee will be applied during final bill payment.
                        </li>
                        <li>
                            Table will be held for 15 minutes after the reserved time.
                        </li>
                    </ul>
                </div>
                {/* proceed */}
                <div className="flex justify-end mt-8">
                    <button
                        disabled={!selectedSlot || isLoading}
                        onClick={handleDiningBooking}
                        className="bg-black text-white px-8 py-3 rounded-lg disabled:bg-gray-300"
                    >
                        {isLoading ? "Booking..." : "Proceed to book"}
                    </button>
                </div>
            </div>
            {/* success dialog */}
            <BookingSuccessDialog
                open={showSuccess}
                onClose={() => {
                    setShowSuccess(false)
                    navigate("/bookings")
                }}
                restaurant={restaurant?.name}
                date={booking?.bookingdate}
                time={booking?.timeSlot}
                guests={booking?.numberofguests}
                bookingId={booking?._id?.slice(0, 6)}
            />
        </div>
    );
}
export default DiningBooking;



const SlotShimmer = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="h-[64px] rounded-xl bg-gray-200 animate-pulse"
                />
            ))}
        </div>
    );
};