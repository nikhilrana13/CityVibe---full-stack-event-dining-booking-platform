import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { MdDelete } from "react-icons/md";

const ArtistCard = ({ index, remove, total }) => {
    const { register, watch, setValue, formState: { errors, touchedFields, isSubmitted }, } = useFormContext();
    const [preview, setPreview] = useState(null);
    const artistFile = watch(`artists.${index}.artistimage`);

    useEffect(() => {
        if (artistFile instanceof File) {
            const objectUrl = URL.createObjectURL(artistFile);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [artistFile]);

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-indigo-500 transition-all duration-300 relative">
            {/* Artist Image */}
            <div className="flex flex-col gap-2 mb-5">
                <label
                    htmlFor={`artistimage-${index}`}
                    className="border-2 border-dashed border-white/20 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition"
                >
                    {preview ? (
                        <img
                            src={preview}
                            alt="artist"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    ) : (
                        <span className="text-indigo-400 text-sm">
                            Upload Artist Image
                        </span>
                    )}
                    {/* hidden RHF register field */}
                    <input
                        type="hidden"
                        {...register(`artists.${index}.artistimage`, {
                            validate: (file) =>
                                file instanceof File || "Artist Image is Required",
                        })}
                    />
                    <input
                        id={`artistimage-${index}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setValue(`artists.${index}.artistimage`, file, {
                                shouldValidate: true,
                                shouldDirty: true,
                            });
                        }}
                    />
                </label>

                {(touchedFields?.artists?.[index]?.artistimage || isSubmitted) &&
                    errors?.artists?.[index]?.artistimage && (
                        <p className="text-red-500 text-sm">
                            {errors.artists[index].artistimage.message}
                        </p>
                    )}
            </div>
            {/* Artist Name */}
            <div className="flex flex-col gap-1 mb-5">
                <label className="text-xs text-gray-400">
                    Artist Name
                </label>
                <input
                    type="text"
                    placeholder="e.g. DJ Nova"
                    className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    {...register(`artists.${index}.name`, {
                        required: "Artist Name is Required",
                    })}
                />
                {(touchedFields?.artists?.[index]?.name || isSubmitted) &&
                    errors?.artists?.[index]?.name && (
                        <p className="text-red-500 text-sm">
                            {errors.artists[index].name.message}
                        </p>
                    )}
            </div>
            {/* Artist Bio */}
            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">
                    Artist Bio (Optional)
                </label>
                <textarea
                    rows="4"
                    placeholder="Short bio about the performer..."
                    className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    {...register(`artists.${index}.bio`)}
                />
            </div>
            {/* Remove Artist */}
            {total > 1 && (
                <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute mt-2 top-[-0.25rem] right-3 text-gray-400 hover:text-red-500 transition"
                >
                    <MdDelete size={20} />
                </button>
            )}
        </div>
    );
};

export default ArtistCard;