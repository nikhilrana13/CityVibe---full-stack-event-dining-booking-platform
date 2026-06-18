import React from 'react'

const GallerySection = ({restaurantimages}) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">
  <h3 className="text-lg font-semibold mb-4">Restaurant Gallery</h3>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {restaurantimages?.map((img, index) => (
      <img
        key={index}
        src={img}
        alt="gallery"
        className="w-full h-32 object-cover rounded-xl hover:scale-105 transition"
      />
    ))}
  </div>
</div>
  )
}

export default GallerySection