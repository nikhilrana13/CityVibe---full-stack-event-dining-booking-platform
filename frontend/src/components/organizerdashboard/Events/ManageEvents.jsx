import { formatIndianNumber } from '@/lib/utils'
import { CalendarDays, IndianRupee, PlusIcon, Ticket, TrendingUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import StatsCardShimmer from '../StatsCardShimmer'
import StatsCard from '../StatsCard'
import axios from 'axios'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "../../ui/select";
import EventsTable from './EventsTable'
import useDebounce from '../../../hooks/useDebounce'

const ManageEvents = () => {
  const [statsloading, setStatsloading] = useState(false)
  const [stats, SetStats] = useState({
    totalRevenue: 0,
    totalTicketsolds: 0,
    currentMonthRevenue: 0,
    totalEvents: 0,
  })
  const [Search, setSearch] = useState("")
  const [isActive, setIsActive] = useState(true)
  const debouncedSearch = useDebounce(Search,500)


  // fetch event stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsloading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/organizer/eventmanagement/stats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        // console.log("response",response.data)
        if (response.data) {
          const totalRevenue = response?.data?.data?.totalRevenue;
          const totalTicketsolds = response?.data?.data?.totalTicketsolds;
          const currentMonthRevenue = response?.data?.data?.currentMonthRevenue;
          const totalEvents = response?.data?.data?.totalEvents;

          SetStats((prev) => ({
            ...prev,
            totalRevenue,
            totalTicketsolds,
            currentMonthRevenue,
            totalEvents
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
      title: "Total Events",
      value: stats.totalEvents || 0,
      icon: CalendarDays,
      gradient: "from-[#6a4dff] to-[#8b5cf6]",
    },
    {
      title: "Ticket solds",
      value: stats.totalTicketsolds || 0,
      icon: Ticket,
      gradient: "from-[#0ea5e9] to-[#06b6d4]",
    },
    {
      title: "Revenue",
      value: stats.totalRevenue ? formatIndianNumber(stats.totalRevenue) : 0,
      icon: IndianRupee,
      gradient: "from-[#22c55e] to-[#16a34a]",
    },
    {
      title: "Curren Month Revenue",
      value: stats.currentMonthRevenue ? formatIndianNumber(stats.currentMonthRevenue) : 0,
      icon: TrendingUp,
      gradient: "from-[#f59e0b] to-[#f97316]",
    },
  ]

  return (
    <div className='w-full'>
      <div className='flex px-3 py-4 flex-col gap-5'>
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
        {/* filters bar */}
        <div className="w-full py-4 px-5 bg-white shadow-md border-gray-300  rounded-lg ">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center  gap-3">
            {/* search input */}
            <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='e.g Yo Yo Honey Singh Live Concert' className='px-4 w-full md:w-[500px] border outline-none py-2 placeholder:text-sm rounded-md' />
            <Select onValueChange={(value) => setIsActive(value)}>
              <SelectTrigger className="w-full md:max-w-48">
                <SelectValue placeholder="Select a Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value={true}>Active</SelectItem>
                  <SelectItem value={false}>In Active</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* events table */}
        <EventsTable Search={debouncedSearch} isActive={isActive} />
      </div>
    </div>
  )
}

export default ManageEvents