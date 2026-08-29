import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const OfferApi = createApi({
    reducerPath:"Offer",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
            // get all offers 
            GetActiveOffers:builder.query({
                query:()=>"/api/campaigns/active-offers"
            }),
            // get display on homepage offer 
            GetDisplayOnHomeOffer:builder.query({
                query:()=>"/api/campaigns/display-on-home"
            }),
            // apply offer 
            ApplyOffer:builder.mutation({
                query:({campaignId,eventId,tickets})=>({
                    url:"/api/campaigns/apply-offer",
                    method:"POST",
                    body:{
                        campaignId,
                        eventId,
                        tickets
                    }
                })
            })

    })
})
export const {useGetActiveOffersQuery,useGetDisplayOnHomeOfferQuery,useApplyOfferMutation} = OfferApi 