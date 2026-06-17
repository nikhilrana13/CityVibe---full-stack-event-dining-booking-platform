import FullPageLoader from "@/components/common/FullPageLoader";
import { useGetOrganizerProfileQuery } from "@/redux/api/OrganizerApi";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const OrganizerRouteGuard = () => {
    const location = useLocation();
    const user = useSelector((state) => state.Auth.user);

    const { data, isLoading } = useGetOrganizerProfileQuery(undefined, {
        skip: !user?.hasOrganizerAccount,
    });

    const organizer = data?.data?.organizer;
    const status = organizer?.verificationStatus;

    if (isLoading && user?.hasOrganizerAccount) {
        return <FullPageLoader />;
    }

    const pathname = location.pathname;

    // New organizer (not applied yet)
    if (!user?.hasOrganizerAccount) {
        const allowedRoutes = [
            "/organizer/onboarding",
            "/organizer/onboarding/form",
        ];

        if (!allowedRoutes.includes(pathname)) {
            return <Navigate to="/organizer/onboarding" replace />;
        }
        return <Outlet />;
    }

    // Pending
    if (status === "pending") {
        if (pathname !== "/organizer/pending") {
            return <Navigate to="/organizer/pending" replace />;
        }
        return <Outlet />;
    }

    // Rejected
    if (status === "rejected") {
        const allowedRoutes = [
            "/organizer/rejected",
            "/organizer/onboarding",
            "/organizer/onboarding/form",
        ];
        if (!allowedRoutes.includes(pathname)) {
            return <Navigate to="/organizer/rejected" replace />;
        }
        return <Outlet />;
    }

    // Approved
    if (status === "approved") {
        const blockedRoutes = [
            "/organizer/onboarding",
            "/organizer/onboarding/form",
            "/organizer/pending",
            "/organizer/rejected",
        ];
        if (blockedRoutes.includes(pathname)) {
            return <Navigate to="/organizer/dashboard" replace />;
        }
        return <Outlet />;
    }
    return <Navigate to="/organizer/onboarding" replace />;
};

export default OrganizerRouteGuard;