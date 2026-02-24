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
import AddRestaurantform from "./components/organizerdashboard/dining/AddRestaurant/AddRestaurantform"

const App = () => {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dining" element={<Diningpage />} />
        <Route path="/events" element={<Eventspage />} />
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
            <Route path="add-restaurant" element={<AddRestaurantform />} />

          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App