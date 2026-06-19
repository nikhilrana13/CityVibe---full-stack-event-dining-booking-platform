import React, { useEffect } from 'react'

const SucessDialog = ({data,onClose}) => {
     if (!data) return null

   useEffect(() => {
   const timer = setTimeout(() => {
      onClose()
   }, 2000)

   return () => clearTimeout(timer)
}, [])
  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
  {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-300/20 rounded-full blur-3xl"></div>

  {/* Header */}
  <div className="flex items-center gap-4">
    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center shadow-inner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-emerald-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-emerald-700">
        Ticket Verified
      </h2>
      <p className="text-sm text-gray-500">
        Entry Approved Successfully
      </p>
    </div>
  </div>
  {/* Divider */}
  <div className="h-px bg-emerald-200"></div>
  {/* Details Section */}
  <div className="grid grid-cols-2 gap-6 text-sm">
    <div>
     <p className="text-gray-400 text-xs">User</p>
      <p className="font-semibold text-gray-900">
        {data.user?.name}
      </p>
      <p className="text-xs text-gray-500">
        {data.user?.email}
      </p>
    </div>
    <div>
      <p className="text-gray-400 text-xs">Event</p>
      <p className="font-semibold text-gray-900">
        {data.event}
      </p>
    </div>
    <div>
      <p className="text-gray-400 text-xs">Total Seats</p>
      <p className="font-semibold text-gray-900">
        {data.totalSeats}
      </p>
    </div>
    <div>
      <p className="text-gray-400 text-xs">Scan Time</p>
      <p className="font-semibold text-gray-900">
        {new Date(data.scanTime).toLocaleTimeString()}
      </p>
    </div>
  </div>
  {/* Footer Action */}
  <button onClick={onClose} className="mt-6 bg-emerald-600 hover:bg-emerald-700 transition text-white py-3 rounded-2xl font-semibold shadow-lg shadow-emerald-500/30">
    Done
  </button>
        </div>
     </div>
  
  )
}

export default SucessDialog