import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const OrganizerApi = createApi({
    reducerPath:"OrganizerApi",
    baseQuery:baseQueryWithAuth,
    tagTypes:["Organizer"],
    endpoints:(builder)=>({
        // get organizer profile 
        GetOrganizerProfile:builder.query({
            query:()=>"/api/organizer/profile",
            providesTags:["Organizer"]
        }),
        // create organizer account 
        CreateOrganizerAccount:builder.mutation({
            query:(formData)=>({
                url:"/api/organizer/onboarding",
                method:"POST",
                body:formData
            }),
            invalidatesTags: ["Organizer"],
        })
        // update organizer profile
    })
})

export const {useGetOrganizerProfileQuery,useCreateOrganizerAccountMutation} = OrganizerApi