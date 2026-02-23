import { UploadCloud } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MdClose } from 'react-icons/md'

const BasicInfo = () => {
    const { register, watch, setValue, formState: { errors } } = useFormContext()
    const [previewImage, setPreviewImage] = useState(null)
    const coverImagefile = watch("coverimage")

    useEffect(() => {
        if (coverImagefile && coverImagefile[0]) {
            const file = coverImagefile[0]
            const objectUrl = URL.createObjectURL(file)
            setPreviewImage(objectUrl)
            return (() => {
                URL.revokeObjectURL(objectUrl)
            })
        }
    }, [coverImagefile])


    return (

        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side */}
                <div className="flex flex-col gap-6">
                    <div className='flex flex-col gap-1'>
                        <label className="text-sm text-gray-400">Event Title</label>
                        <input
                            type="text"
                            placeholder="e.g., Rooftop Jazz Night"
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" {...register("title", { required: "Title is Required" })}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title.message}</p>
                        )}
                    </div>
                    <div className='flex flex-col gap-1' >
                        <label className="text-sm text-gray-400">Event Category</label>
                        <select {...register("category", { required: "Category is Required" })} className="mt-2 w-full  text-black rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">Select a category</option>
                            <option value="music">Music</option>
                            <option value="comedy">Comedy</option>
                            <option value="sports">Sports</option>
                            <option value="performances">Performances</option>
                            <option value="fooddrinks">food & drinks</option>
                            <option value="socialmixers">Social Mixers</option>
                            <option value="pets">Pets</option>
                            <option value="openmics">Open mics</option>
                            <option value="celebrations">Celebrations</option>
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm">{errors.category.message}</p>
                        )}
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className="text-sm text-gray-400">Description</label>
                        <textarea
                            rows="6"
                            placeholder="Describe the vibe, lineup, menu..."
                            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            {...register("description", { required: "Description is Required" })}
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                    </div>
                </div>
                {/* Right Side - Upload UI */}
                <div className="flex flex-col gap-6">
                    <label htmlFor='coverimage' className="relative border-2 border-dashed border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-white/5 hover:border-indigo-500 transition cursor-pointer">
                        {
                            previewImage ? (
                                <>
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-full h-48 object-cover transition-all duration-300 rounded-xl"
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setPreviewImage(null);
                                            setValue("coverimage", null);
                                        }}
                                        className="absolute top-1 mt-1 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md"
                                    >
                                        <MdClose />
                                    </button>
                                </>

                            ) : (
                                <>
                                    <UploadCloud size={32} className="text-indigo-400 mb-4" />
                                    <p className="text-sm text-gray-300">
                                        Drag and drop or <span className="text-indigo-400">click to upload</span>
                                    </p>
                                    <span className="text-xs text-gray-500 mt-2">
                                        16:9 ratio recommended (Max 500KB)
                                    </span>
                                </>
                            )
                        }
                        <input type='file' accept='image/*' id='coverimage' name='coverimage' className='hidden' {...register("coverimage", {
                            required: "Cover Image is Required", validate: {
                                fileSize: (file) =>
                                    file[0]?.size < 500 * 1024 || "Max file size is 500KB",
                            },
                        })} />
                    </label>
                    {errors.coverimage && (
                        <p className="text-red-500 text-sm">
                            {errors.coverimage.message}
                        </p>
                    )}
                    {/* Pro Tip */}
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-indigo-400 text-sm font-medium">Pro Tip</p>
                        <p className="text-xs text-gray-400 mt-1">
                            High-quality lifestyle cover image boost bookings. Avoid too much text in cover image.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BasicInfo