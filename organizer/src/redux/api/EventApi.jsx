import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const EventApi = createApi({
    reducerPath: "EventApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Event"],
    endpoints: (builder) => ({
        // event stats
        GetEventStats: builder.query({
            query: () => "/api/organizer/eventmanagement/stats",
            providesTags: ["Event"]
        }),
        // get organizer all events
        GetOrganizerEvents: builder.query({
            query: ({ page, limit = 5, title, eventIsActive }) => {
                const params = new URLSearchParams();
                params.append("page", page);
                params.append("limit", limit);
                if (title) {
                    params.append("title", title);
                }
                if (eventIsActive !== undefined) {
                    params.append("eventIsActive", eventIsActive);
                }
                return `/api/event/all?${params.toString()}`
            },
            providesTags: ["Event"]
        }),
        // create event 
        CreateEvent:builder.mutation({
            query:(formdata)=>({
                url:"/api/event/create-event",
                method:"POST",
                body:formdata
            }),
            invalidatesTags:["Event"]
        }),
        // handle Cancel Event 
        CancelEvent:builder.mutation({
            query:(id)=>({
                url:`/api/event/cancel/${id}`,
                method:"PUT",
            }),
            invalidatesTags: ["Event"],
        }),
        // handle delete event 
        DeleteEvent:builder.mutation({
            query:(id)=>({
                url:`/api/event/delete/${id}`,
                method:"DELETE",
            }),
            invalidatesTags: ["Event"],
        }),
        
    })

})

export const { useGetEventStatsQuery, useGetOrganizerEventsQuery,useCreateEventMutation,useCancelEventMutation,useDeleteEventMutation,} = EventApi