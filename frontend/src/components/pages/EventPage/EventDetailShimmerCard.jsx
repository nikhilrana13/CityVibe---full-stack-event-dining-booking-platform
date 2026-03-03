import React from 'react';

const ShimmerBlock = ({ className }) => (
  <div
    className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
                animate-pulse rounded-md ${className}`}
  />
);
const EventDetailShimmerCard = () => {
  return (
     <div className="space-y-8 pb-24 lg:pb-0">
      {/* Title Section */}
      <div className="space-y-3">
        <ShimmerBlock className="h-8 w-3/4 rounded-lg" />
        <ShimmerBlock className="h-4 w-2/3 rounded-lg" />
      </div>
      {/* Cover Image Shimmer */}
      <div className="w-full aspect-[2/3] sm:aspect-[16/4] rounded-2xl overflow-hidden">
        <ShimmerBlock className="w-full h-full" />
      </div>
      {/* Description + Side Card */}
      <div className="flex flex-col gap-5 py-5 lg:flex-row">
        {/* About */}
        <div className="space-y-4 w-full">
          <ShimmerBlock className="h-6 w-40" />
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-4 w-5/6" />
          <ShimmerBlock className="h-4 w-4/6" />
        </div>
        {/* Side Info Card */}
        <div className="lg:border space-y-5 py-6 lg:px-7 w-full lg:w-[400px] rounded-xl">
          <ShimmerBlock className="h-16 w-full rounded-xl" />
          <ShimmerBlock className="h-16 w-full rounded-xl" />
          <ShimmerBlock className="h-12 w-full rounded-xl hidden lg:block" />
        </div>
      </div>
      {/* Things To Know */}
      <div className="space-y-4">
        <ShimmerBlock className="h-6 w-40" />
        <ShimmerBlock className="h-4 w-2/3" />
        <ShimmerBlock className="h-4 w-1/2" />
        <ShimmerBlock className="h-4 w-1/3" />
      </div>
      {/* Artists Section */}
      <div>
        <ShimmerBlock className="h-6 w-32 mb-5" />

        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-[230px] flex-shrink-0 bg-white rounded-3xl p-3 border border-gray-200"
            >
              <ShimmerBlock className="h-[200px] w-full rounded-2xl" />
              <ShimmerBlock className="h-4 w-3/4 mx-auto mt-4" />
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Bottom Fixed Shimmer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t px-4 py-3 flex justify-between items-center lg:hidden">
        <ShimmerBlock className="h-6 w-28" />
        <ShimmerBlock className="h-12 w-32 rounded-xl" />
      </div>
    </div>
  );
}

export default EventDetailShimmerCard;
