import React, { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import ArtistCard from './ArtistCard'

const AddArtist = () => {
    const {control} = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "artists",
    })
    return (
        <div className='max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl'>
            {/* Artist Cards Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {fields.map((field, index) => (
                    <ArtistCard
                        key={field.id}
                        index={index}
                        remove={remove}
                        total={fields.length}
                    />
                ))}
            </div>
            {/* Add Another Artist Button */}
            <div className="flex mt-5 justify-center">
            <button onClick={() =>
                    append({
                        name: "",
                        bio: "",
                        artistimage: null,
                    },
                     { shouldFocus: false }
                )
                } className="px-6 py-3 rounded-xl border border-dashed border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 transition-all duration-300">
                    + Add Another Artist
                </button>
            </div>
        </div>
    )
}

export default AddArtist