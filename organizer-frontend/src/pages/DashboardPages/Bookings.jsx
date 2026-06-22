import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdCancel, MdOutlinePendingActions } from 'react-icons/md'
import BookingTabs from '@/components/bookings/BookingsTabs'
import StatsCardShimmer from '@/components/dashboard/StatsCardShimmer'
import StatsCard from '@/components/dashboard/StatsCard'
import { FaCalendarDays } from 'react-icons/fa6'
import { TiTicket } from 'react-icons/ti'
import { useGetDiningBookingStatsQuery, useGetEventBookingStatsQuery } from '@/redux/api/BookingApi'
import EventBookingTable from '@/components/bookings/EventBookingTable'
import DiningBookingTable from '@/components/bookings/DiningBookingTable'


const Bookings = () => {
    const [activeTab,setActiveTab] = useState("events")
    const diningstatsQuery = useGetDiningBookingStatsQuery(undefined,{
      skip:activeTab !== "dining"
    })
    const eventstatsQuery = useGetEventBookingStatsQuery(undefined,{
      skip:activeTab !== "events"
    })
    const statsQuery = activeTab === "events" ? eventstatsQuery : diningstatsQuery
    const stats = statsQuery?.data?.data?.stats || {};
    const isLoading = statsQuery?.isLoading 
  // stats data 
  const statsdata = [
    {
      title: "Total Bookings",
      value: statsQuery.isError ? "--" : stats?.totalBookings ?? 0,
      icon: FaCalendarDays,
      gradient: "from-[#6a4dff] to-[#8b5cf6]",
    },
    {
      title: "Confirmed Bookings",
      value: statsQuery.isError ? "--" : stats?.confirmedBookings ?? 0,
      icon: TiTicket,
      gradient: "from-[#22c55e] to-[#16a34a]",
    },
    {
      title: "Cancelled Bookings",
      value: statsQuery.isError ? "--" : stats?.cancelledBookings ?? 0,
      icon: MdCancel,
      gradient: "from-[#FF0000] to-[#FF0000]",
    },
    {
      title: "Pending Bookings",
      value: statsQuery.isError ? "--" : stats?.pendingBookings ?? 0,
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
          isLoading ? (
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

export default Bookings