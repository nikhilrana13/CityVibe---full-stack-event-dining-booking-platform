import React from 'react'

const BookingTabs = ({activeTab,setActiveTab}) => {
  return (
    <div className="relative w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex">
      
      {/* Sliding Background Indicator */}
      <div
        className={`absolute top-2 bottom-2 w-1/2 rounded-xl transition-all duration-300 
        bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30
        ${activeTab === "events" ? "left-2" : "left-1/2"}`}
      />

      {/* Events Tab */}
      <button
        onClick={() => setActiveTab("events")}
        className={`relative z-10 flex-1 py-3 rounded-xl font-medium transition-all duration-300
        ${activeTab === "events" ? "text-white" : "text-gray-400 hover:text-gray-500"}`}
      >
        <span className="flex items-center justify-center gap-2">
          Events
        </span>
      </button>

      {/* Dining Tab */}
      <button
        onClick={() => setActiveTab("dining")}
        className={`relative z-10 flex-1 py-3 rounded-xl font-medium transition-all duration-300
        ${activeTab === "dining" ? "text-white" : "text-gray-400 hover:text-gray-500"}`}
      >
        <span className="flex items-center justify-center gap-2">
          Dining
        </span>
      </button>
    </div>

  )
}

export default BookingTabs