import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { LuFileCheck2 } from 'react-icons/lu';

const PanDetails = () => {
    const { register, setValue, formState: { errors } } = useFormContext();
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState("");

    return (
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div className='flex flex-col gap-1'>
                <label className='text-[0.9rem] text-gray-400'>Enter your Pan Number</label>
                <input type='text' maxLength={10} style={{ textTransform: "uppercase" }} className='border px-3 py-5 w-full outline-none  rounded-xl placeholder:text-sm' placeholder='ABCDEF1234F' {...register("panNumber", {
                    required: "Pan number is Required",
                    minLength: {
                        value: 10,
                        message: "PAN must be 10 characters",
                    },
                    maxLength: {
                        value: 10,
                        message: "PAN must be 10 characters",
                    },
                    pattern: {
                        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                        message: "Invalid PAN format (ABCDE1234F)",
                    },
                })} />
                {errors.panNumber && (
                    <p className="text-red-500 text-sm">{errors.panNumber.message}</p>
                )}
            </div>
            <div className='flex flex-col gap-1'>
                <label className='text-[0.9rem] text-gray-400'>Upload your PAN CARD Image</label>
                <label htmlFor='pancardimage' className='flex items-center gap-3 min-h-[65px] border rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition'>
                    {uploading ? (
                        <div className="flex items-center gap-3">
                            {/* loader */}
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                            <span className="text-sm text-indigo-600">
                                Uploading...
                            </span>
                        </div>
                    ) : fileName ? (
                        <div className="flex items-center gap-3">
                            <LuFileCheck2 className="text-gray-600" size={22} />
                            <div className="flex flex-col">
                                <span className="text-sm overflow-hidden font-medium">
                                    {fileName}
                                </span>
                                <span className="text-xs text-gray-400">
                                    Uploaded successfully
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <FaCloudUploadAlt className="text-gray-600" size={22} />
                            <div className="flex flex-col text-gray-400">
                                <span className="text-sm">Upload document</span>
                                <span className="text-xs">
                                    Max.5MB • JPEG, JPG, PNG, PDF
                                </span>
                            </div>
                        </div>
                    )}
                </label>
                <input type='file' {...register("pancardimage", {
                    required: "Pan Card Image is Required", onChange: (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setUploading(true);
                        setFileName("");
                        setTimeout(() => {
                            setUploading(false);
                            setFileName(file.name);
                        }, 1500);
                    },
                })} accept='image/*' id='pancardimage' name='pancardimage' className='border hidden' />
                {errors.pancardimage && (
                    <p className="text-red-500 text-sm">{errors.pancardimage.message}</p>
                )}
            </div>
        </div>
    )
}

export default PanDetails