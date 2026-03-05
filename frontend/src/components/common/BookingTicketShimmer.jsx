const BookingTicketShimmer = () => {
  return (
    <div className="max-w-xl mx-auto p-4 animate-pulse">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border">
        {/* image shimmer */}
        <div className="w-full h-52 bg-gray-200"></div>
        <div className="p-5 space-y-4">
          {/* title */}
          <div className="h-5 bg-gray-200 rounded w-2/3"></div>
          {/* location */}
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          {/* date time */}
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          {/* ticket pill */}
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          {/* divider */}
          <div className="relative flex items-center my-6">
            <div className="flex-1 border-t border-dashed border-gray-200"></div>
            <div className="absolute left-0 w-5 h-5 bg-[#F9F9FA] rounded-full -translate-x-1/2"></div>
            <div className="absolute right-0 w-5 h-5 bg-[#F9F9FA] rounded-full translate-x-1/2"></div>
          </div>
          {/* QR section */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-28"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="w-[90px] h-[90px] bg-gray-200 rounded-xl"></div>
          </div>
          {/* divider */}
          <div className="border-t border-dashed border-gray-200 my-6"></div>
          {/* instructions */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-40"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingTicketShimmer