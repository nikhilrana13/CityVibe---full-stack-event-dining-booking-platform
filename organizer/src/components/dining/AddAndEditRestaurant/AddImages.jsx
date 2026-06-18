import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';


const AddImages = () => {
    const { control, watch,formState: { errors } } = useFormContext();

    // handle file change 
    const handleFileChange = (e, onChange, value) => {
        const files = Array.from(e.target.files)
        // current form value
        const currentFiles = value || []
        const remainingSlots = 5 - currentFiles.length
        if (remainingSlots <= 0) {
            toast.error("Maximum 5 images allowed")
            return
        }
        // limit total of 5 
        const allowedFiles = files.slice(0, remainingSlots)
        if (allowedFiles.length < files.length) {
            toast.error("You can only upload maximum 5 images");
        }
        const updatedFiles = [...currentFiles, ...allowedFiles]
        // update rhk state
        onChange(updatedFiles)
    }
    // Handle Delete
    const handleDeleteImage = (index, value, onChange) => {
        const updated = value.filter((_, i) => i !== index)
        onChange(updated); // Update form state
    };
    // console.log("images",watch("images"))
    return (
        <div className='max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl'>
            <div className="flex flex-col gap-10">
                {/* image grid*/}
                <Controller
                    name="images"
                    control={control}
                    rules={{
                        validate: (value) =>
                            value && value.length >= 5 ? true : "At least 5 images are required"
                    }}
                    render={({ field: { onChange, value = [] } }) => (
                        <>
                            {/* Image Count Badge */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">Restaurant Images</h2>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Upload high-quality images to showcase your space.
                                    </p>
                                </div>
                                <div className="px-4 py-2 rounded-full bg-indigo-600/20 text-indigo-400 text-sm border border-indigo-500/30 w-fit">
                                    {value.length} / 5 Images
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                                {/* Upload Card */}
                                {value.length < 5 && (
                                    <label className="aspect-square border-2 border-dashed border-white/20 rounded-2xl bg-white/5 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer">
                                        <span className="text-indigo-400 font-medium text-sm">
                                            + Upload
                                        </span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            hidden
                                            onChange={(e) => handleFileChange(e, onChange, value)}
                                        />
                                    </label>
                                )}
                                {/* Preview Cards */}
                                {value.map((img, index) => {
                                    const imageSrc = typeof img === "string" ? img : URL.createObjectURL(img)
                                    return(
                                    <div key={index} className="aspect-square rounded-2xl border border-white/10 relative overflow-hidden group">
                                        <img
                                            src={imageSrc}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(index, value, onChange)}
                                                className="px-3 py-1 text-xs rounded-lg bg-red-600 hover:bg-red-700 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                     )})}
                            </div>
                            {errors.images && (
                                <p className="text-red-500 mt-3 text-sm">
                                    {errors.images.message}
                                </p>
                            )}
                        </>
                    )}
                />
                {/* Helper Text */}
                <p className="text-xs text-gray-500">
                    Maximum 5 images allowed. First image will be used as cover.
                </p>
            </div>
        </div>
    )
}

export default AddImages