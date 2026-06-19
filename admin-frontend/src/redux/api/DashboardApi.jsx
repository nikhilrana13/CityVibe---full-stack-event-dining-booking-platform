import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";





export const DashboardApi = createApi({
    reducerPath:"Dashboard",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
       // dashboard stats 
       GetDashboardStats:builder.query({
           query:()=>"/api/admin/dashboard-stats"
       })
    })

})

export const {useGetDashboardStatsQuery} = DashboardApi