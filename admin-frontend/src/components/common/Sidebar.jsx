import axios from 'axios';
import { VscOrganization } from "react-icons/vsc";
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GrDashboard } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { SetUser } from '@/redux/AuthSlice';
import { MdCampaign, MdDashboard } from 'react-icons/md';



const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

     const links = [
        { to: "dashboard", label: "Dashboard", icon: MdDashboard },  
        { to: "organizers", label: "Organizers", icon: VscOrganization  }, 
        { to: "campaigns", label: "Campaigns", icon: MdCampaign }, 
    ];
    const getNavClass = (isActive) => isActive ? "bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6] text-white px-3 py-3 rounded-md flex items-center gap-2 shadow-lg shadow-purple-500/30" : "px-3 py-3 mb-2 rounded-md hover:bg-[#6a4dff]/10 hover:text-[#6a4dff] transition-all duration-300";
    const handleLogout = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("adminToken")}`
                },
            })
            if(response.data){
                toast.success(response?.data?.message)
                localStorage.removeItem("adminToken")
                dispatch(SetUser(null))
                navigate("/admin/login")
            }
        } catch (error) {
            console.error("failed to logout",error)
            toast.error(error?.response?.data?.message || "Internal server error")
        }
    }
    
    
    return (
        <aside className='w-full border-r flex-shink-0 flex flex-col  h-full bg-white'>

            {/* nav links */}
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
            <div className="mt-auto border-t">
                {/* Logout */}
                <div onClick={handleLogout} className="flex cursor-pointer items-center justify-between px-5 py-4 gap-3  transition hover:text-red-500 hover:bg-red-500/10"
                >
                    <span>Logout</span>
                    <BiLogOut size={18} />
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
