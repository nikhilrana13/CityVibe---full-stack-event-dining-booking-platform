import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import sessionStorage from "redux-persist/es/storage/session";
import { AuthSlice } from "./AuthSlice";
import { AuthApi } from "./api/AuthApi";
import { DashboardApi } from "./api/DashboardApi";
import { OrganizerApi } from "./api/OrganizerApi";
import { CampaignApi } from "./api/CampaignApi";





const userpersistconfig={
    key:"Auth",
    storage:sessionStorage
}

const persistconfiguser = persistReducer(userpersistconfig,AuthSlice.reducer)
const rootReducer = combineReducers({
    Auth:persistconfiguser,
    [AuthApi.reducerPath]:AuthApi.reducer,
    [DashboardApi.reducerPath]:DashboardApi.reducer,
    [OrganizerApi.reducerPath]:OrganizerApi.reducer,
    [CampaignApi.reducerPath]:CampaignApi.reducer
})
export const Store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false}).concat(AuthApi.middleware).concat(DashboardApi.middleware).concat(OrganizerApi.middleware).concat(CampaignApi.middleware)
})
export const Persistor = persistStore(Store)