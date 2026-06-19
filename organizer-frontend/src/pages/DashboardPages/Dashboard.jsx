import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaCalendarDays, FaIndianRupeeSign } from 'react-icons/fa6'
import { TiTicket } from 'react-icons/ti'
import { BiTrendingUp } from 'react-icons/bi'
import RevenueChartSkeleton from '@/components/dashboard/RevenueChartSkeleton'
import RevenueChart from '@/components/dashboard/RevenueChart'
import StatsCardShimmer from '@/components/dashboard/StatsCardShimmer'
import StatsCard from '@/components/dashboard/StatsCard'
import { useGetAnalyticsRevenueQuery, useGetDashboardStatsQuery } from '@/redux/api/DashboardApi'
import { formatIndianNumber } from '@/utils/Helpers'


const Dashboard = () => {
  const user = useSelector((state) => state.Auth.user)
  const statsQuery = useGetDashboardStatsQuery()
  const revenueQuery = useGetAnalyticsRevenueQuery()
  const stats = statsQuery?.data?.data?.stats || {}
  const monthlyRevenue = revenueQuery?.data?.data?.monthlyRevenue
  const growth = revenueQuery?.data?.data?.growth ?? 0

  // stats data
  const statsdata = [
  {
    title: "Total Events",
    value: statsQuery.isError ? "--" : stats?.totalEvents ?? 0,
    icon: FaCalendarDays,
    gradient: "from-[#6a4dff] to-[#8b5cf6]",
  },
  {
    title: "Total Event Bookings",
    value: statsQuery.isError ? "--" : stats?.totaleventbookings ?? 0,
    icon: TiTicket,
    gradient: "from-[#0ea5e9] to-[#06b6d4]",
  },
  {
    title: "Revenue",
    value: statsQuery.isError ? "--" : `₹ ${formatIndianNumber(stats?.totalRevenue || 0)}`,
    icon: FaIndianRupeeSign,
    gradient: "from-[#22c55e] to-[#16a34a]",
  },
  {
    title: "Total Dining bookings",
    value: statsQuery.isError ? "--" : stats?.totaldiningbookings ?? 0,
    icon: BiTrendingUp,
    gradient: "from-[#f59e0b] to-[#f97316]",
  },
  ]
  return (
    <div className='w-full p-5 flex flex-col gap-5'>
      <h1 className="text-[1.5rem] sm:text-3xl font-[500]">Welcome back, {user?.name || "User"} 👋</h1>
      {/* stats card */}
      {statsQuery?.isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'>
          {Array(4).fill(0).map((_, i) => <StatsCardShimmer key={i} />)}
        </div>
      ) : statsQuery?.isError ? (
        <p className="text-red-500 text-center">Failed to load stats</p>
      ) : (
        <StatsCard statsdata={statsdata} />
      )
      }
      {/* graphs */}
      {
        revenueQuery?.isLoading ? (
          <RevenueChartSkeleton />
        ) : revenueQuery.isError ? (
          <p className="text-red-500 text-center">Failed to load revenue</p>
        ) : (
          <RevenueChart
            monthlyRevenue={monthlyRevenue}
            growth={growth}
          />
        )
      }
    </div>
  )
}

export default Dashboard