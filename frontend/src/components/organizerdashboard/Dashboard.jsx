import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import RevenueChart from './RevenueChart'
import RevenueChartSkeleton from './RevenueChartSkeleton'
import { CalendarDays, IndianRupee, Ticket, TrendingUp } from 'lucide-react'
import { formatIndianNumber } from '../../lib/utils.js'
import StatsCard from './StatsCard'
import StatsCardShimmer from './StatsCardShimmer'


const Dashboard = () => {
  const user = useSelector((state) => state.Auth.user)
  const [stats, SetStats] = useState({
    totalEvents: 0,
    totalRevenue: 0,
    totalTicketsolds: 0,
    totaldiningbookings: 0,
    totaleventbookings: 0,
  })
  const [monthlyRevenue,setMonthlyRevenue] = useState([])
  const [growth,setGrowth] = useState(0)
  const [loading,setloading] = useState(false)
  const [chartloading,setChartloading] = useState(false)
 
  // fetch dashboard stats
  useEffect(()=>{
       const fetchDashboardStats = async()=>{
         try {
            setloading(true)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/organizer/dashboard/stats`,{
              headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
            })
            // console.log("response",response.data)
            if(response.data){
                const totalEvents = response?.data?.data?.totalEvents;
                const totalRevenue = response?.data?.data?.totalRevenue;
                const totalTicketsolds = response?.data?.data?.totalTicketsolds;
                const totaldiningbookings = response?.data?.data?.totaldiningbookings;
                const totaleventbookings = response?.data?.data?.totaleventbookings;

                SetStats((prev) => ({
                  ...prev,
                  totalEvents,
                  totalRevenue,
                  totalTicketsolds,
                  totaldiningbookings,
                  totaleventbookings,
                }));
            }
          
         } catch (error) {
           console.error("failed to get dashboard stats",error)
         }finally{
          setloading(false)
         }
       }
       fetchDashboardStats()
  },[])
  // stats data
  const statsdata = [
  {
    title: "Total Events",
    value: stats.totalEvents || 0,
    icon: CalendarDays,
    gradient: "from-[#6a4dff] to-[#8b5cf6]",
  },
  {
    title: "Total Event Bookings",
    value: stats.totaleventbookings || 0,
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
    title: "Total Dining bookings",
    value: stats.totaldiningbookings || 0,
    icon: TrendingUp,
    gradient: "from-[#f59e0b] to-[#f97316]",
  },
  ]
  // revenue analytics 
  useEffect(()=>{
      const fetchAnalyticsRevenue = async()=>{
        try {
          setChartloading(true)
           const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/organizer/analytics/revenue`,{
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
           })
           if(response.data){
            setMonthlyRevenue(response?.data?.data?.monthlyRevenue)
            setGrowth(response?.data?.data?.growth)
           }
        } catch (error) {
          console.error("failed to get analytics revenue",error)
        }finally{
          setChartloading(false)
        }
      }
      fetchAnalyticsRevenue()
  },[])

  return (
    <div className='w-full'>
      <h1 className="text-[1.5rem] p-3 sm:text-3xl font-[500]">Welcome back, {user?.name || "User"} 👋</h1>
      {/* stats cards */}
      <div className='flex flex-col  p-3 gap-4'>
        {
          loading ? (
             <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
              {[1,2,3,4].map((_,index)=>{
                return (
                  <StatsCardShimmer key={index} />
                )
              })}
             </div>
          ):(
          <StatsCard statsdata={statsdata}/>
          )
        }
        {/* revenue chart */}
        {
          chartloading ? (
            <RevenueChartSkeleton />
          ):(
            <RevenueChart monthlyRevenue={monthlyRevenue} growth={growth}  />
          )
        }
      </div>
    </div>
  )
}

export default Dashboard