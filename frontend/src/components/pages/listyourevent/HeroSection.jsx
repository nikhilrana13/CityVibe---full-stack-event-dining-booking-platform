import LoginDialog from '../../../components/common/LoginDialog'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const HeroSection = () => {
    const user = useSelector((state)=>state.Auth.user) 
   


  return (
     <section className="relative w-full min-h-[calc(100vh-75px)] flex items-center justify-center overflow-hidden pt-[75px] bg-gradient-to-br from-[#0f051d] via-[#1a0830] to-[#140424]">
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(120,70,255,0.35),transparent_60%)]  animate-pulse"></div>
                {/* Floating Blobs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
                {/* Content */}
                <div className="relative z-10 py-4 text-center px-4 max-w-5xl mx-auto">
                    {/* Badge */}
                    <div className="inline-block mb-6 px-6 py-2 rounded-full border border-purple-500/40  bg-purple-500/10 
                       text-purple-300 text-sm backdrop-blur-md">
                        Elevate your Events to new heights
                    </div>
                    {/* Heading */}
                    <h1 className="text-white font-semibold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                        List all your <br className="hidden sm:block" />
                        <span className="text-gray-200">
                            “Going-Out” events
                        </span> with us
                    </h1>
                    {/* Subtitle */}
                    <p className="mt-6  text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
                        Maximise your event’s reach by listing it on CityVibe, where
                        thousands discover and book exciting events every day.
                    </p>
                    {/* CTA */}
                    <LoginDialog />
                </div>
            </section>
            
  )
}

export default HeroSection