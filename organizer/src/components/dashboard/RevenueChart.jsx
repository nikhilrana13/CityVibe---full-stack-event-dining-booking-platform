import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
} from "recharts";

const RevenueChart = ({ monthlyRevenue, growth }) => {

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 p-4 sm:p-6 border border-gray-100 w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-6">
                <div>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                        Revenue Overview
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500">
                        Monthly performance
                    </p>
                </div>

                <div className={`text-xs sm:text-sm font-medium ${growth >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {growth >= 0 ? "+" : ""}
                    {growth}% Growth
                </div>
            </div>

            {/* Chart Container */}
            <div className="w-full h-[220px] sm:h-[280px] md:h-[320px]">
                {
                    monthlyRevenue?.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                            No revenue data available
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyRevenue}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6a4dff" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#6a4dff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#f1f1f1"
                                />

                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    tickFormatter={(value)=> value ? `₹${value / 1000}k` : "₹0"}
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={40}
                                />

                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "12px",
                                        border: "none",
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                                    }}
                                    formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#6a4dff"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )
                }

            </div>
        </div>
    );
};

export default RevenueChart;