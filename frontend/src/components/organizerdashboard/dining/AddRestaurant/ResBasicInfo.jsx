import React from 'react'
import { useFormContext } from 'react-hook-form'

const ResBasicInfo = () => {
    const { register, formState: { errors } } = useFormContext()
    return (
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                    <div className='flex flex-col gap-1'>
                        <label className="text-sm text-gray-400">Restaurant Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Skyline Rooftop Dining"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            {...register("name", { required: "Name is Required" })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className="text-sm text-gray-400">Description</label>
                        <textarea
                            rows="5"
                            placeholder="Tell guests about your vibe..."
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            {...register("description", {
                                required: "Description is Required",
                                minLength: {
                                    value: 20,
                                    message: "Minimum 20 characters required"
                                }
                            })}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className="text-sm text-gray-400">Slot Interval</label>
                        <select
                            className="mt-2 w-full  text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            {...register("slotInterval")}
                        >
                            <option value="">Select Interval</option>
                            <option value="15">15 Minutes</option>
                            <option value="30">30 Minutes</option>
                            <option value="45">45 Minutes</option>
                            <option value="60">60 Minutes</option>
                            <option value="90">90 Minutes</option>
                            <option value="120">120 Minutes</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div className='flex flex-col gap-1'>
                        <label className="text-sm text-gray-400">City</label>
                        <input
                            type="text"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            {...register("city", { required: "City is Required" })}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm">{errors.city.message}</p>
                        )}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className="text-sm text-gray-400">location</label>
                        <input
                            type="text"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            {...register("location", { required: "Location is Required" })}
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm">{errors.location.message}</p>
                        )}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className="text-sm text-gray-400">Address</label>
                        <input
                            type="text"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            {...register("address", { required: "Address is Required" })}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className="text-sm text-gray-400">Average Price (₹)</label>
                        <input
                            type="number"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            {...register("averagePrice", {
                                required: "Average price is Required",
                                min: {
                                    value: 100,
                                    message: "Minimum ₹100 required"
                                }
                            })}
                        />
                        {errors.averagePrice && (
                            <p className="text-red-500 text-sm">{errors.averagePrice.message}</p>
                        )}
                    </div>

                </div>
            </div>
        </div>


    )
}

export default ResBasicInfo