import React from 'react'
import { CalendarDays, Ticket, IndianRupee, TrendingUp } from "lucide-react";
import { formatIndianNumber } from "../../lib/utils";
const DashboardStatsCard = ({ totalRevenue, totalTicketsolds, totaleventbookings,totalEvents, totaldiningbookings}) => {
  const kpis = [
  {
    title: "Total Events",
    value: totalEvents || 0,
    icon: CalendarDays,
    gradient: "from-[#6a4dff] to-[#8b5cf6]",
  },
  {
    title: "Total Event Bookings",
    value: totaleventbookings || 0,
    icon: Ticket,
    gradient: "from-[#0ea5e9] to-[#06b6d4]",
  },
  {
    title: "Revenue",
    value: totalRevenue ? formatIndianNumber(totalRevenue) : 0,
    icon: IndianRupee,
    gradient: "from-[#22c55e] to-[#16a34a]",
  },
  {
    title: "Total Dining bookings",
    value: totaldiningbookings || 0,
    icon: TrendingUp,
    gradient: "from-[#f59e0b] to-[#f97316]",
  },
]
  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {kpis.map(({ title, value,icon: Icon, gradient }) => (
        <div
          key={title}
          className="relative group rounded-2xl bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden"
        >
          {/* Gradient Glow */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-500 bg-gradient-to-br ${gradient}`}
          />
          <div className="relative flex justify-between items-start">
            {/* Left */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500 font-medium">
                {title}
              </p>
              <h2 className="text-2xl font-semibold text-gray-900">
                {value}
              </h2>
            </div>
            {/* Icon */}
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}
            >
              <Icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStatsCard