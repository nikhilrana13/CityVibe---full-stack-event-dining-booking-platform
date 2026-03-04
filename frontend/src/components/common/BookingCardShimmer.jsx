import React from 'react';

const BookingCardShimmer = () => {
  return (
     <div className="bg-white border w-full md:max-w-[500px] border-gray-200 rounded-xl p-5 flex flex-col gap-4 animate-pulse">

      {/* top */}
      <div className="flex justify-between items-start">
        
        {/* title + subtitle */}
        <div className="flex flex-col gap-2 w-[70%]">
          <div className="h-4 bg-gray-200 rounded w-[80%]" />
          <div className="h-3 bg-gray-200 rounded w-[40%]" />
        </div>

        {/* image */}
        <div className="w-16 h-16 bg-gray-200 rounded-xl" />
      </div>

      {/* date */}
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-gray-200 rounded w-[30%]" />
        <div className="h-4 bg-gray-200 rounded w-[60%]" />
      </div>

      {/* location */}
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-gray-200 rounded w-[25%]" />
        <div className="h-4 bg-gray-200 rounded w-[70%]" />
      </div>

      {/* footer */}
      <div className="flex justify-between items-center border-t pt-3">
        <div className="h-6 w-20 bg-gray-200 rounded-lg" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>

    </div>
  );
}

export default BookingCardShimmer;
