import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./AuthSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import { HomeApi } from "./api/HomeApi";
import { EventApi } from "./api/EventApi";
import { BookingApi } from "./api/BookingApi";
import { DiningApi } from "./api/DiningApi";
import { SearchResultApi } from "./api/SearchResultApi";
import { AgentApi } from "./api/AgentApi";


const userpersistconfig={
    key:"Auth",
    storage:sessionStorage
}

const persistconfiguser = persistReducer(userpersistconfig,AuthSlice.reducer)
const rootReducer = combineReducers({
    Auth:persistconfiguser,
    [HomeApi.reducerPath]:HomeApi.reducer,
    [EventApi.reducerPath]:EventApi.reducer,
    [BookingApi.reducerPath]:BookingApi.reducer,
    [DiningApi.reducerPath]:DiningApi.reducer,
    [SearchResultApi.reducerPath]:SearchResultApi.reducer,
    [AgentApi.reducerPath]:AgentApi.reducer,
})
export const Store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}).concat(HomeApi.middleware).concat(EventApi.middleware).concat(BookingApi.middleware).concat(DiningApi.middleware).concat(SearchResultApi.middleware).concat(AgentApi.middleware)
})

export const Persistor = persistStore(Store)