import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const BookingApi = createApi({
    reducerPath:"BookingApi",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
        // get dining booking stats 
        GetDiningBookingStats:builder.query({
            query:()=>"/api/organizer/diningbooking/stats",
        }),
        // get event booking stats 
        GetEventBookingStats:builder.query({
            query:()=>"/api/organizer/eventbooking/stats",
        }),
        // dining bookings
        GetDiningBookings:builder.query({
            query:({page,status})=>({
                url:"/api/dining/organizer/restaurant/bookings",
                params:{
                    page,
                    status
                }
            })
        }),
        GetEventBookings:builder.query({
             query:({page,status})=>({
                url:"/api/event/bookings",
                params:{
                    page,
                    status
                }
            })
        })
    })
})

export const {useGetDiningBookingStatsQuery,useGetEventBookingStatsQuery,useGetDiningBookingsQuery,useGetEventBookingsQuery} = BookingApi