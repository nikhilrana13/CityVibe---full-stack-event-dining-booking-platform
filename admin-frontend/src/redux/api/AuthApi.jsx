import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const AuthApi = createApi({
    reducerPath:"AuthApi",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
        // login admin
        LoginAdmin:builder.mutation({
            query:(data)=>({
                url:"/api/auth/admin-login",
                method:"POST",
                body:data
            })
        }),
    
    })
})

export const {useLoginAdminMutation} = AuthApi