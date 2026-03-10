import { Navigate, Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Diningpage from "./pages/Diningpage"
import Eventspage from "./pages/Eventspage"
import { Toaster } from "./components/ui/sonner"
import ListYourEvents from "./pages/ListYourEvents"
import OnBoarding from "./components/organizerdashboard/OnBoarding"
import Dashboard from "./components/organizerdashboard/Dashboard"
import OrganizerLayout from "./pages/OrganizerLayout"
import OnBoardingForm from "./components/organizerdashboard/OnBoardingForm"
import OnBoardingPending from "./components/organizerdashboard/OnBoardingPending"
import OnBoardingRejected from "./components/organizerdashboard/OnBoardingRejected"
import OrganizerStatusGuard from "./middlewares/OrganizerStatusGuard"
import ManageEvents from "./components/organizerdashboard/Events/ManageEvents"
import CreateEventForm from "./components/organizerdashboard/Events/CreateEventForm"
import ManageDining from "./components/organizerdashboard/dining/ManageDining"
import Restaurantform from "./components/organizerdashboard/dining/AddAndEditRestaurant/RestaurantForm"
import ManageBookings from "./components/organizerdashboard/bookings/ManageBookings"
import VerifyTickets from "./components/organizerdashboard/VerifyTickets/VerifyTickets"
import Settings from "./components/organizerdashboard/Settings/Settings"
import EventDetailsPage from "./pages/EventDetailsPage"
import RestaurantDetailsPage from "./pages/RestaurantDetailsPage"
import CategoryDetailPage from "./pages/CategoryDetailPage"
import BookEventTickets from "./components/pages/EventPage/BookEventTickets"
import UpdateEventBookingStatus from "./components/pages/EventPage/UpdateEventBookingStatus"
import Bookings from "./pages/Bookings"
import BookingDetails from "./components/common/BookingDetails"
import DiningBooking from "./components/pages/diningPage/DiningBooking"
import LoginDialog from "./components/common/LoginDialog"
import ScrollToTop from "./components/common/ScrollToTop"
import AdminLayout from "./components/admindashboard/AdminLayout"
import AdminDashboard from "./components/admindashboard/AdminDashboard"
import AdminGuard from "./middlewares/AdminGuard"
import AdminLogin from "./components/admindashboard/AdminLogin"
import Organizers from "./components/admindashboard/Organizers"
import PaymentFailed from "./components/pages/EventPage/PaymentFailed"
import { Helmet } from "react-helmet-async"

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
        {/* organizer routes*/}
        <Route path="/organizer" element={<OrganizerLayout />}>
          <Route element={<OrganizerStatusGuard />}>

            <Route index element={<Navigate to="dashboard" replace />} />
            {/* onboarding */}
            <Route path="onboarding">
              <Route index element={<OnBoarding />} />
              <Route path="form" element={<OnBoardingForm />} />
            </Route>
            <Route path="pending" element={<OnBoardingPending />} />
            <Route path="rejected" element={<OnBoardingRejected />} />
            {/* main dashboard */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="manage-events" element={<ManageEvents />} />
            <Route path="create-event" element={<CreateEventForm />} />
            <Route path="manage-dining" element={<ManageDining />} />
            <Route path="add-restaurant" element={<Restaurantform />} />
            <Route path="edit-restaurant/:id" element={<Restaurantform />} />
            <Route path="manage-bookings" element={<ManageBookings />} />
            <Route path="verify-tickets" element={<VerifyTickets />} />
            <Route path="settings" element={<Settings />} />

          </Route>
        </Route>
        {/* admin routes */}
        <Route path="/cityvibe-admin-panel/login" element={<AdminLogin />} />
        <Route element={<AdminGuard />}>
          <Route path="/cityvibe-admin-panel" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="organizers" element={<Organizers />} />
          </Route>
        </Route>

      </Routes>
      {/* login dialog */}
      <LoginDialog />
      <Toaster />
    </div>
    </>

  )
}

export default App