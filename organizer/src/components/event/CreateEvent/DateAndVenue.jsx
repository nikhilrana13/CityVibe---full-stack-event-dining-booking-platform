import React from 'react'
import { useFormContext } from 'react-hook-form'

const DateAndVenue = () => {
    const { register, watch, formState: { errors } } = useFormContext()
    const startDate = watch("startDate")

    return (
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
                {/* LEFT SIDE */}
                <div className="flex flex-col gap-6">
                    {/* Start Date */}
                    <div className='flex flex-col gap-1'>
                        <label className="text-sm text-gray-400">Start Date</label>
                        <input
                            type="date"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            min={new Date().toISOString().split("T")[0]}
                            {...register("startDate", { required: "Start Date is Required" })}
                        />
                        {errors.startDate && (
                            <p className="text-red-500 text-sm">{errors.startDate.message}</p>
                        )}
                    </div>
                    {/* End Date */}
                    <div>
                        <label className="text-sm text-gray-400">End Date</label>
                        <input
                            type="date"
                             min={startDate || new Date().toISOString().split("T")[0]}
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            {...register("endDate", {
                                validate: (value) =>
                                    !value ||
                                    !startDate ||
                                    value >= startDate ||
                                    "End date cannot be before start date",
                            })}
                        />
                        {errors.endDate && (
                            <p className="text-red-500 text-sm">{errors.endDate.message}</p>
                        )}
                    </div>
                    {/* Start Time */}
                    <div>
                        <label className="text-sm text-gray-400">Start Time</label>
                        <input
                            type="time"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            {...register("starttime", { required: "Start Time is Required" })}
                        />
                        {errors.starttime && (
                            <p className="text-red-500 text-sm">{errors.starttime.message}</p>
                        )}

                    </div>
                    {/* Capacity */}
                    <div>
                        <label className="text-sm text-gray-400">Total Seats</label>
                        <input
                            type="number"
                            placeholder="e.g., 200"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            min={1}
                            inputMode="numeric"
                            {...register("totalSeats", {
                                required: "Total Seats is Required", min: {
                                    value: 1,
                                    message: "Seats must be at least 1",
                                },
                            })}
                        />
                        {errors.totalSeats && (
                            <p className="text-red-500 text-sm">{errors.totalSeats.message}</p>
                        )}
                    </div>
                </div>
                {/* RIGHT SIDE */}
                <div className="flex flex-col gap-6">
                    {/* Venue Name */}
                    <div>
                        <label className="text-sm text-gray-400">Venue Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Skyline Rooftop Lounge"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            {...register("venue", { required: "Venue Name is Required" })}
                        />
                        {errors.venue && (
                            <p className="text-red-500 text-sm">{errors.venue.message}</p>
                        )}
                    </div>
                    {/* Location */}
                    <div>
                        <label className="text-sm text-gray-400">Location</label>
                        <input
                            type="text"
                            placeholder="e.g near by"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            {...register("location", { required: "Location is Required" })}
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm">{errors.location.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="text-sm text-gray-400">City</label>
                        <input
                            type="text"
                            placeholder="City"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            {...register("city", { required: "City is Required" })}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm">{errors.city.message}</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DateAndVenue