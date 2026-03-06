import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import RestaurantBookHeader from './RestaurantBookHeader';
import slugify from 'slugify';
import RestaurantShimmerHeader from './RestaurantShimmerHeader';
import BookingSuccessDialog from './BookingSuccessDialog';

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
    const navigate = useNavigate()
    const [loadSlots, setLoadSlots] = useState(true)
    const [restaurant, setRestaurant] = useState({})
    const [loadres, setLoadres] = useState(true)
    const [activeMeal, setActiveMeal] = useState("lunch");
    const [slots, setSlots] = useState({})
    const [selectedSlot, setSelectedSlot] = useState("")
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const date = searchParams.get("date")
    const dates = React.useMemo(() => getNext17Days(), [])
    const [selectedDate, setSelectedDate] = useState(date || dates[0].value)
    const [guests, setGuests] = useState(1)
    const [showSuccess, setShowSuccess] = useState(false)
    // console.log("restaurant", restaurant)
    const safeSlug = (value) => slugify(value || "", { lower: true, strict: true })

    //fetch restaurant details
    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                setLoadres(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dining/restaurant/details/${id}`)
                if (response.data) {
                    const resData = response?.data?.data?.restaurant
                    setRestaurant(resData)
                }
            } catch (error) {
                console.error("failed to get Restaurant details", error)
            } finally {
                setLoadres(false)
            }
        }
        fetchRestaurantDetails()
    }, [id])
    //fetch slots
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                setLoadSlots(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/slots`, {
                    params: {
                        restaurantId: id,
                        date: selectedDate
                    }, headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data) {
                    setSlots(response?.data?.data)
                }
            } catch (error) {
                console.error("failed to get slots", error)
            } finally {
                setLoadSlots(false)
            }
        }
        fetchSlots()
    }, [id, selectedDate])
    // console.log("slots", slots)
    const mealSlots = {
        lunch: slots?.lunchSlots || [],
        dinner: slots?.dinnerSlots || []
    }
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


    return (
        <div className='w-full'>
            {/* header */}
            {
                loadres ? (
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
                    loadSlots ? (
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
                        disabled={!selectedSlot}
                        onClick={() => setShowSuccess(true)}
                        className="bg-black text-white px-8 py-3 rounded-lg disabled:bg-gray-300"
                    >
                        Proceed to book
                    </button>
                </div>
            </div>
            {/* success dialog */}
            <BookingSuccessDialog
                open={showSuccess}
                restaurant={restaurant?.name}
                date={selectedDate}
                time={selectedSlot}
                guests={guests}
                bookingId={"124"}
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