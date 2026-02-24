import React from 'react'

const RestaurantReview = () => {
    return (
        <div className='max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl'>
            <div className="flex flex-col gap-12">
                {/* Header */}
                <div>
                    <h2 className="text-2xl font-semibold">Review Your Restaurant</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Please review all details before publishing.
                    </p>
                </div>
                {/* Hero preview*/}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Left Content */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-semibold">Skyline Rooftop Dining</h3>
                            <p className="text-sm text-gray-400">
                                Italian • Asian • Continental
                            </p>
                            <div className="text-sm text-gray-300 space-y-1">
                                <p>📍 Mumbai, Bandra West</p>
                                <p>💰 Avg Price: ₹1200</p>
                                <p>⏰ 11:00 AM – 11:00 PM</p>
                            </div>
                            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-sm text-gray-300">
                                A premium rooftop dining experience offering handcrafted cocktails,
                                gourmet cuisine, and skyline sunset views.
                            </div>
                        </div>
                        {/* Right Image Preview */}
                        <div className="rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-600/20 h-48 flex items-center justify-center text-gray-400 text-sm">
                            Cover Image Preview
                        </div>
                    </div>
                </div>

                {/* Amenities (Available facility) */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <h3 className="text-lg font-semibold mb-6">Amenities</h3>
                    <div className="flex flex-wrap gap-3">
                        {["Free WiFi", "Parking", "Live Music", "Outdoor Seating", "AC"].map((item, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-gray-300"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
                {/* Timing details */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <h3 className="text-lg font-semibold mb-6">Operating Hours</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <p className="text-gray-400 mb-1">Main Hours</p>
                            <p>11:00 AM – 11:00 PM</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <p className="text-gray-400 mb-1">Lunch Slot</p>
                            <p>12:00 PM – 3:00 PM</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <p className="text-gray-400 mb-1">Dinner Slot</p>
                            <p>7:00 PM – 10:30 PM</p>
                        </div>
                    </div>
                </div>
                {/* contact details*/}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
                    <div className="flex flex-col gap-2 text-sm text-gray-300">
                        <p>📞 +91 9876543210</p>
                        <p>📞 +91 9123456789</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RestaurantReview