import React from 'react'

const ReviewForm = () => {
    return (
        <div className='max-w-5xl mx-auto flex flex-col gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl'>
            {/* Event preview Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left - Event Info */}
                    <div className="flex flex-col gap-4">

                        <div>
                            <h3 className="text-xl font-semibold">Rooftop Jazz Night</h3>
                            <p className="text-gray-400 text-sm">Music • Live Performance</p>
                        </div>

                        <div className="text-sm text-gray-300">
                            <p>📅 12 March 2026 • 7:00 PM - 11:00 PM</p>
                            <p>📍 Skyline Lounge, Mumbai</p>
                        </div>

                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-sm text-gray-300">
                            Experience an unforgettable evening of live jazz under the stars.
                        </div>

                    </div>

                    {/* Right - Cover Placeholder */}
                    <div className="rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-600/20 flex items-center justify-center h-48">
                        <span className="text-gray-400 text-sm">
                            Event Cover Preview
                        </span>
                    </div>

                </div>
            </div>
            {/* tickets */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <h3 className="text-lg font-semibold mb-6">Tickets Overview</h3>
                <div className="space-y-4">
                    {/* Ticket Row */}
                    <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                        <div>
                            <p className="font-medium">Early Bird</p>
                            <p className="text-xs text-gray-400">50 Tickets • 1 Pax</p>
                        </div>
                        <span className="font-semibold text-indigo-400">₹499</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                        <div>
                            <p className="font-medium">VIP Pass</p>
                            <p className="text-xs text-gray-400">30 Tickets • 1 Pax</p>
                        </div>
                        <span className="font-semibold text-indigo-400">₹999</span>
                    </div>
                </div>
            </div>
            {/*Artist*/}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <h3 className="text-lg font-semibold mb-6">Artist Lineup</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Artist Card */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-indigo-500/30 flex items-center justify-center text-sm text-gray-400 mb-3">
                            Image
                        </div>
                        <p className="font-medium">DJ Nova</p>
                        <p className="text-xs text-gray-400 mt-1">
                            International EDM artist known for rooftop sets.
                        </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-indigo-500/30 flex items-center justify-center text-sm text-gray-400 mb-3">
                            Image
                        </div>
                        <p className="font-medium">Arjun Rao</p>
                        <p className="text-xs text-gray-400 mt-1">
                            Stand-up comedian featured on Netflix specials.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewForm