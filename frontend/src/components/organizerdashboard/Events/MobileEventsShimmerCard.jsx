const MobileEventsCardShimmer = () => {
  return (
    <>
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm border overflow-hidden animate-pulse"
        >
          {/* Image shimmer */}
          <div className="w-full h-48 bg-gray-200" />

          <div className="p-4 flex flex-col gap-3">
            
            {/* Title + Status */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-28 bg-gray-200 rounded" />
              </div>
              <div className="h-6 w-16 bg-gray-200 rounded-full" />
            </div>

            {/* Tickets */}
            <div className="flex flex-col gap-2">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="w-full h-2 bg-gray-200 rounded-full" />
            </div>

            {/* Extra Info Row */}
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <div className="flex-1 h-9 bg-gray-200 rounded-xl" />
              <div className="flex-1 h-9 bg-gray-200 rounded-xl" />
            </div>

          </div>
        </div>
      ))}
    </>
  );
};

export default MobileEventsCardShimmer;