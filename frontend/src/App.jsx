import { Navigate, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Diningpage from "./pages/Diningpage"
import Eventspage from "./pages/Eventspage"
import { Toaster } from "./components/ui/sonner"
import ListYourEvents from "./pages/ListYourEvents"
import EventDetailsPage from "./pages/EventDetailsPage"
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage"
import CategoryDetailPage from "./pages/CategoryDetailPage"
import BookEventTickets from "./components/pages/EventPage/BookEventTickets"
import UpdateEventBookingStatus from "./components/pages/EventPage/UpdateEventBookingStatus"
import Bookings from "./pages/Bookings"
import DiningBooking from "./components/pages/diningPage/DiningBooking"
import LoginDialog from "./components/common/LoginDialog"
import ScrollToTop from "./components/common/ScrollToTop"
import PaymentFailed from "./components/pages/EventPage/PaymentFailed"
import { Helmet } from "react-helmet-async"
import BookingDetails from "./components/bookings/BookingDetails"

const App = () => {
  return (
    <>
     <Helmet>
        <title>CityVibe | Discover Events & Dining Near You</title>
        <meta
          name="description"
          content="Discover the best events, concerts, nightlife and dining experiences in your city with CityVibe."
        />
      </Helmet>       
        <div className="w-full">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dining" element={<Diningpage />} />
        <Route path="/events" element={<Eventspage />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/booking/:type/:id" element={<BookingDetails />} />
        {/* events */}
        <Route path="/events/:id/:slug" element={<EventDetailsPage />} />
        <Route path="/events/:id/:slug/book" element={<BookEventTickets />} />
        <Route path="/events/category/:category" element={<CategoryDetailPage />} />
        {/* dining */}
        <Route path="/dining/:city/:id/:slug" element={<RestaurantDetailsPage />} />
        <Route path="/dining/:city/:id/:slug/book" element={<DiningBooking />} />
        {/* payments success and failed */}
        <Route path="/payment-success" element={<UpdateEventBookingStatus />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        {/* for organizers */}
        <Route path="/events/list-your-events" element={<ListYourEvents />} />
      </Routes>
      {/* login dialog */}
      <LoginDialog />
      <Toaster />
    </div>
    </>

  )
}

export default App