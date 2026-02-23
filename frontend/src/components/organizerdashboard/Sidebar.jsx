import useFetchOrganizer from '../../hooks/useFetchOrganizer'
import useLogout from '../../hooks/useLogout'
import { Building2, LogOut, Plus, Settings2 } from 'lucide-react'
import React from 'react'
import { BiBuilding } from 'react-icons/bi'
import { FaTicketSimple } from 'react-icons/fa6'
import { LuLayoutDashboard } from 'react-icons/lu'
import { MdDining, MdEventNote } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const user = useSelector((state) => state.Auth.user)
    const shouldfetch = user?.hasOrganizerAccount === true
    const { handleLogout } = useLogout()
    const { organizer, loading } = useFetchOrganizer(shouldfetch)
    if (loading) return null
    // console.log("organizer",organizer)
    const links = [
        { to: "dashboard", label: "Dashboard", icon: LuLayoutDashboard },
        { to: "manage-events", label: "Manage Events", icon: MdEventNote },
         { to: "create-event", label: "Create Event", icon: Plus },
        { to: "manage-dining", label: "Manage Dining", icon: MdDining },
        { to: "bookings", label: "Manage Bookings", icon: FaTicketSimple },
        { to: "settings", label: "Settings", icon: Settings2 },
    ];
    const getNavClass = (isActive) => isActive ? "bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6] text-white px-3 py-3 rounded-md flex items-center gap-2 shadow-lg shadow-purple-500/30" : "px-3 py-3 mb-2 rounded-md hover:bg-[#6a4dff]/10 hover:text-[#6a4dff] transition-all duration-300";
    const isApprovedOrganizer = user?.hasOrganizerAccount && organizer?.verificationStatus === "approved";
    const showOnboarding = !user?.hasOrganizerAccount || organizer?.verificationStatus === "rejected";

    return (
        <aside className='w-full border-r flex-shink-0 flex flex-col  h-full bg-white'>
            {
                user?.hasOrganizerAccount && organizer?.verificationStatus === "pending" && (
                    <div className='px-5 py-3 text-sm text-yellow-600'>
                        Verification Pending
                    </div>
                )
            }
             {
                showOnboarding && (
                    <div className='px-5 py-3 '>
                 <NavLink to="onboarding" className={({ isActive }) => getNavClass(isActive)} > <div className="flex items-center gap-4"> <Building2 size={23} /> <span className="transition-opacity text-sm duration-500">OnBoarding</span> </div> </NavLink>
              </div>
                )
             }
            {/* nav links */}
            {
                isApprovedOrganizer && (
                    <nav className='flex px-3 mt-3 py-2 gap-5 flex-col'>
                        {links.map(({ to, label, icon: Icon }) => (
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
            <div onClick={handleLogout} className='mt-auto flex cursor-pointer items-center justify-between px-5 py-4 gap-3 border-t  transition hover:text-red-500 hover:bg-red-500/10 '>
                <span>Logout</span>
                <LogOut />
            </div>

        </aside>
    )
}

export default Sidebar