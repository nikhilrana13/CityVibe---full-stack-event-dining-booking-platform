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

const App = () => {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dining" element={<Diningpage />} />
        <Route path="/events" element={<Eventspage />} />
        <Route path="/bookings" element={<Bookings />} />

        <Route path="/events/:id/:slug" element={<EventDetailsPage />} />
        <Route path="/events/:id/:slug/book" element={<BookEventTickets />}/>
        <Route path="/events/category/:category" element={<CategoryDetailPage />} />
        <Route path="/dining/:city/:id/:slug" element={<RestaurantDetailsPage />} />

        {/* for testing */}
        <Route path="/payment-success" element={<UpdateEventBookingStatus />} />

        {/* for organizers */}
        <Route path="/events/list-your-events" element={<ListYourEvents />} />
        {/* onboarding flow */}
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
            <Route path="settings" element={<Settings />}  />

          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App