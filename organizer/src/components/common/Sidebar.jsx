import useLogout from '@/hooks/useLogout'
import { useGetOrganizerProfileQuery } from '@/redux/api/OrganizerApi'
import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'
import { FaTicketSimple } from 'react-icons/fa6'
import { IoIosSettings } from 'react-icons/io'
import { IoTicket } from 'react-icons/io5'
import { LuBuilding2, LuLayoutDashboard } from 'react-icons/lu'
import { MdDining, MdEventNote } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import SidebarShimmer from './SidebarShimmer'

const Sidebar = () => {
    const user = useSelector((state) => state.Auth.user)
    const OrganizerQuery = useGetOrganizerProfileQuery(undefined, {
        skip: !user?.hasOrganizerAccount
    })
    const organizer = OrganizerQuery?.data?.data?.organizer

    const { handleLogout } = useLogout()
    // console.log("organizer",organizer)
    const allLinks = [
        { to: "dashboard", label: "Dashboard", icon: LuLayoutDashboard },
        { to: "manage-events", label: "Manage Events", icon: MdEventNote },
        { to: "create-event", label: "Create Event", icon: FaPlus },
        { to: "manage-dining", label: "Manage Dining", icon: MdDining },
        { to: "manage-bookings", label: "Manage Bookings", icon: FaTicketSimple },
        { to: "verify-tickets", label: "Verification", icon: IoTicket },
        { to: "settings", label: "Settings", icon: IoIosSettings },
    ];
    const getNavClass = (isActive) => isActive ? "bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6] text-white px-3 py-3 rounded-md flex items-center gap-2 shadow-lg shadow-purple-500/30" : "px-3 py-3 mb-2 rounded-md hover:bg-[#6a4dff]/10 hover:text-[#6a4dff] transition-all duration-300";
    const isApproved = user?.hasOrganizerAccount && organizer?.verificationStatus === "approved";
    const showOnboarding = !user?.hasOrganizerAccount || organizer?.verificationStatus === "rejected";

    if (OrganizerQuery?.isLoading && user?.hasOrganizerAccount) {
        return <SidebarShimmer />;
    }
    return (
        <aside className='w-full border-r flex-shrink-0 flex flex-col  h-full bg-white'>
            {
                user?.hasOrganizerAccount && organizer?.verificationStatus === "pending" && (
                    <div className='px-5 py-3'>
                        <NavLink
                            to="pending"
                            className={({ isActive }) => getNavClass(isActive)}
                        >
                            <div className="flex items-center gap-4">
                                <LuBuilding2 size={23} />
                                <span className="text-sm">Verfication Pending</span>
                            </div>
                        </NavLink>
                    </div>
                )
            }
            {
                organizer?.verificationStatus === "rejected" && (
                    <div className="mx-3 mt-3 rounded-md border border-red-200 bg-red-50 p-3">
                        <p className="text-sm font-medium text-red-600">
                            Verfication Rejected
                        </p>

                        {organizer?.rejectionReason && (
                            <p className="mt-1 text-xs text-red-500">
                                {organizer.rejectionReason}
                            </p>
                        )}
                    </div>
                )
            }
            {
                showOnboarding && (
                    <div className='px-5 py-3'>
                        <NavLink
                            to="onboarding"
                            className={({ isActive }) => getNavClass(isActive)}
                        >
                            <div className="flex items-center gap-4">
                                <LuBuilding2 size={23} />
                                <span className="text-sm">On Boarding</span>
                            </div>
                        </NavLink>
                    </div>
                )
            }
            {/* nav links */}
            {
                isApproved && (
                    <nav className='flex px-3 mt-3 py-2 gap-5 flex-col'>
                        {allLinks.map(({ to, label, icon: Icon }) => (
                            <NavLink key={to} to={to} className={({ isActive }) => getNavClass(isActive)}>
                                <div className="flex items-center gap-4">
                                    <Icon size={23} />
                                    <span className="text-sm">{label}</span>
                                </div>
                            </NavLink>
                        ))}
                    </nav>
                )
            }
            <div className="mt-auto border-t">
                {/* Logout */}
                <div
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center justify-between px-5 py-4 gap-3  transition hover:text-red-500 hover:bg-red-500/10"
                >
                    <span>Logout</span>
                    <BiLogOut size={18} />
                </div>
            </div>
        </aside>
    )
}

export default Sidebar