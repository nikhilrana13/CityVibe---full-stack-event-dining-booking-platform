import React from 'react'
import { useFormContext } from 'react-hook-form'

const TimingAndSlots = () => {
  const { register, watch, formState: { errors } } = useFormContext()
  const openingTime = watch("openingTime")
  const lunchStart = watch("lunchStart")
  const dinnerStart = watch("dinnerStart")

  return (
    <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
      <div className="flex flex-col gap-10">
        {/* Section Header */}
        <div>
          <h2 className="text-xl font-semibold">Timing & Service Slots</h2>
          <p className="text-gray-400 text-sm mt-1">
            Set your restaurant’s operational hours and meal slots.
          </p>
        </div>
        {/* Operating Hours */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <h3 className="text-lg font-semibold mb-6">Main Operating Hours</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Opening Time */}
            <div className='flex flex-col gap-1'>
              <label className="text-sm text-gray-400">Opening Time</label>
              <input
                type="time"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                {...register("openingTime", { required: "Opening Time is Required" })}
              />
              {errors.openingTime && <p className="text-sm text-red-500 mt-2">{errors.openingTime.message}</p>}

            </div>
            {/* Closing Time */}
            <div>
              <label className="text-sm text-gray-400">Closing Time</label>
              <input
                type="time"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                {...register("closingTime", { required: "Closing Time is Required", validate: (value) => { 
                  if(!openingTime) return true
                 return value > openingTime || "Closing time must be after opening time" }})}
              />
              {errors.closingTime && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.closingTime.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Lunch Slot */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <h3 className="text-lg font-semibold mb-6">Lunch Slot</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Lunch Start */}
            <div>
              <label className="text-sm text-gray-400">Lunch Start</label>
              <input
                type="time"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                {...register("lunchStart")}
              />
            </div>
            {/* Lunch End */}
            <div className='flex flex-col gap-1'>
              <label className="text-sm text-gray-400">Lunch End</label>
              <input
                type="time"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                {...register("lunchEnd", {
                  validate: (value) =>{
                    if(!value) return true
                    if (!lunchStart) return true
                   return  value > lunchStart || "Lunch end must be after lunch start"}})}
              />
              {errors.lunchEnd && <p className="text-sm text-red-500 mt-2">{errors.lunchEnd.message}</p>}
            </div>
          </div>
        </div>
        {/* Dinner slot*/}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <h3 className="text-lg font-semibold mb-6">Dinner Slot</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Dinner Start */}
            <div>
              <label className="text-sm text-gray-400">Dinner Start</label>
              <input
                type="time"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                {...register("dinnerStart")}
              />
            </div>
            {/* Dinner End */}
            <div>
              <label className="text-sm text-gray-400">Dinner End</label>
              <input
                type="time"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                {...register("dinnerEnd", {
                  validate: (value) =>{
                    if(!value) return true 
                    if(!dinnerStart) return true
                   return value > dinnerStart || "Dinner end must be after dinner start"
                }})}
              />
              {errors.dinnerEnd && <p className="text-sm text-red-500 mt-2">{errors.dinnerEnd.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimingAndSlots