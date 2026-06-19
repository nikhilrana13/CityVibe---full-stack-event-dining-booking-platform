import React from 'react'
import { useFormContext } from 'react-hook-form';

const BusinessDetails = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div className='flex flex-col gap-1'>
                <label className='text-[0.9rem] text-gray-400'>Enter your Business Name</label>
                <input type='text' className='border px-3 w-full outline-none py-3 rounded-xl placeholder:text-sm' placeholder='e.g Events.ltd' {...register("businessName", { required: "Business Name is Required" })} />
                {errors.businessName && (
                    <p className="text-red-500 text-sm">{errors.businessName.message}</p>
                )}
            </div>
            <div className='flex flex-col gap-1'>
                <label className='text-[0.9rem] text-gray-400'>Enter your Business Email</label>
                <input type='email' className='border px-3 w-full outline-none py-3 rounded-xl' {...register("businessEmail", {
                    required: "Business Email is Required", pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address"
                    }
                })} />
                {errors.businessEmail && (
                    <p className="text-red-500 text-sm">{errors.businessEmail.message}</p>
                )}
            </div>
            <div className='flex flex-col gap-1'>
                <label className='text-[0.9rem] text-gray-400'>Enter your Business Phone Number</label>
                <input type='text' className='border px-3 w-full outline-none py-3 rounded-xl' {...register("businessPhone", {
                    required: "Business Phone number is Required", pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Enter valid 10-digit phone number"
                    }
                })} />
                {errors.businessPhone && (
                    <p className="text-red-500 text-sm">{errors.businessPhone.message}</p>
                )}
            </div>
        </div>
    )
}

export default BusinessDetails