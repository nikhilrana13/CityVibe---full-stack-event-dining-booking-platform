import React from 'react';

const ResImagesGallery = ({images}) => {
    return (
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
                <button className="absolute bottom-3 right-3 bg-white px-3 py-2 rounded-md text-sm shadow">
                    Show all photos
                </button>
            </div>
        </div>
    );
}

export default ResImagesGallery;
