import React, { useEffect, useState } from 'react'
import StatsCardShimmer from '../StatsCardShimmer'
import StatsCard from '../StatsCard'
import axios from 'axios'
import { CalendarDays, Ticket, TrendingUp } from 'lucide-react'
import BookingTabs from './BookingTabs'
import { MdCancel, MdOutlinePendingActions } from 'react-icons/md'
import EventBookingTable from './EventBookingTable'
import DiningBookingTable from './DiningBookingTable'

const ManageBookings = () => {
    const [activeTab,setActiveTab] = useState("events")
    const [statsloading, setStatsloading] = useState(false)
    const [stats, SetStats] = useState({
        totalBookings: 0,
        confirmedBookings: 0,
        cancelledBookings: 0,
        pendingBookings: 0,
      })

     // fetch event stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsloading(true)
        const url = activeTab === "events" ? "/api/organizer/eventbooking/stats" : "/api/organizer/diningbooking/stats"
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}${url}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        // console.log("response",response.data)
        if (response.data) {
          const totalBookings = response?.data?.data?.totalBookings;
          const confirmedBookings = response?.data?.data?.confirmedBookings;
          const cancelledBookings = response?.data?.data?.cancelledBookings;
          const pendingBookings = response?.data?.data?.pendingBookings;

          SetStats((prev) => ({
            ...prev,
            totalBookings,
            confirmedBookings,
            cancelledBookings,
            pendingBookings
          }));
        }
      } catch (error) {
        console.error("failed to get dashboard stats", error)
      } finally {
        setStatsloading(false)
      }
    }
    fetchStats()
  }, [activeTab])
  // stats data 
  const statsdata = [
    {
      title: "Total Bookings",
      value: stats.totalBookings || 0,
      icon: CalendarDays,
      gradient: "from-[#6a4dff] to-[#8b5cf6]",
    },
    {
      title: "Confirmed Bookings",
      value: stats.confirmedBookings || 0,
      icon: Ticket,
      gradient: "from-[#22c55e] to-[#16a34a]",
    },
    {
      title: "Cancelled Bookings",
      value: stats.cancelledBookings || 0,
      icon: MdCancel,
      gradient: "from-[#FF0000] to-[#FF0000]",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings || 0,
      icon: MdOutlinePendingActions ,
      gradient: "from-[#f59e0b] to-[#f97316]",
    },
  ]
  return (
    <div className='w-full'>
        <div className='flex px-3 py-4 flex-col gap-5'>
            {/* header */}
            <div className="flex gap-8 md:items-center flex-col md:flex-row  md:justify-between">
           <div className="flex flex-col">
            <span className="text-[1.5rem]  font-bold text-black dark:text-white">
              Manage Bookings
            </span>
            <span className="text-sm text-gray-500 font-normal">
            Track and manage all reservations
            </span>
          </div>
           </div>
           {/*  tabs */}
           <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
           {/* stats */}
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
          {/* table */}
          {activeTab === "events" && <EventBookingTable />}
          {activeTab === "dining" && <DiningBookingTable />}
        </div>
    </div>
  )
}

export default ManageBookings