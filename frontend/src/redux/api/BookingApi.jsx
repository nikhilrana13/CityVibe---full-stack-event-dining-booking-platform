import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const BookingApi = createApi({
    reducerPath:"BookingApi",
    baseQuery:baseQueryWithAuth,
    tagTypes:["Booking"],
    endpoints:(builder)=>({
        // get each event booking details
        GetEventBookingDetail:builder.query({
            query:(id)=>`/api/event/booking/${id}`,
            providesTags:["Booking"]
        }),
        
        // get each dining booking details
        GetDiningBookingDetail:builder.query({
            query:(id)=>`/api/restaurant/booking/${id}`,
             providesTags:["Booking"]
        }),
        // user event bookings
       GetUserEventBookings:builder.query({
            query:(page)=>`/api/event/userbookings?page=${page}`,
             providesTags:["Booking"]
       }),
       // user dining bookings
       GetUserDiningBookings:builder.query({
           query:(page)=>`/api/restaurant/userbookings?page=${page}`,
            providesTags:["Booking"]
       }),
       // cancel event booking 
       CancelEventBooking:builder.mutation({
          query:(id)=>({
              url:`/api/event/cancelbooking/${id}` ,
              method:"PUT",
              body:{}
          }),
          invalidatesTags:["Booking"]
       }),
      // cancel dining booking 
      CancelDiningBooking:builder.mutation({
        query:(id)=>({
              url:`/api/restaurant/cancelbooking/${id}` ,
              method:"PUT",
              body:{}
          }),
          invalidatesTags:["Booking"]
      })   
    })
})

export const {useGetUserEventBookingsQuery,useGetUserDiningBookingsQuery,useGetEventBookingDetailQuery,useGetDiningBookingDetailQuery,useCancelDiningBookingMutation,useCancelEventBookingMutation} = BookingApi