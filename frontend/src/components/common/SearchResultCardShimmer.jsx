const SearchResultCardShimmer = () => {
  return (
    <div className="flex items-start gap-4 p-3 rounded-xl animate-pulse">
      {/* Image shimmer */}
      <div className="w-16 h-16 rounded-xl bg-gray-200 flex-shrink-0" />
      {/* Content shimmer */}
      <div className="flex flex-col flex-1 space-y-2">
        {/* Title line 1 */}
        <div className="h-4 w-[80%] bg-gray-200 rounded-md" />
        {/* Title line 2 */}
        <div className="h-4 w-[60%] bg-gray-200 rounded-md" />
        {/* Type */}
        <div className="h-3 w-[30%] bg-gray-200 rounded-md mt-1" />
      </div>
    </div>
  )
}

export default SearchResultCardShimmer