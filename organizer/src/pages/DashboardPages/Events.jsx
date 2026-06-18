import StatsCard from '@/components/dashboard/StatsCard';
import StatsCardShimmer from '@/components/dashboard/StatsCardShimmer';
import EventsTable from '@/components/event/EventsTable';
import useDebounce from '@/hooks/useDebounce';
import { useGetEventStatsQuery } from '@/redux/api/EventApi';
import { formatIndianNumber } from '@/utils/Helpers';
import React, { useEffect, useState } from 'react';
import { BiTrendingUp } from 'react-icons/bi';
import { FaCalendarDays } from 'react-icons/fa6';
import { LuIndianRupee } from 'react-icons/lu';
import { TiTicket } from 'react-icons/ti';
import { NavLink } from 'react-router-dom';

const Events = () => {
    const statsQuery = useGetEventStatsQuery()
    const stats = statsQuery?.data?.data?.stats || {}
    const [Search, setSearch] = useState("")
    const [isActive, setIsActive] = useState(undefined)
    const debouncedSearch = useDebounce(Search, 500)

    // stats data 
    const statsdata = [
        {
            title: "Total Events",
            value: statsQuery.isError ? "--" : stats?.totalEvents ?? 0,
            icon: FaCalendarDays,
            gradient: "from-[#6a4dff] to-[#8b5cf6]",
        },
        {
            title: "Ticket solds",
            value: statsQuery.isError ? "--" : stats?.totalEvents ?? 0,
            icon: TiTicket,
            gradient: "from-[#0ea5e9] to-[#06b6d4]",
        },
        {
            title: "Revenue",
            value: statsQuery.isError ? "--" : `₹ ${formatIndianNumber(stats?.totalRevenue || 0)}`,
            icon: LuIndianRupee,
            gradient: "from-[#22c55e] to-[#16a34a]",
        },
        {
            title: "Curren Month Revenue",
            value: statsQuery.isError ? "--" : `₹ ${formatIndianNumber(stats?.currentMonthRevenue || 0)}`,
            icon: BiTrendingUp,
            gradient: "from-[#f59e0b] to-[#f97316]",
        },
    ]
    return (
        <div className='w-full'>
            <div className='flex p-5 flex-col gap-5'>
                {/* dashboard header */}
                <div className="flex gap-8 md:items-center flex-col md:flex-row  md:justify-between">
                    <div className="flex flex-col">
                        <span className="text-[1.5rem]  font-bold text-black dark:text-white">
                            Manage Events
                        </span>
                        <span className="text-sm text-gray-500 font-normal">
                            Overview of your current and past urban event listings
                        </span>
                    </div>
                    <div>
                        <NavLink to="/organizer/create-event" className="mt-10  px-10 py-4 rounded-2xl  text-white font-semibold text-sm bg-gradient-to-r  from-[#6a4dff] to-[#8b5cf6] hover:scale-105  hover:shadow-purple-500/50 transition-all duration-300 shadow-lg 
            shadow-purple-600/30">
                            +  Create Event
                        </NavLink>
                    </div>
                </div>
                {/*Events stats card  */}
                {
                    statsQuery?.isLoading ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
                            {[1, 2, 3, 4].map((_, index) => {
                                return (
                                    <StatsCardShimmer key={index} />
                                )
                            })}
                        </div>
                    ) : (
                        <StatsCard statsdata={statsdata} />
                    )
                }
                {/* filters bar */}
                <div className="w-full py-4 px-5 bg-white shadow-md border-gray-300  rounded-lg ">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center  gap-3">
                        {/* search input */}
                        <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='e.g Yo Yo Honey Singh Live Concert' className='px-4 w-full md:w-[500px] border outline-none py-2 placeholder:text-sm rounded-md' />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setIsActive(true)}
                                className={`px-4 py-2 rounded-lg text-sm transition-all ${isActive === true
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                Active
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsActive(false)}
                                className={`px-4 py-2 rounded-lg text-sm transition-all ${isActive === false
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                Inactive
                            </button>
                        </div>
                    </div>
                </div>
                {/* events table */}
                <EventsTable Search={debouncedSearch} isActive={isActive} />
            </div>
        </div>
    );
}

export default Events;
