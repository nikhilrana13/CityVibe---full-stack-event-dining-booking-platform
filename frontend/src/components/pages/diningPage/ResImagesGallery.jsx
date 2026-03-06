import React, { useState } from 'react';
import ImageViewerDialog from './ImageViewerDialog';
import { CgLayoutGridSmall } from 'react-icons/cg';

const ResImagesGallery = ({ images }) => {
    const [showallImages, setShowallImages] = useState(false)
    if (!images.length) return null
    return (
        <>
            <div className="grid md:grid-cols-4  grid-rows-2 gap-3 h-[420px]">
                {/* BIG IMAGE */}
                <div className="col-span-2 row-span-2">
                    <img
                        src={images?.[0]}
                        className="w-full h-full  object-cover rounded-xl"
                    />
                </div>
                {/* SMALL */}
                <div>
                    <img
                        src={images?.[1]}
                        className="w-full h-full  object-cover rounded-xl"
                    />
                </div>
                <div>
                    <img
                        src={images?.[2]}
                        className="w-full h-full  object-cover rounded-xl"
                    />
                </div>
                <div>
                    <img
                        src={images?.[3]}
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>
                <div className="relative">
                    <img
                        src={images?.[4]}
                        className="w-full h-full object-cover rounded-xl"
                    />
                    <button onClick={() => { setShowallImages(true) }} className="sm:block hidden absolute sm:bottom-20 right-3 bg-white px-3 md:bottom-5 py-2 rounded-md text-sm shadow">
                        Show all photos
                    </button>
                    <button onClick={() => { setShowallImages(true) }} className="block sm:hidden absolute bottom-5 right-3 bg-white px-3 py-2 rounded-md text-sm shadow">
                       <CgLayoutGridSmall size={26} />
                    </button>
                </div>
                {/* open model */}
                   { showallImages && (
                        <ImageViewerDialog images={images}  onClose={() => setShowallImages(false)}  />
                    )}
            </div>
        </>
    );
}

export default ResImagesGallery;
