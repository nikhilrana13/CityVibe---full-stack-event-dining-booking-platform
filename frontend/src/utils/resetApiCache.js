import { BookingApi } from "@/redux/api/BookingApi"
import { EventApi } from "@/redux/api/EventApi"
import { Store } from "@/redux/Store"



export const resetAllApiCache = ()=>{
    Store.dispatch(
        BookingApi.util.resetApiState(), 
    )
}