import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const AgentApi = createApi({
    reducerPath:"Agent",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
             GetAgentMessage:builder.mutation({
                query:({type,question})=>({
                    url:"/api/agents/booking-agent",
                    method:"POST",
                    body:{
                        type,
                        question
                    }
                })
             })
    })
})

export const {useGetAgentMessageMutation} = AgentApi