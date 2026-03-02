const HeroSliderShimmer = () => {
  return (
     <div className="relative w-full">
      {/* MOBILE SHIMMER */}
      <div className="md:hidden relative h-[75vh] animate-pulse overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200" />
        <div className="absolute inset-0 bg-black/40" />
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full px-5 pb-10 space-y-4">
          <div className="h-4 w-32 bg-white/40 rounded-md" />
          <div className="h-10 w-3/4 bg-white/60 rounded-md" />
          <div className="h-10 w-2/3 bg-white/50 rounded-md" />
          <div className="h-4 w-1/2 bg-white/40 rounded-md" />
          <div className="h-10 w-40 bg-white/70 rounded-xl mt-2" />
        </div>
      </div>
      {/* DESKTOP SHIMMER */}
      <div className="hidden md:flex relative h-[100vh] items-center">
        {/* Background blur placeholder */}
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        {/* Centered content wrapper  */}
        <div className="relative z-10 max-w-[1200px] mx-auto w-full px-5 flex items-center justify-between">
          {/* Left Content Skeleton */}
          <div className="space-y-6 max-w-xl animate-pulse">
            <div className="h-5 w-40 bg-gray-300 rounded-md" />
            <div className="h-12 w-full bg-gray-300 rounded-md" />
            <div className="h-12 w-4/5 bg-gray-200 rounded-md" />
            <div className="h-6 w-3/4 bg-gray-300 rounded-md" />
            <div className="h-6 w-1/3 bg-gray-200 rounded-md" />
            <div className="h-12 w-44 bg-gray-400 rounded-xl mt-4" />
          </div>
          {/* Right Image Card Skeleton */}
          <div className="w-[320px] h-[400px] bg-gray-300 rounded-3xl shadow-2xl animate-pulse" />
        </div>
      </div>
    </div>
   

  )
}

export default HeroSliderShimmer