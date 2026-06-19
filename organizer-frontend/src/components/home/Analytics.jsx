import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'

const Analytics = () => {
  return (
<section className="relative w-full py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-[#0f051d] via-[#1a0830] to-[#140424]
  overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
    {/* LEFT SIDE */}
    <div className="relative flex justify-center lg:justify-start">
      {/* Wrapper for proper stacking */}
      <div className="relative w-full max-w-[400px]">
        {/* Main Card */}
        <div className=" relative bg-white  rounded-3xl  p-6 sm:p-8 shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                Ticket sold
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                November 1–20
              </p>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#545459] rounded-full flex items-center justify-center">
              <FiArrowUpRight size={23} className='text-white' />
            </div>
          </div>
          <p className="text-3xl sm:text-4xl font-bold text-green-600 mt-6">
            301
          </p>
          {/* Fake graph */}
          <div className="mt-6 h-20 sm:h-24 bg-gradient-to-t from-green-100 to-transparent rounded-xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-green-500/30 rounded-t-full"></div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="mt-6 lg:mt-0 lg:absolute lg:bottom-[-30px] lg:right-[-40px] bg-white rounded-3xl p-6 sm:p-7 shadow-xl
          w-full sm:w-[85%]">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Total revenue
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                November 1–20
              </p>
            </div>
            <div className="w-8 h-8 bg-[#545459] rounded-full flex items-center justify-center text-sm">
                <FiArrowUpRight size={23} className='text-white' />
            </div>
          </div>

          <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-4">
            ₹9,000
          </p>
        </div>

      </div>

    </div>


    {/* RIGHT SIDE TEXT */}
    <div className="text-white text-center lg:text-left">

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-10">
        Grow eventfully
      </h2>

      <div className="space-y-10">

        <div>
          <h3 className="text-xl sm:text-2xl font-semibold">
            Traffic insights
          </h3>
          <p className="text-gray-300 mt-3 text-base sm:text-lg leading-relaxed">
            Track the number of views, tickets sold and
            interest in your event.
          </p>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-semibold">
            Marketing impact
          </h3>
          <p className="text-gray-300 mt-3 text-base sm:text-lg leading-relaxed">
            Understand which promotions or campaigns
            are driving the most traffic and conversions.
          </p>
        </div>

      </div>

    </div>

  </div>

</section>
  )
}

export default Analytics