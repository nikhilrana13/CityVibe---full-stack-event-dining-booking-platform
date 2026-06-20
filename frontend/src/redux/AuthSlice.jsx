import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import sessionStorage from "redux-persist/lib/storage/session";


export const AuthSlice = createSlice({
    name:"Auth",
    initialState:{
       user:null,
    },
    reducers:{
        Setuser:(state,action)=>{
            state.user = action.payload
        },
        logout:(state)=>{
            state.user = null
        }
    }
    
})

export const {Setuser,logout} = AuthSlice.actions 
 const peristconfig = {
    key:'Auth',
    storage:sessionStorage
}
export const persistedReducer = persistReducer(peristconfig,AuthSlice.reducer) 





