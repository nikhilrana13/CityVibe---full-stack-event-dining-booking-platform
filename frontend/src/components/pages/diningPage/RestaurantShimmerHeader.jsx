const RestaurantShimmerHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4 animate-pulse">
        
        {/* Back button */}
        <div className="w-8 h-8 rounded-full bg-gray-200" />

        {/* Restaurant Image */}
        <div className="w-12 h-12 rounded-lg bg-gray-200" />

        {/* Text */}
        <div className="flex flex-col gap-2">
          <div className="w-[180px] h-4 bg-gray-200 rounded" />
          <div className="w-[120px] h-3 bg-gray-200 rounded" />
        </div>

      </div>
    </div>
  );
};

export default RestaurantShimmerHeader