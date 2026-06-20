import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";





export const EventApi = createApi({
    reducerPath: "Event",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        // get events based on city 
        GetEvents: builder.query({
            query: ({ page = 1, city, sortby, startDate,category}) => {
                const params = new URLSearchParams({
                    page,
                    ...(city && { city }),
                    ...(sortby && { sortby }),
                    ...(startDate && { startDate }),
                    ...( category && {category})
                });
                return `/api/event/search?${params.toString()}`;
            },

        }),
        // each event details
        GetEventDetails:builder.query({
            query:(id)=>`/api/event/details/${id}`
        })
    })
})

export const { useGetEventsQuery,useGetEventDetailsQuery} = EventApi