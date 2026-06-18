import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import { AuthSlice } from "./AuthSlice";
import { OrganizerApi } from "./api/OrganizerApi";
import { DashboardApi } from "./api/DashboardApi";
import { EventApi } from "./api/EventApi";
import { DiningApi } from "./api/DiningApi";



const userpersistconfig={
    key:"Auth",
    storage:sessionStorage
}

const persistconfiguser = persistReducer(userpersistconfig,AuthSlice.reducer)
const rootReducer = combineReducers({
    Auth:persistconfiguser,
    [OrganizerApi.reducerPath]:OrganizerApi.reducer,
    [DashboardApi.reducerPath]:DashboardApi.reducer,
    [EventApi.reducerPath]:EventApi.reducer,
    [DiningApi.reducerPath]:DiningApi.reducer
})
export const Store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}).concat(OrganizerApi.middleware).concat(DashboardApi.middleware).concat(EventApi.middleware).concat(DiningApi.middleware)
})
export const Persistor = persistStore(Store)