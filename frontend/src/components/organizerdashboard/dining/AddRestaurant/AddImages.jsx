import React from 'react'

const AddImages = () => {
    return (
        <div className='max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl'>
            <div className="flex flex-col gap-10">
                {/* Section Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Restaurant Images</h2>
                        <p className="text-gray-400 text-sm mt-1">
                            Upload high-quality images to showcase your space.
                        </p>
                    </div>
                    {/* Image Count Badge */}
                    <div className="px-4 py-2 rounded-full bg-indigo-600/20 text-indigo-400 text-sm border border-indigo-500/30">
                        0 / 5 Images
                    </div>
                </div>

                {/* image grid*/}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                    {/* Upload Card */}
                    <div className="aspect-square border-2 border-dashed border-white/20 rounded-2xl bg-white/5 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer">
                        <span className="text-indigo-400 font-medium text-sm">
                            + Upload
                        </span>
                        <span className="text-xs text-gray-500 mt-2">
                            JPG, PNG
                        </span>
                    </div>
                    {/* Preview Image Card*/}
                    <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group">
                        {/* Image Placeholder */}
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500/30 to-purple-600/20 flex items-center justify-center text-xs text-gray-400">
                            Preview
                        </div>
                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                            <button className="px-3 py-1 text-xs rounded-lg bg-red-600/80 hover:bg-red-700 transition">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                {/* Helper Text */}
                <p className="text-xs text-gray-500">
                    Maximum 5 images allowed. First image will be used as cover.
                </p>
            </div>
        </div>
    )
}

export default AddImages