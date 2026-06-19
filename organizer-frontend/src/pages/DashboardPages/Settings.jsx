import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useGetOrganizerProfileQuery, useUpdateOrganizerProfileMutation } from '@/redux/api/OrganizerApi'
import { toast } from 'react-toastify'
import ButtonLoader from '@/components/common/ButtonLoader'

const Settings = () => {
    const { handleSubmit, register, setValue, formState: { errors } } = useForm()
    const organizerQuery = useGetOrganizerProfileQuery(undefined, {
        refetchOnMountOrArgChange: true
    })
    const organizer = organizerQuery?.data?.data?.organizer
    const [UpdateOrganizerProfile, { isLoading }] = useUpdateOrganizerProfileMutation()


    useEffect(() => {
        if (organizer) {
            setValue("businessName", organizer?.businessName)
            setValue("businessEmail", organizer?.businessEmail)
            setValue("businessPhone", organizer?.businessPhone)
        }
    }, [organizer, setValue])

    if (organizerQuery?.isLoading) return null

    const onSubmit = async (data) => {
        const formdata = {
            businessName: data.businessName,
            businessEmail: data.businessEmail,
            businessPhone: data.businessPhone,
        }
        try {
            const response = await UpdateOrganizerProfile(formdata).unwrap()
            toast.success(response?.message)
        } catch (error) {
            console.error("Failed to update organizer", error)
            toast.error(error?.data?.message || "Internal server error")
        }
    }



    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Summary Card */}
                <div className="bg-white border rounded-2xl shadow-md p-6 flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                            {organizer?.businessName?.slice(0, 2)?.toUpperCase() || "BP"}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Business Profile
                            </h2>
                            <p className="text-sm text-gray-500">
                                Manage your business information
                            </p>
                        </div>
                    </div>
                    <div className="border-t pt-4 text-sm text-gray-600 space-y-3">
                        <p><span className="font-medium text-gray-800">Name:</span>{organizer?.businessName || "NA"}</p>
                        <p><span className="font-medium text-gray-800">Email:</span>{organizer?.businessEmail || "NA"}</p>
                        <p><span className="font-medium text-gray-800">Phone:</span>{organizer?.businessPhone || "NA"}</p>
                    </div>
                </div>
                {/* Right Edit Form */}
                <div className="lg:col-span-2 bg-white border rounded-2xl shadow-md p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        Update Business Details
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Business Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    id='name'
                                    {...register("businessName", { required: "Business Name is Required" })}
                                    className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    placeholder="Enter business name"
                                />
                                {errors.businessName && (
                                    <p className="text-red-500 text-sm">{errors.businessName.message}</p>
                                )}
                            </div>
                            {/* Business Email */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Business Email
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    required
                                    id='email'
                                    {...register("businessEmail", { required: "Business Email is Required" })}
                                    className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    placeholder="Enter business email"
                                />
                                {errors.businessEmail && (
                                    <p className="text-red-500 text-sm">{errors.businessEmail.message}</p>
                                )}
                            </div>
                            {/* Business Phone */}
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Business Phone
                                </label>
                                <input
                                    type="tel"
                                    name='businessPhone'
                                    id='businessPhone'
                                    className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                    placeholder="Enter business phone"
                                    {...register("businessPhone", { required: "Business Phone is Required" })}
                                />
                                {errors.businessPhone && (
                                    <p className="text-red-500 text-sm">{errors.businessPhone.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end mt-8">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
                            >

                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <ButtonLoader />
                                        Saving...
                                    </span>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Settings