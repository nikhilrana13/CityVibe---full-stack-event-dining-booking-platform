import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ListYourEvents from './pages/Home';
import OrganizerGuard from './middlewares/OrganizerGuard';
import DashboardLayout from './pages/DashboardLayout';
import OnBoardingPending from './pages/DashboardPages/OnBoardingPending';
import OnBoardingRejected from './pages/DashboardPages/OnBoardingRejected';
import OnBoarding from './pages/DashboardPages/OnBoarding';
import OnBoardingForm from './components/onboarding/OnBoardingForm';
import { ToastContainer } from 'react-toastify';
import OrganizerRouteGuard from './middlewares/OrganizerRouteGuard';
import Dashboard from './pages/DashboardPages/Dashboard';
import Events from './pages/DashboardPages/Events';
import Dining from './pages/DashboardPages/Dining';
import Restaurantform from './components/dining/AddAndEditRestaurant/RestaurantForm';
import CreateEventForm from './components/event/CreateEvent/CreateEventForm';

const App = () => {
  return (
    <div className="w-full">
      {/* routes */}
      <Routes>
        <Route path="/" element={<ListYourEvents />} />
        {/* dashboard routes */}
        <Route element={<OrganizerGuard />}>
          <Route path="/organizer" element={<DashboardLayout />}>

            <Route element={<OrganizerRouteGuard />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            {/* onboarding */}
            <Route path="onboarding">
              <Route index element={<OnBoarding />} />
              <Route path="form" element={<OnBoardingForm />} />
            </Route>

            <Route path="pending" element={<OnBoardingPending />} />
            <Route path="rejected" element={<OnBoardingRejected />} />
            {/* organizer main routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="manage-events" element={<Events />} />
            <Route path="create-event" element={<CreateEventForm />} />
            <Route path="manage-dining" element={<Dining />} />
            <Route path="add-restaurant" element={<Restaurantform />} />
            <Route path="edit-restaurant/:id" element={<Restaurantform />} />

            {/* <Route path="manage-bookings" element={<ManageBookings />} />
            <Route path="verify-tickets" element={<VerifyTickets />} />
            <Route path="settings" element={<Settings />} />   */}
            
          
            </Route>
          </Route>
        </Route>

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 200000 }} />
    </div>
  );
}

export default App;
