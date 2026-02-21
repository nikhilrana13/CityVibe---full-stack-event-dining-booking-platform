import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetchOrganizer from "../hooks/useFetchOrganizer";

const OrganizerStatusGuard = () => {
  const user = useSelector((state) => state.Auth.user);
  const location = useLocation();
  const shouldFetch = user?.hasOrganizerAccount === true;
  const { organizer, loading } = useFetchOrganizer(shouldFetch);

   if (!user) return <Navigate to="/" replace />;
   if (loading) return null;
  const status = organizer?.verificationStatus;
  const path = location.pathname;
  // No organizer account
  if (!user?.hasOrganizerAccount) {
    if (
      path.includes("pending") ||
      path.includes("rejected") ||
      path.includes("dashboard")
    ) {
      return <Navigate to="/organizer/onboarding" replace />;
    }
    return <Outlet />;
  }
  //  Pending
  if (status === "pending") {
    if (!path.includes("pending")) {
      return <Navigate to="/organizer/pending" replace />;
    }
    return <Outlet />;
  }

  //  Rejected
  if (status === "rejected") {
    if (!path.includes("rejected")) {
      return <Navigate to="/organizer/rejected" replace />;
    }
    return <Outlet />;
  }
  //  Approved
  if (status === "approved") {
    if (!path.includes("dashboard")) {
      return <Navigate to="/organizer/dashboard" replace />;
    }
    return <Outlet />;
  }
 
  return <Outlet />;
};

export default OrganizerStatusGuard;