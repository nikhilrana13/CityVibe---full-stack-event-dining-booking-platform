import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const DiningApi = createApi({
      reducerPath:"DiningApi",
      baseQuery:baseQueryWithAuth,
      endpoints:(builder)=>({
        //  get restaurant details 
        GetRestaurantDetails:builder.query({
           query:(id)=>`/api/dining/restaurant/details/${id}`
        }),
        // get restaurant slots
        GetSlots:builder.query({
            query:({restaurantId,date})=>({
                url:"/api/restaurant/slots",
                params:{
                    restaurantId,
                    date
                }
            })
        }),
        // create dining booking 
        CreateDiningBooking:builder.mutation({
            query:(body)=>({
                url:"/api/restaurant/create-booking",
                method:"POST",
                body
            })
        })
      })
})

export const {useGetRestaurantDetailsQuery,useGetSlotsQuery,useCreateDiningBookingMutation} = DiningApi