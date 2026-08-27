import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const CampaignApi = createApi({
    reducerPath:"Campaign",
    baseQuery:baseQueryWithAuth,
    tagTypes:["Campaign"],
    endpoints:(builder)=>({
                // get all campaigns
                GetAllCampaigns:builder.query({
                    query:()=>"/api/campaigns/all",
                    providesTags:["Campaign"],
                }),
                // Add Campaign
                AddCampaign:builder.mutation({
                 query:(formdata)=>({
                    url:"/api/campaigns/create-campaign",
                    method:"POST",
                    body:formdata
                 }),
                 invalidatesTags:["Campaign"]
                }),
                // Update campaign
                UpdateCampaign:builder.mutation({
                    query:({formdata,id})=>({
                    url:`/api/campaigns/update/${id}`,
                    method:"PUT",
                    body:formdata
                    }),
                    invalidatesTags:["Campaign"]
                }),
                // toggle campaign Status
                ToggleCampaignStatus:builder.mutation({
                    query:(id)=>({
                        url:`/api/campaigns/toggle/${id}`,
                        method:"PATCH"
                    }),
                    invalidatesTags:["Campaign"]
                })
    })
})
export const {useGetAllCampaignsQuery,useAddCampaignMutation,useUpdateCampaignMutation,useToggleCampaignStatusMutation} = CampaignApi 
