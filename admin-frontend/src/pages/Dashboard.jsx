import StatsCard from '@/components/dashboard/StatsCard';
import StatsCardShimmer from '@/components/dashboard/StatsCardShimmer';
import { useGetDashboardStatsQuery } from '@/redux/api/DashboardApi';
import { formatIndianNumber } from '@/utils/Helpers';
import React from 'react';
import { BiCalendarEvent } from 'react-icons/bi';
import { FaStore } from 'react-icons/fa';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { RiUserShared2Fill } from 'react-icons/ri';
import { TiTicket } from 'react-icons/ti';

const Dashboard = () => {
   const statsQuery = useGetDashboardStatsQuery()
   const stats = statsQuery?.data?.data?.stats
  //  console.log("stats",stats)


  // stats data
  const statsdata = [
  {
    title: "Users",
    value: statsQuery.isError ? "--" : stats?.totalUsers ?? 0,
    icon: RiUserShared2Fill,
  },
  {
    title: "Organizers",
    value: statsQuery.isError ? "--" : stats?.totalOrganizers ?? 0,
    icon: RiUserShared2Fill,
  },
  {
    title: "Pending Approvals",
    value: statsQuery.isError ? "--" : stats?.pendingOrganizers ?? 0,
    icon: RiUserShared2Fill,
  },
  {
    title: "Events",
    value: statsQuery.isError ? "--" : stats?.totalEvents ?? 0,
    icon: BiCalendarEvent,
  },
  {
    title: "Restaurants",
    value: statsQuery.isError ? "--" : stats?.totalRestaurants ?? 0,
    icon: FaStore,
  },
  {
    title: "Bookings",
    value: statsQuery.isError ? "--" : stats?.totalBookings ?? 0,
    icon: TiTicket,
  },
  {
    title: "Revenue",
    value: statsQuery.isError ? "--" : `₹ ${formatIndianNumber(stats?.totalRevenue || 0)}`,
    icon: FaIndianRupeeSign,
  },
  ]

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

    </div>
  );
}

export default Dashboard;
