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
            
    })
})
export const {useGetAllCampaignsQuery} = CampaignApi 
