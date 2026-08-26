"use client"
import useAddCampaignAndEdit from '@/hooks/useAddCampaignAndEdit';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

const AddandUpdateCampaignForm = ({ onClose, IsEdit, campaign }) => {
    const [previewImage, setPreviewImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const { register, handleSubmit, reset, watch, formState: { errors }, } = useForm({
        defaultValues: {
            title: '',
            startDate: '',
            endDate: '',
            usageLimit: '',
            maxDiscount: '',
            minOrderAmount: '',
            discountType: '',
            discountValue: '',
            perUserLimit: '',
            displayOnHome: '',
            applicableFor: '',
            displayPriority: '',
        }
    })
    const today = new Date().toISOString().split("T")[0];
    // fetch campaign Details 
    useEffect(() => {
        if (IsEdit && campaign) {
            reset({
                title: campaign.title,
                startDate: campaign.startDate?.split("T")[0],
                endDate: campaign.endDate?.split("T")[0],
                usageLimit: campaign.usageLimit,
                maxDiscount: campaign.maxDiscount,
                minOrderAmount: campaign.minOrderAmount,
                discountType: campaign.discountType,
                discountValue: campaign.discountValue,
                perUserLimit: campaign.perUserLimit,
                displayOnHome: campaign.displayOnHome,
                applicableFor: campaign.applicableFor,
                displayPriority: campaign.displayPriority,
            });
            setPreviewImage(campaign?.bannerImageUrl?.url || null);
            setSelectedImage(null);
        } else {
            reset({
                title: '',
                startDate: '',
                endDate: '',
                usageLimit: '',
                maxDiscount: '',
                minOrderAmount: '',
                discountType: '',
                discountValue: '',
                perUserLimit: '',
                displayOnHome: '',
                applicableFor: '',
                displayPriority: '',
            });
            setPreviewImage(null);
            setSelectedImage(null);
        }
    }, [IsEdit, campaign, reset]);

    const { SubmitProduct, loading } = useAddCampaignAndEdit({
        IsEdit: IsEdit,
        campaignId: campaign?._id,
        onSuccess: () => {
            reset()
            setSelectedImage(null)
            setPreviewImage(null)
            onClose && onClose()
        }
    })

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setSelectedImage(file)
        setPreviewImage(URL.createObjectURL(file))
    }
    // cleanup browser memory
    useEffect(() => {
        return () => {
            if (previewImage?.startsWith("blob:")) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    const onSubmit = async (data) => {
        if (data.displayOnHome === "true" && !selectedImage && !previewImage) {
            toast.error("Banner image is required when displaying on home");
            return;
        }
        await SubmitProduct(data, selectedImage)
    }

    const handleClose = () => {
        onClose && onClose()
    }
    return (
        <div className='fixed inset-0 border z-[9999] rounded-md flex justify-center items-center p-4 sm:p-6 '>
            {/* overlay */}
            <div onClick={handleClose} className="fixed inset-0 bg-[#161021]/60 backdrop-blur-sm" />
            {/* content */}
            <div className="relative w-full h-[500px] overflow-y-auto max-w-xl bg-white border border-[#006e2f]/10 rounded-lg shadow-2xl overflow-hidden custom-scrollbar">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-[#006e2f]/10 px-5 py-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-[#7C55FA]">
                            {IsEdit ? 'Update a Campaign' : ' Create a Campaign'}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {IsEdit ? "Update campaign details, refine eligibility, and manage offer visibility across the CityVibe platform." : "Set up discount offers, eligibility criteria, and campaign schedules to maximize customer engagement across the Cityvibe platform."}
                        </p>
                    </div>

                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-4 sm:p-6">
                    {/* Campaign Details */}
                    <div>
                        <h4 className="text-lg font-semibold text-[#191c1e] mb-4">
                            Campaign Details
                        </h4>
                        <div className="grid grid-cols-1 gap-5">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Campaign Title
                                </label>
                                <input type="text" placeholder="e.g. New User Offer 60% OFF" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:text-[#7C55FA]"
                                    {...register("title", {
                                        required: "Title is Required",
                                        setValueAs: (value) => value.trim(),
                                        maxLength: {
                                            value: 40,
                                            message: "Max 40 characters allowed"
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        {errors?.title && (
                            <p className='text-red-500 my-2 text-sm'>{errors?.title?.message}</p>
                        )}
                    </div>
                    {/* Discount Settings */}
                    {!IsEdit && (
                        <div>
                            <h4 className="text-lg font-semibold text-[#191c1e] mb-4">
                                Discount Settings
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Discount Type
                                    </label>
                                    <select {...register("discountType", { required: "Discount Type is Required", })} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:text-[#7C55FA]">
                                        <option value="">Select Discount Type</option>
                                        <option value="percentage">Percentage</option>
                                        <option value="flat">Flat Amount</option>
                                    </select>
                                    {errors?.discountType && (
                                        <p className='text-red-500 my-2 text-sm'>{errors?.discountType?.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Discount Value
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="60"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:text-[#7C55FA]"
                                        {...register("discountValue", {
                                            required: "Discount Value is Required", min: {
                                                value: 1,
                                                message: "Discount must be greater than 0"
                                            }, validate: (value) => {
                                                if (
                                                    watch("discountType") === "percentage" &&
                                                    Number(value) > 100
                                                ) {
                                                    return "Percentage discount cannot exceed 100";
                                                }
                                                return true;
                                            }
                                        })}
                                    />
                                    {errors?.discountValue && (
                                        <p className='text-red-500 my-2 text-sm'>{errors?.discountValue?.message}</p>
                                    )}
                                </div>
                                {watch("discountType") === "percentage" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Max Discount
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="500"
                                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:text-[#7C55FA]"
                                            {...register("maxDiscount", {
                                                min: {
                                                    value: 1,
                                                    message: "Max discount must be greater than 0"
                                                }
                                            })}
                                        />
                                        {errors?.maxDiscount && (
                                            <p className='text-red-500 my-2 text-sm'>{errors?.maxDiscount?.message}</p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Minimum Order Amount
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="1000"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:text-[#7C55FA]"
                                        {...register("minOrderAmount", {
                                            min: {
                                                value: 1,
                                                message: "Minimum order amount must be greater than 0"
                                            }
                                        })}
                                    />
                                    {errors?.minOrderAmount && (
                                        <p className='text-red-500 my-2 text-sm'>{errors?.minOrderAmount?.message}</p>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Eligibility */}
                    <div>
                        <h4 className="text-lg font-semibold text-[#191c1e] mb-4">
                            Eligibility Rules
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {!IsEdit && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Applicable For
                                    </label>
                                    <select {...register("applicableFor", { required: "Applicable For is Required" })} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:text-[#7C55FA]">
                                        <option value="">Select Applicable for</option>
                                        <option value="all">All Users</option>
                                        <option value="first_booking">First booking</option>
                                        <option value="inactive_users">InActive Users</option>
                                    </select>
                                    {errors?.applicableFor && (
                                        <p className='text-red-500 my-2 text-sm'>{errors?.applicableFor?.message}</p>
                                    )}
                                </div>
                            )}
                            {/* usage limit */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Usage Limit
                                </label>
                                <input
                                    type="number"
                                    placeholder="1000"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:text-[#7C55FA]"
                                    {...register("usageLimit", {
                                        min: {
                                            value: 1,
                                            message: "usageLimit amount must be greater than 0"
                                        }
                                    })}
                                />
                                {errors?.usageLimit && (
                                    <p className='text-red-500 my-2 text-sm'>{errors?.usageLimit?.message}</p>
                                )}
                            </div>
                            {/* per user limit */}
                            {!IsEdit && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Per User Limit
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="1000"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:text-[#7C55FA]"
                                        {...register("perUserLimit", {
                                            min: {
                                                value: 1,
                                                message: "perUserLimit amount must be greater than 0"
                                            }
                                        })}
                                    />
                                    {errors?.perUserLimit && (
                                        <p className='text-red-500 my-2 text-sm'>{errors?.perUserLimit?.message}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Duration */}
                    <div>
                        <h4 className="text-lg font-semibold text-[#191c1e] mb-4">
                            Campaign Duration
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    min={today}
                                    disabled={IsEdit && campaign?.startDate?.split("T")[0] < today}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:text-[#7C55FA]"
                                    {...register("startDate", {
                                        required: "Start Date is Required",
                                        validate: (value) => {
                                            // Already-started campaign → don't validate old start date
                                            if (
                                                IsEdit &&
                                                campaign?.startDate?.split("T")[0] < today
                                            ) {
                                                return true;
                                            }
                                            // New/future campaign
                                            return (
                                                value >= today ||
                                                "Start date cannot be in the past"
                                            );
                                        }
                                    })}
                                />
                                {errors?.startDate && (
                                    <p className='text-red-500 my-2 text-sm'>{errors?.startDate?.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:text-[#7C55FA]"
                                    {...register("endDate", {
                                        required: "End Date is Required",
                                         validate: (value) => {
                                            return (
                                                value > watch("startDate") ||
                                                "End date must be after start date"
                                            );
                                        }
                                    })}
                                />
                                {errors?.endDate && (
                                    <p className='text-red-500 my-2 text-sm'>{errors?.endDate?.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* display on home */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Display On Home
                        </label>
                        <select
                            {...register("displayOnHome")}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:text-[#7C55FA]"
                        >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    {/* display priority */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Display Priority
                        </label>
                        <input
                            type="number"
                            placeholder="1"
                            {...register("displayPriority", {
                                min: {
                                    value: 1,
                                    message: "Priority must be greater than 0",
                                },
                            })}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:text-[#7C55FA]"
                        />
                        {errors?.displayPriority && (
                            <p className="text-red-500 my-2 text-sm">
                                {errors.displayPriority.message}
                            </p>
                        )}
                    </div>
                    {/* banner image select */}
                    <div className='space-y-1.5 sm:space-y-2'>
                        <label className="text-xs font-semibold text-[#3d4a3d] ml-1">
                            Upload Banner Image
                        </label>
                        <label
                            htmlFor="banner-image"
                            className="group mt-3 relative flex h-44 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#dbe2ea] bg-[#f8fafc] transition hover:border-[#2563eb] hover:bg-[#f8fbff]"
                        >
                            {previewImage ? (
                                <>
                                    <img
                                        src={previewImage}
                                        alt="banner preview"
                                        className="h-full w-full object-cover"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                                        <span className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0f172a]">
                                            Change Image
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#2563eb]">
                                        📷
                                    </div>
                                    <p className="text-sm font-semibold text-[#334155]">
                                        Choose Banner Image
                                    </p>

                                    <p className="mt-1 text-xs text-[#94a3b8]">
                                        JPG, PNG or WEBP
                                    </p>
                                </div>
                            )}
                            <input
                                id="banner-image"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        {IsEdit && previewImage && !selectedImage && (
                            <p className="text-xs text-[#64748b]">
                                Current banner image. Click to replace it.
                            </p>
                        )}
                        {selectedImage && (
                            <p className="truncate text-xs font-medium text-[#2563eb]">
                                New image: {selectedImage.name}
                            </p>
                        )}
                        {watch("displayOnHome") === "true" &&
                            !selectedImage &&
                            !previewImage && (
                                <p className="text-red-500 my-2 text-sm">
                                    Banner image is required when displaying on home
                                </p>
                            )}
                    </div>

                    {/*  */}
                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            onClick={handleClose}
                            type="button"
                            className="px-6 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full md:w-auto bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition"
                        >
                            {loading ? "Please wait..." : IsEdit ? "Update Campaign" : "Create Campaign"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddandUpdateCampaignForm;
