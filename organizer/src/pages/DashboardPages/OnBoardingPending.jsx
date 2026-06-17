
import React from 'react'
import { CgLock } from 'react-icons/cg'


const OnBoardingPending = () => {
  
  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f9fb] to-[#eef1f7] px-4">
      <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl p-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
            <CgLock className="text-yellow-600 animate-pulse" size={36} />
          </div>
        </div>
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Verification Pending
        </h1>
        {/* Message */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Thank you for submitting your details. Our team is currently reviewing
          your organizer profile.
        </p>
        <div className="bg-gray-50 border rounded-xl p-4 mb-6">
          <p className="text-sm  items-center text-gray-600">
             Please allow up to <span className="font-semibold">24 hours</span> for approval.
          </p>
        </div>
        <p className="text-xs text-gray-400 mb-8">
          You will be notified once your verification is complete.
        </p>
      </div>
    </div>
  )
}

export default OnBoardingPending