import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import { ToastContainer } from 'react-toastify';
import AdminGuard from './middleware/AdminGuard';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Organizers from './pages/Organizers';
import Campaigns from './pages/Campaigns';

const App = () => {
  return (
    <div className='w-full'>
      {/* routes */}
      <Routes>
         <Route path="/" element={<Navigate to="/admin/login" />} />
         <Route path="/admin/login" element={<AdminLogin />} />
         {/* dashboard routes  */}
         <Route element={<AdminGuard />}>

         <Route path="/admin" element={<DashboardLayout />}>
         {/*main index */}
           <Route index element={<Navigate to="dashboard" replace />} /> 
            {/*dashboard routes*/}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="organizers" element={<Organizers />} />
            <Route path="campaigns" element={<Campaigns />} />
         </Route>
                    
        </Route>

         
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 200000 }} />
    </div>
  );
}

export default App;
