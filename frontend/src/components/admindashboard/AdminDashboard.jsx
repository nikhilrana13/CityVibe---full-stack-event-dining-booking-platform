import React, { useState,useEffect} from 'react';
import { Users, CalendarDays, Store, Ticket, IndianRupee } from "lucide-react"
import StatCard from './StatCard';
import DashboardSkeleton from './DashboardSkeleton';
import { formatIndianNumber } from '../../lib/utils'
import axios from 'axios';


const AdminDashboard = () => {
  const [stats,setStats] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)

  const fetchStats = async () => {
    try{
      setLoading(true)
      setError(null)
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard-stats`,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("adminToken")}`
          }
        })
      setStats(res?.data?.data)
    }catch(error){
      console.error("failed to load dashboard stats",error)
      setError( error?.response?.data?.message || "Failed to load dashboard stats")
    }finally{
        setLoading(false)
    }
  }
  useEffect(()=>{
    fetchStats()
  },[])

  if(loading){
    return <DashboardSkeleton/>
  }
  if(error){
    return (
      <div className="flex flex-col items-center justify-center h-[300px] gap-3">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
  <div className="p-6 space-y-6">
      {/* heading */}
      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Overview of CityVibe platform activity
        </p>
      </div>
      {/* stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        <StatCard
          title="Users"
          value={formatIndianNumber(stats?.totalUsers)}
          icon={<Users size={20}/>}
        />
        <StatCard
          title="Organizers"
          value={stats?.totalOrganizers}
          icon={<Users size={20}/>}
        />
        <StatCard
          title="Pending Approvals"
          value={stats?.pendingOrganizers}
          icon={<Users size={20}/>}
        />
        <StatCard
          title="Events"
          value={stats?.totalEvents}
          icon={<CalendarDays size={20}/>}
        />
        <StatCard
          title="Restaurants"
          value={stats?.totalRestaurants}
          icon={<Store size={20}/>}
        />
        <StatCard
          title="Bookings"
          value={stats?.totalBookings}
          icon={<Ticket size={20}/>}
        />
        <StatCard
          title="Revenue"
          value={`₹${formatIndianNumber(stats?.totalRevenue)}`}
          icon={<IndianRupee size={20}/>}
        />
      </div>
      

    </div>
  );
}

export default AdminDashboard;
