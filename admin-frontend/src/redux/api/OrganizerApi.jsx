import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";





export const OrganizerApi = createApi({
    reducerPath:"Organizer",
    baseQuery:baseQueryWithAuth,
    tagTypes:["Organizer"],
    endpoints:(builder)=>({
        // fetch organizers 
        GetOrganizers:builder.query({
            query:(page)=>({
                url:`/api/admin/organizers`,
                params:{page},
            }),
            providesTags:["Organizer"]
        }),
        // verify organizer
        VerifyOrganizer:builder.mutation({
            query:({id,status})=>({
                url:"/api/admin/organizer/verify",
                method:"PUT",
                body:{
                    organizerId:id,
                    status
                }
            }),
            invalidatesTags:["Organizer"]
        })
    })
})

export const {useGetOrganizersQuery,useVerifyOrganizerMutation} = OrganizerApi