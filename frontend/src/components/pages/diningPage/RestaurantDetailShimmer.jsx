const RestaurantDetailShimmer = () => {
  return (
    <div className="space-y-5 pb-15 lg:pb-0 animate-pulse">

      {/* breadcrumb */}
      <div className="h-4 w-52 bg-gray-200 rounded"></div>

      {/* image gallery */}
      <div className="w-full h-[320px] bg-gray-200 rounded-2xl"></div>

      {/* main section */}
      <div className="flex flex-col md:flex-row gap-10 py-5">

        {/* LEFT */}
        <div className="w-full lg:w-[65%] space-y-5">

          <div className="h-10 w-72 bg-gray-200 rounded"></div>

          <div className="space-y-3">
            <div className="h-4 w-56 bg-gray-200 rounded"></div>
            <div className="h-4 w-72 bg-gray-200 rounded"></div>
          </div>

        </div>

        {/* RIGHT BOOKING CARD */}
        <div className="w-full lg:w-[35%]">
          <div className="border space-y-4 py-6 px-7 w-full rounded-xl sticky top-24 bg-white shadow-sm">

            <div className="h-6 w-32 bg-gray-200 rounded"></div>

            <div className="flex gap-3">
              <div className="flex flex-col w-full gap-2">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>

              <div className="flex flex-col w-full gap-2">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            </div>

            <div className="h-10 w-full bg-gray-200 rounded"></div>

          </div>
        </div>
      </div>

      {/* about section */}
      <div className="flex flex-col w-full md:w-[50%] lg:w-[65%] space-y-5">

        <div className="h-6 w-48 bg-gray-200 rounded"></div>

        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* cuisine chips */}
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="flex gap-3">
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-14 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* facility chips */}
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="flex gap-3">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RestaurantDetailShimmer;