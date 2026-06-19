import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const DiningApi = createApi({
    reducerPath: "DiningApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Dining"],
    endpoints: (builder) => ({
        // get restaurant details 
        GetRestaurantDetails: builder.query({
            query: (id) => `/api/dining/restaurant/details/${id}`,
            providesTags: ["Dining"]
        }),
        // get organizer restaurant details 
        GetOrganizerRestaurantDetails: builder.query({
            query: () => "/api/dining/organizer/restaurant",
            providesTags: ["Dining"]
        }),
        // get dining management stats 
        GetDiningStats: builder.query({
            query: () => "/api/organizer/diningmanagement/stats",
            providesTags: ["Dining"],
        }),
        // create event 
        CreateRestaurant: builder.mutation({
            query: (formdata) => ({
                url: "/api/dining/restaurant/create",
                method: "POST",
                body: formdata
            }),
            invalidatesTags: ["Dining"]
        }),
        //update event 
        UpdateRestaurant: builder.mutation({
            query: ({ id, formdata }) => ({
                url: `/api/dining/restaurant/update/${id}`,
                method: "PUT",
                body: formdata
            }),
            invalidatesTags: ["Dining"]
        }),
        // Toggle Active and inActive restaurant
        ActiveAndInActiveRestaurant: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/api/dining/restaurant/toggle/${id}`,
                method: "PUT",
                body: {isActive}
            }),
            invalidatesTags: ["Dining"]
        }),
        // delete restaurant 
        DeleteRestaurant:builder.mutation({
            query:(id)=>({
                url:`/api/dining/restaurant/delete/${id}`,
                method:"DELETE",
            }),
            invalidatesTags: ["Dining"]
        })

    })
})

export const { useGetRestaurantDetailsQuery, useGetOrganizerRestaurantDetailsQuery, useGetDiningStatsQuery, useCreateRestaurantMutation, useUpdateRestaurantMutation, useActiveAndInActiveRestaurantMutation,useDeleteRestaurantMutation} = DiningApi