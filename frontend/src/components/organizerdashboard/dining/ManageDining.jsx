import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import StatsCardShimmer from '../StatsCardShimmer'
import StatsCard from '../StatsCard'
import { CalendarDays, IndianRupee, Ticket } from 'lucide-react'
import { MdCancel } from 'react-icons/md'
import axios from 'axios'
import RestaurantOverviewCard from './RestaurantOverviewCard'
import GallerySection from './GallerySection'
import ServiceTimingCard from './ServiceTimingCard'
import AddRestaurantEmptyState from './AddRestaurantEmptyState'

const ManageDining = () => {
    const [statsloading, setStatsloading] = useState(false)
    const [resloading, setResloading] = useState(false)
    const [restaurant, setRestaurant] = useState({})
    const [stats, SetStats] = useState({
        totalbookings: 0,
        confirmedbookings: 0,
        cancelledbookings: 0,
        thisMonthbookings: 0
    })
    // fetch event stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                setStatsloading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/organizer/diningmanagement/stats`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                // console.log("response",response.data)
                if (response.data) {
                    const totalbookings = response?.data?.data?.totalbookings;
                    const confirmedbookings = response?.data?.data?.confirmedbookings;
                    const cancelledbookings = response?.data?.data?.cancelledbookings;
                    const thisMonthbookings = response?.data?.data?.thisMonthbookings;
                    SetStats((prev) => ({
                        ...prev,
                        totalbookings,
                        confirmedbookings,
                        cancelledbookings,
                        thisMonthbookings
                    }));
                }
            } catch (error) {
                console.error("failed to get dashboard stats", error)
            } finally {
                setStatsloading(false)
            }
        }
        fetchStats()
    }, [])
    // stats data 
    const statsdata = [
        {
            title: "Total bookings",
            value: stats.totalbookings || 0,
            icon: CalendarDays,
            gradient: "from-[#6a4dff] to-[#8b5cf6]",
        },
        {
            title: "Confirmed bookings",
            value: stats.confirmedbookings || 0,
            icon: Ticket,
            gradient: "from-[#22c55e] to-[#16a34a]",
        },
        {
            title: "Cancel Booking",
            value: stats.cancelledbookings,
            icon: MdCancel,
            gradient: "from-[#FF0000] to-[#FF0000]",
        },
        {
            title: "This Month bookings",
            value: stats.thisMonthbookings,
            icon: CalendarDays,
            gradient: "from-[#6a4dff] to-[#8b5cf6]",
        },
    ]
    // fetch organizer restaurant 
    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                setResloading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dining/organizer/restaurant`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data) {
                    setRestaurant(response?.data?.data?.restaurant)
                }
            } catch (error) {
                console.error("Failed to fetch restaurant", error)
            } finally {
                setResloading(false)
            }
        }
        fetchRestaurant()
    }, [])
    // console.log("restaurant", restaurant)
    return (
        <div className='w-full'>
            <div className='flex px-3 py-4 flex-col gap-5'>
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
                    statsloading ? (
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
                {resloading ? (
                    <div className="h-40 bg-white/5 rounded-2xl animate-pulse" />
                ) : !restaurant?._id ? (
                    <AddRestaurantEmptyState />
                ) : (
                    <>
                        <RestaurantOverviewCard restaurant={restaurant} setRestaurant={setRestaurant} />
                        <GallerySection restaurantimages={restaurant?.images} />
                        <ServiceTimingCard restaurant={restaurant} />
                    </>
                )}
            </div>
        </div>
    )
}

export default ManageDining