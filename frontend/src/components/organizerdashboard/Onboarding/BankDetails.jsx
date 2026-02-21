import React from 'react'
import { useFormContext } from 'react-hook-form'

const BankDetails = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div className='flex flex-col gap-1'>
                <label className='text-[0.9rem] text-gray-400'>Enter your Bank account Number</label>
                <input type='text' className='border px-3 w-full outline-none py-3 rounded-xl placeholder:text-sm' placeholder='46453533553' {...register("bankAccountNumber", {
                    required: "Bank Account Number is Required", pattern: {
                        value: /^[0-9]{9,18}$/,
                        message: "Enter valid 9-18 digit account number"
                    }
                })} />
                {errors.bankAccountNumber && (
                    <p className="text-red-500 text-sm">{errors.bankAccountNumber.message}</p>
                )}
            </div>
            <div className='flex flex-col gap-1'>
                <label className='text-[0.9rem] text-gray-400'>Enter IFSC code</label>
                <input type='text' placeholder='HDFC0001236' className='border placeholder:text-sm px-3 w-full outline-none py-3 rounded-xl uppercase'{...register("ifscCode", {
                    required: "IFSC Code is Required",
                    validate: (value) => {
                        const formatted = value.trim().toUpperCase();
                        return (
                            /^[A-Z]{4}0[A-Z0-9]{6}$/.test(formatted) ||
                            "Enter valid IFSC (e.g. HDFC0ABC123)"
                        );
                    }
                })}
                    onInput={(e) => {
                        e.target.value = e.target.value.toUpperCase().trim();
                    }}
                />
                {errors.ifscCode && (
                    <p className="text-red-500 text-sm">{errors.ifscCode.message}</p>
                )}
            </div>
        </div>
    )
}

export default BankDetails