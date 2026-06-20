import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const HomeApi = createApi({
    reducerPath:"HomeApi",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
        // Get home page data 
        GetHomePageData:builder.query({
            query:(city)=>({
                url:"/api/home",
                params:{
                    city
                }
            })
        })  
    })
})

export const {useGetHomePageDataQuery} = HomeApi