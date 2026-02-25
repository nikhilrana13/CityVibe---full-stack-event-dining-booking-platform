import React from 'react'
import { useFormContext } from 'react-hook-form';

const RestaurantReview = () => {
    const { watch } = useFormContext();
    const data = watch();
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
                            <h3 className="text-xl font-semibold">{data.name || "NA"}</h3>
                            {data.cuisine && data.cuisine.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {data.cuisine.map((item, index) => (
                                        <span key={index} className="text-sm text-gray-400">
                                            {item}
                                            {index < data.cuisine.length - 1 && <span className="ml-2">•</span>}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="text-sm text-gray-300 space-y-1">
                                <p>📍 {data.city || "NA"}, {data.address || "NA"}</p>
                                <p>💰 Avg Price: ₹{data.averagePrice || "NA"}</p>
                                <p>⏰ {data.openingTime || "NA"} – {data.closingTime || "NA"}</p>
                            </div>
                            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-sm text-gray-300">
                                {data.description || "NA"}
                            </div>
                        </div>
                        {/* Right Image Preview */}
                        <div className="rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-600/20 h-48 flex items-center justify-center text-gray-400 text-sm">
                            {data.images && data.images.length > 0 ? (
                                <img 
                                    src={URL.createObjectURL(data.images[0])}
                                    alt="Restaurant Preview"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    No Image Selected
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Amenities (Available facility) */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <h3 className="text-lg font-semibold mb-6">Amenities</h3>
                    <div className="flex flex-wrap gap-3">
                        {data.availablefacility && data.availablefacility.length > 0 ? (
                            data.availablefacility.map((item, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-gray-300"
                                >
                                    {item}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No facilities selected</p>
                        )}
                    </div>
                </div>
                {/* Timing details */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <h3 className="text-lg font-semibold mb-6">Operating Hours</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <p className="text-gray-400 mb-1">Main Hours</p>
                            <p>{data.openingTime || "NA"} – {data.closingTime || "NA"} PM</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <p className="text-gray-400 mb-1">Lunch Slot</p>
                            <p> {data.lunchStart || "NA"} – {data.lunchEnd || "NA"}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <p className="text-gray-400 mb-1">Dinner Slot</p>
                            <p>{data.dinnerStart} – {data.dinnerEnd}</p>
                        </div>
                    </div>
                </div>
                {/* contact details*/}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                    <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
                    <div className="flex flex-col gap-2 text-sm text-gray-300">
                        {
                            data.contactnumbers.map((c) => {
                                return (
                                    <p>📞 {c}</p>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RestaurantReview