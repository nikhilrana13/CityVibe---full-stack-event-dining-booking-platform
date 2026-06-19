import React from 'react';
import loginbg from "../../assets/loginbg.avif"
import { useDialog } from '@/context/useDialog';
import { IoMdClose } from 'react-icons/io';
import { signInWithPopup } from 'firebase/auth';
import { auth, GoogleProvider } from '@/config/firebase';
import { api } from '@/services/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { SetUser } from '@/redux/AuthSlice';
import { useNavigate } from 'react-router-dom';


const LoginDialog = ({ onClose }) => {
    const { isLoginDialogOpen,setIsLoginDialogOpen} = useDialog()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClose = async () => {
        onClose && onClose()
    }
    // handle login with google 
    const handleLoginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, GoogleProvider)
            const response = await api.post("/api/auth/test-google", {})
            if (response) {
                toast.success(response?.message)
                const user = response?.data?.user
                const token = response?.data?.token
                localStorage.setItem("token", token)
                dispatch(SetUser(user))
                setIsLoginDialogOpen(false); 
                if (user?.hasOrganizerAccount) {
                    navigate("/organizer");
                } else {
                    navigate("/organizer/onboarding")
                }
            }
        } catch (error) {
            console.error("Failed to login with google", error)
            toast.error(error?.response?.data.message || "Internal server error")
        }
    }

    return (
        <div className='fixed top-0 left-0 z-[1000000] px-3  flex w-screen h-screen justify-center  items-center'>
            {/* backdrop */}
            <div className='absolute inset-0 bg-gray-900/60 backdrop-blur-sm' onClick={() => handleClose()} />
            {/* content */}
            <div className={`w-full relative overflow-hidden transform transition-all duration-300 max-w-lg rounded-xl shadow-md bg-white ${isLoginDialogOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-0 translaye-y-4"}`}>
                <div className='flex flex-col'>
                    {/* image */}
                    <div className='w-full hidden lg:flex h-[250px] bg-cover bg-top relative  justify-center items-center ' style={{ backgroundImage: `url(${loginbg})` }}>
                        <button onClick={handleClose} className="text-white absolute top-4 right-4 cursor-pointer">
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
                            <button onClick={handleClose} className="  text-black cursor-pointer">
                                <IoMdClose size={20} />
                            </button>
                        </div>
                        <div className='flex justitfy-center  gap-1 items-center flex-col '>
                            <h3 className='text-[1.3rem] text-center font-bold'>Welcome back!</h3>
                            <p className='text-gray-500 text-center text-[0.9rem]'>Login securely using your Google account.</p>
                            <button onClick={handleLoginWithGoogle} className="w-full m-2 max-w-[380px] border py-4 border-gray-300 cursor-pointer rounded-md flex items-center justify-center gap-2 hover:bg-gray-50">
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
    );
}

export default LoginDialog;
