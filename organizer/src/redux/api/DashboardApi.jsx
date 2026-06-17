import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const DashboardApi = createApi({
    reducerPath:"DashboardApi",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
        // get dashboard stats 
         GetDashboardStats:builder.query({
            query:()=> "/api/organizer/dashboard/stats",
        }),
        GetAnalyticsRevenue:builder.query({
        query:()=> "/api/organizer/analytics/revenue",
        })

    })
})

export const {useGetAnalyticsRevenueQuery,useGetDashboardStatsQuery} = DashboardApi