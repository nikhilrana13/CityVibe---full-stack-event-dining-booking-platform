import React from 'react'

const HowToList = () => {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-[#0f051d] via-[#1a0830] to-[#140424]">
  {/* Section Title */}
  <h2 className="text-center text-4xl sm:text-5xl font-semibold bg-gradient-to-r  from-blue-300  to-purple-400 bg-clip-text text-transparent mb-16">
    How to list your events
  </h2>
  {/* Glass Card Container */}
  <div className="absolute inset-0  bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
  <div className="relative max-w-6xl mx-auto px-6 ">
    <div className="rounded-[40px]  border border-white/20 bg-white/5  backdrop-blur-xl  p-12">
    <div className="grid md:grid-cols-3 gap-12 items-center text-center">
        {/* Step 1 */}
        <div>
          <div className="text-6xl font-bold text-white/80 mb-6">
            01
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Register
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Sign up as an organiser in minutes
          </p>
        </div>
        {/* Arrow */}
        <div className="hidden md:flex justify-center">
          <span className="text-4xl text-white/60">»</span>
        </div>
        {/* Step 2 */}
        <div>
          <div className="text-6xl font-bold text-white/80 mb-6">
            02
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">
            List your event
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Add event details, images & ticketing information
          </p>
        </div>
        {/* Arrow */}
        <div className="hidden md:flex justify-center">
          <span className="text-4xl text-white/60">»</span>
        </div>
        {/* Step 3 */}
        <div>
          <div className="text-6xl font-bold text-white/80 mb-6">
            03
          </div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Event is live
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            Your event is now live on CityVibe
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default HowToList