import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./AuthSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import { HomeApi } from "./api/HomeApi";
import { EventApi } from "./api/EventApi";


const userpersistconfig={
    key:"Auth",
    storage:sessionStorage
}

const persistconfiguser = persistReducer(userpersistconfig,AuthSlice.reducer)
const rootReducer = combineReducers({
    Auth:persistconfiguser,
    [HomeApi.reducerPath]:HomeApi.reducer,
    [EventApi.reducerPath]:EventApi.reducer
})
export const Store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}).concat(HomeApi.middleware).concat(EventApi.middleware)
})
export const Persistor = persistStore(Store)