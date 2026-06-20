import React, { useState } from 'react';
import { LuMapPin } from 'react-icons/lu';
import ResImagesGallery from './ResImagesGallery';

import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { formatTime } from '@/utils/Helpers';




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

const RestaurantDetailCard = ({ restaurant }) => {
    const dates = getNext17Days()
    const [selectedDate, setSelectedDate] = useState(dates[0].value)
    const [guests, setGuests] = useState(1)
    // console.log("restaurant", restaurant)
    const guestscount = Array.from({ length: 20 }, (_, i) => i + 1)
    const navigate = useNavigate()
    const safeSlug = (value) => slugify(value || "", { lower: true, strict: true })

    const handleBooking = () => {
        const date = new Date(selectedDate)
        const formattedDate = date.toISOString().split("T")[0];
        navigate(`/dining/${safeSlug(restaurant?.city)}/${restaurant?._id}/${safeSlug(restaurant?.name)}/book?date=${formattedDate}&guests=${guests}`)
    }

    return (
        <>
            <div className='space-y-5 pb-15 lg:pb-0'>
                <div className='flex flex-col'>
                    <h5 className='text-[0.9rem] truncate tracking-tight font-[400]'>
                        <span className='text-gray-500 capitalize'>{restaurant?.city}</span>  /   {restaurant?.name}
                    </h5>
                </div>
                {/* images gallery */}
                <div className='w-full overflow-hidden relative rounded-2xl'>
                    <ResImagesGallery images={restaurant?.images} />
                </div>
                <div className='flex flex-col md:flex-row gap-10 py-5'>
                    {/* LEFT SIDE */}
                    <div className='w-full  lg:w-[65%]'>
                        <h3 className='text-[2.5rem] font-[500]'>{restaurant?.name}</h3>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center gap-1'>
                                <span className='text-[#545459] font-[500] text-[0.9rem]'>₹{restaurant?.averagePrice} for two</span> |
                                <span className='text-[#545459] font-[500] text-[0.9rem]'>
                                    <span className='text-green-600 font-[500] text-[0.9rem]'>Open</span> • {formatTime(restaurant?.openingTime)} to {formatTime(restaurant?.closingTime)}
                                </span>
                            </div>
                            <div className='flex gap-3'>
                                <LuMapPin size={20} />
                                <span className='text-[#545459] font-[500] text-[0.9rem]'>
                                    {restaurant?.address}, <span className='capitalize'>{restaurant?.city}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT SIDE BOOKING CARD */}
                    <div className='w-full lg:w-[35%]'>
                        <div className='border space-y-4 py-6 px-7 w-full rounded-xl sticky top-24 bg-white shadow-sm'>
                            <h3 className='text-[1.3rem] font-[500]'>Book a Table</h3>
                            <div className='flex gap-3'>
                                <div className='flex flex-col w-full gap-2'>
                                    <span className='text-[1rem] text-gray-500'>Date</span>
                                    <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className='border w-full font-[500] rounded-md px-3 py-3'>
                                        {dates.map((date, index) => (
                                            <option key={index} value={date.value}>
                                                {date.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                    <span className='text-[1rem] text-gray-500'>Guests</span>
                                    <select value={guests} onChange={(e) => setGuests(e.target.value)} className='border font-[500] rounded-md px-3 py-3'>
                                        {guestscount.map((g) => (
                                            <option key={g} value={g}>
                                                {g} {g === 1 ? "Guest" : "Guests"}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button onClick={handleBooking} className='px-3 py-3 bg-black font-[500] text-white w-full rounded-md hover:bg-gray-900 transition'>
                                Book a table
                            </button>
                        </div>
                    </div>
                </div>
                {/* about  */}
                <div className='flex flex-col  w-full md:w-[50%] lg:w-[65%] space-y-5'>
                    <h3 className='text-[1.4rem] font-[500]'>About the restaurant</h3>
                    {/* description */}
                    <p className='text-[0.9rem] leading-8  md:max-w-2xl text-gray-600'>{restaurant?.description}</p>
                    <div className='flex flex-col gap-1'>
                        <span className='text-[1rem] font-[500]'>Cost</span>
                        <span className='text-[#545459] font-[500] text-[1rem]'>₹{restaurant?.averagePrice} for two</span>
                    </div>
                    {
                        restaurant?.cuisine && (
                            <div className='flex flex-col gap-2'>
                                <span className='text-[1rem] font-[500]'>Cuisine</span>
                                <div className='text-[#545459] flex flex-wrap gap-3 font-[500] text-[1rem]'>
                                    {restaurant?.cuisine?.map((item, i) => (
                                        <span key={i} className="px-3 py-1 truncate text-xs rounded-full bg-indigo-500/20 text-indigo-600">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    {
                        restaurant?.availablefacility && (
                            <div className="flex flex-col gap-2">
                                <span className='text-[1rem] font-[500]'>Available Facility</span>
                                <div className='flex flex-wrap overflow-y-auto items-center gap-3'>
                                    {restaurant?.availablefacility?.map((item, i) => (
                                        <span key={i} className="px-3 py-1 truncate text-xs rounded-full bg-purple-500/20 text-purple-600">
                                            {item}
                                        </span>
                                    ))}
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
        </>

    );
}

export default RestaurantDetailCard;
