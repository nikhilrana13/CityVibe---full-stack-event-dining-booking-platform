import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { MdDelete } from 'react-icons/md'

const AddTickets = () => {
  const { register, control, formState: { errors } } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tickets",
  })
  return (
    <div className='max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl'>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-indigo-500 transition-all duration-300 relative"
          >
            {/* Ticket Name */}
            <div className='flex flex-col gap-1 mb-5'>
              <label className="text-xs text-gray-400">Ticket Name</label>
              <input
                type="text"
                placeholder="e.g. Early Bird, VIP Pass, Couple Entry"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                {...register(`tickets.${index}.name`, {
                  required: "Ticket name is required",
                })}
              />
              {errors?.tickets?.[index]?.name && (
                <p className="text-red-500 text-sm">
                  {errors.tickets[index].name.message}
                </p>
              )}
            </div>
            {/* Price */}
            <div className='mb-5 flex flex-col gap-1'>
              <label className="text-xs text-gray-400">Price (₹)</label>
              <input
                type="number"
                placeholder="499"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                {...register(`tickets.${index}.price`, {
                  required: "Price is required",
                  min: { value: 0, message: "Invalid price" },
                })}
              />
              {errors?.tickets?.[index]?.price && (
                <p className="text-red-500 text-sm">
                  {errors.tickets[index].price.message}
                </p>
              )}
            </div>
            {/* Quantity */}
            <div className='mb-5 flex flex-col gap-1'>
              <label className="text-xs text-gray-400">Total Quantity</label>
              <input
                type="number"
                placeholder="50"
                className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                {...register(`tickets.${index}.totalQuantity`, {
                  required: "Quantity is required",
                  min: 1,
                })} />
              {errors?.tickets?.[index]?.totalQuantity && (
                <p className="text-red-500 text-sm">
                  {errors.tickets[index].totalQuantity.message}
                </p>
              )}
            </div>
              <div className='flex flex-col gap-1'>
                        <label className="text-sm text-gray-400">Description</label>
                        <textarea
                            rows="2"
                            placeholder="Describe the vibe, lineup, menu..."
                            className="mt-2 w-full placeholder:text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            {...register(`tickets.${index}.description`)}
                        ></textarea>
                    </div>
            {/* pax count */}
            <div className="flex gap-4 mb-5">
              <div className="flex-1">
                <label className="text-xs text-gray-400">Pax Count</label>
                <input
                  type="number"
                  placeholder="1"
                  className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  {...register(`tickets.${index}.paxCount`, {
                    min: { value: 1, message: "Pax must be at least 1" }
                  })}
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">Per Person</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      {...register(`tickets.${index}.perPerson`)}
                    />
                    {/* Track */}
                    <div className="w-12 h-6 bg-gray-700 rounded-full peer-checked:bg-indigo-500 transition duration-300"></div>
                    {/* Thumb */}
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition duration-300 peer-checked:translate-x-6"></div>
                  </label>
                </div>

              </div>
            </div>
            {/* Remove */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-3 right-3"
            >
              <MdDelete size={20} />
            </button>

          </div>
        ))}
      </div>
      {/* Add Ticket Button */}
      <div className="flex mt-5 justify-center">
        <button onClick={() =>
          append({
            name: "",
            price: "",
            totalQuantity: "",
            description:"",
            paxCount: 1,
            perPerson: true,
            
          })
        } type='button' className="px-6 py-3 rounded-xl border border-dashed border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 transition-all duration-300">
          + Add Ticket Tier
        </button>
      </div>
    </div>
  )
}

export default AddTickets
