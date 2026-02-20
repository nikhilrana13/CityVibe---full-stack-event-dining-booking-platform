import React, { useRef, useState } from 'react'
import { CiUser } from 'react-icons/ci'
import loginbg from "../../assets/loginbg.avif"
import { IoMdClose } from 'react-icons/io'
import { signInWithPopup, } from 'firebase/auth'
import { auth, GoogleProvider } from '../../config/firebase.js'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Setuser } from '../../redux/AuthSlice'
import { useLocation, useNavigate } from 'react-router-dom'

const LoginDialog = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    const handleLoginWithgoogle = async () => {
        try {
            const result = await signInWithPopup(auth, GoogleProvider)
            const token = await result.user.getIdToken();
            // console.log(result.user)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google-login`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log("response",response?.data)
            if (response.data) {
                toast.success(response?.data?.message)
                localStorage.setItem("token", response?.data?.data?.token)
                const user = response?.data?.data?.user
                dispatch(Setuser(user))
                if (user?.hasOrganizerAccount === true) {
                    try {
                        const orgRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/organizer/profile`, {
                            headers: {
                                Authorization: `Bearer ${response.data.data.token}`
                            }
                        })
                        const status = orgRes?.data?.data?.organizer.verificationStatus
                        if (status === "approved") {
                            navigate("/organizer/dashboard")
                        } else if (status === "pending") {
                            navigate("/organizer/pending")
                        } else {
                            navigate("/organizer/rejected")
                        }
                    } catch (error) {
                        navigate("/")
                    }
                } else {
                    navigate("/");
                }
                handleClose()
            }
        } catch (error) {
            console.error("failed to login with google", error)
            toast.error(error?.response?.data?.message || "Internal server error")
        }
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            {
                location.pathname === "/events/list-your-events" ? (
                    <button onClick={() => setOpen(true)} className="mt-10 px-10 py-4 rounded-2xl  text-white font-semibold text-lg bg-gradient-to-r  from-[#6a4dff] to-[#8b5cf6] hover:scale-105  hover:shadow-purple-500/50 transition-all duration-300 shadow-lg 
                 shadow-purple-600/30">
                        Get started
                    </button>
                ) : (
                    <button onClick={() => setOpen(true)} className='rounded-full cursor-pointer p-2 bg-[#D1D5DB]'>
                        <CiUser size={25} className='text-white' />
                    </button>
                )
            }
            {/* model */}
            {
                open && (
                    <div className='fixed top-0 left-0 z-[100000] px-3  flex w-screen h-screen justify-center  items-center'>
                        {/* backdrop */}
                        <div className='absolute inset-0 bg-gray-900/60 backdrop-blur-sm' onClick={() => handleClose()} />
                        {/* content */}
                        <div className={`w-full relative overflow-hidden transform transition-all duration-300 max-w-lg rounded-xl shadow-md bg-white ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-0 translaye-y-4"}`}>
                            <div className='flex flex-col'>
                                {/* image */}
                                <div className='w-full hidden lg:flex h-[250px] bg-cover bg-top relative  justify-center items-center ' style={{ backgroundImage: `url(${loginbg})` }}>
                                    <button onClick={() => handleClose()} className="text-white absolute top-4 right-4 cursor-pointer">
                                        <IoMdClose size={20} />
                                    </button>
                                    <div className="flex flex-col gap-2 items-center justify-center text-white text-center">
                                        <h1 className="text-5xl font-bold tracking-tight">
                                            CityVibe
                                        </h1>
                                        <p className="uppercase tracking-[0.35em] text-xs opacity-80">
                                            Discover. Dine. Celebrate.
                                        </p>
                                    </div>
                                </div>
                                {/* form */}
                                <div className='relative flex flex-col px-3  py-4 gap-3'>
                                    <div className='flex lg:hidden justify-end'>
                                        <button onClick={() => setOpen(false)} className="  text-black cursor-pointer">
                                            <IoMdClose size={20} />
                                        </button>
                                    </div>
                                    <div className='flex justitfy-center  gap-1 items-center flex-col '>
                                        <h3 className='text-[1.3rem] text-center font-bold'>Welcome back!</h3>
                                        <p className='text-gray-500 text-center text-[0.9rem]'>Login securely using your Google account.</p>
                                        <button onClick={() => handleLoginWithgoogle()} className="w-full m-2 max-w-[380px] border py-4 border-gray-300 cursor-pointer rounded-md flex items-center justify-center gap-2 hover:bg-gray-50">
                                            <img
                                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                                alt="google"
                                                className="w-5"
                                            />
                                            <span className="text-sm font-medium">Continue with Google</span>
                                        </button>
                                        {/* Coming Soon Text */}
                                        <p className='text-xs text-gray-400 mt-4'>
                                            More sign-in options coming soon 🚀
                                        </p>

                                        {/* Terms */}
                                        <p className='text-gray-500 text-center text-[0.75rem] mt-2 max-w-[300px]'>
                                            By continuing, you agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default LoginDialog