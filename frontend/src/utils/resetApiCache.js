import { BookingApi } from "@/redux/api/BookingApi";
import { DiningApi } from "@/redux/api/DiningApi";
import { EventApi } from "@/redux/api/EventApi";

export const resetAllApiCaches = () => (dispatch) => {
  dispatch(BookingApi.util.resetApiState());
  dispatch(DiningApi.util.resetApiState());
  dispatch(EventApi.util.resetApiState());
};