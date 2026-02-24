import React from 'react'

const AmenitiesAndContact = () => {
    return (
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col gap-10">
                {/* Section Header */}
                <div>
                    <h2 className="text-xl font-semibold">Amenities & Contact</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Tell customers what makes your restaurant special.
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                    <h3 className="text-lg font-semibold mb-5">Cuisine</h3>
                    <div className="flex flex-wrap gap-3">
                        {["Italian", "North Indian", "Chinese", "Mexican", "Continental", "Asian", "Cafe","Continental"].map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                className="px-4 py-2 rounded-full text-sm border border-white/10 bg-white/5 hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        Select one or more cuisine types.
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                    <h3 className="text-lg font-semibold mb-5">Available Facilities</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            "Free WiFi",
                            "Parking",
                            "Live Music",
                            "Outdoor Seating",
                            "AC",
                            "Bar Available",
                            "Pet Friendly",
                            "Private Dining"
                        ].map((facility, index) => (
                            <button
                                key={index}
                                type="button"
                                className="px-4 py-3 rounded-xl text-sm border border-white/10 bg-white/5 hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300 text-left"
                            >
                                {facility}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Contact Numbers*/}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                    <h3 className="text-lg font-semibold mb-5">Contact Numbers</h3>
                    <div className="flex flex-col gap-4">
                        {/* Single Contact Input */}
                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="+91 9876543210"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />

                            <button type='button' className="px-4 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition">
                                Remove
                            </button>
                        </div>
                        {/* Add Button */}
                        <button type='button' className="w-fit px-5 py-2 rounded-xl border border-dashed border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 transition">
                            + Add Another Number
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        Add one or more contact numbers for reservations.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default AmenitiesAndContact