import StatsCard from '@/components/dashboard/StatsCard';
import StatsCardShimmer from '@/components/dashboard/StatsCardShimmer';
import AddRestaurantEmptyState from '@/components/dining/AddRestaurantEmptyState';
import GallerySection from '@/components/dining/GallerySection';
import RestaurantOverviewCard from '@/components/dining/RestaurantOverViewCard';
import ServiceTimingCard from '@/components/dining/ServiceTimingCard';
import { useGetDiningStatsQuery, useGetOrganizerRestaurantDetailsQuery } from '@/redux/api/DiningApi';
import React from 'react';
import { FaCalendarDays } from 'react-icons/fa6';
import { MdOutlineCancel } from 'react-icons/md';
import { TiTicket } from 'react-icons/ti';
import { NavLink } from 'react-router-dom';

const Dining = () => {
    const statsQuery = useGetDiningStatsQuery()
    const stats = statsQuery?.data?.data?.stats || {} 
    const resQuery = useGetOrganizerRestaurantDetailsQuery()
    const restaurant = resQuery?.data?.data?.restaurant ?? {}
    // stats data 
    const statsdata = [
        {
            title: "Total bookings",
            value: statsQuery.isError ? "--" : stats?.totalbookings ?? 0,
            icon: FaCalendarDays,
            gradient: "from-[#6a4dff] to-[#8b5cf6]",
        },
        {
            title: "Confirmed bookings",
            value: statsQuery.isError ? "--" : stats?.confirmedbookings ?? 0,
            icon: TiTicket,
            gradient: "from-[#22c55e] to-[#16a34a]",
        },
        {
            title: "Cancel Booking",
            value:  statsQuery.isError ? "--" : stats?.cancelbookings ?? 0,
            icon: MdOutlineCancel,
            gradient: "from-[#FF0000] to-[#FF0000]",
        },
        {
            title: "This Month bookings",
            value: statsQuery.isError ? "--" : stats?.thisMonthbookings ?? 0,
            icon: FaCalendarDays,
            gradient: "from-[#6a4dff] to-[#8b5cf6]",
        },
    ]
  return (
     <div className='w-full p-5'>
            <div className='flex flex-col gap-5'>
                {/* dashboard header */}
                <div className="flex gap-8 md:items-center flex-col md:flex-row  md:justify-between">
                    <div className="flex flex-col">
                        <span className="text-[1.5rem]  font-bold text-black dark:text-white">
                            Manage Dining
                        </span>
                        <span className="text-sm text-gray-500 font-normal">
                            Manage your restaurant profile, menu and bookings.
                        </span>
                    </div>
                    <div>
                        <NavLink
                            to={restaurant?._id ? `/organizer/edit-restaurant/${restaurant?._id}` : "/organizer/add-restaurant"}
                            className="mt-10 px-10 py-4 rounded-2xl text-white font-semibold text-sm 
                           bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6] hover:scale-105 
                             hover:shadow-purple-500/50 transition-all duration-300 shadow-lg shadow-purple-600/30"
                        >
                            {restaurant?._id ? "Edit Restaurant" : "+ Add Restaurant"}
                        </NavLink>
                    </div>
                </div>
                {/*dining stats card  */}
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
                {resQuery?.isLoading ? (
                    <div className="h-40 bg-white/5 rounded-2xl animate-pulse" />
                ) : !restaurant?._id ? (
                    <AddRestaurantEmptyState />
                ) : (
                    <>
                        <RestaurantOverviewCard restaurant={restaurant}/>
                        <GallerySection restaurantimages={restaurant?.images} />
                        <ServiceTimingCard restaurant={restaurant} />
                    </>
                )}
            </div>
        </div>
  );
}

export default Dining;
