import React, { useState } from 'react'
import { CiUser } from 'react-icons/ci'
import loginbg from "../../assets/loginbg.avif"
import { IoMdClose } from 'react-icons/io'
import CustomPhoneInput from './CustomPhoneInput'

const LoginDialog = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button onClick={() => setOpen(true)} className='rounded-full cursor-pointer p-2 bg-[#D1D5DB]'>
                <CiUser size={25} className='text-white' />
            </button>
            {/* model */}
            {
                open && (
                    <div className='fixed top-0 left-0 z-[100000] px-3  flex w-screen h-screen justify-center  items-center'>
                        {/* backdrop */}
                        <div className='absolute inset-0 bg-gray-900/60 backdrop-blur-sm' onClick={() => setOpen(false)} />
                        {/* content */}
                        <div className={`w-full relative overflow-hidden transform transition-all duration-300 max-w-lg rounded-xl shadow-md bg-white ${open ? "opacity-100 scale-100 translate-y-0":"opacity-0 scale-0 translaye-y-4"}`}>
                            <div className='flex flex-col'>
                                {/* image */}
                                <div className='w-full hidden lg:flex h-[250px] bg-cover bg-top relative  justify-center items-center ' style={{ backgroundImage: `url(${loginbg})` }}>
                                    <button onClick={() => setOpen(false)} className="text-white absolute top-4 right-4 cursor-pointer">
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
                                <div className='relative flex flex-col px-3 py-4 gap-3'>
                                    <div className='flex  justify-end'>
                                          <button onClick={() => setOpen(false)} className=" block lg:hidden  text-black cursor-pointer">
                                        <IoMdClose size={20} />
                                    </button>

                                    </div>
                                    <div className='flex justitfy-center items-center flex-col '>
                                          <h3 className='text-[1.3rem] text-center font-bold'>Enter your mobile number</h3>
                                    <p className='text-gray-500 text-center text-[0.9rem]'>If you don't have an account yet, we'll create one for you</p>
                                    <div className='relative '>
                                        <CustomPhoneInput  />
                                    </div>
                                   <button className='bg-black mt-1 rounded-xl w-full max-w-[380px] px-10 text-white py-3 '>Continue</button>
                                   <p className='text-gray-500 text-[0.9rem] mt-2'>By continuing, you agree to our</p>
                                    <span className='flex  text-gray-500 mt-2 text-[0.7rem] gap-4'>Terms of Service <span>Privacy policy</span></span>

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