const TicketDivider = () => {
  return (
    <div className="relative flex items-center w-full my-6">
      <div className="flex-1 border-t border-dashed border-gray-300"></div>

      <div className="absolute left-0 w-5 h-5 bg-[#F9F9FA] rounded-full -translate-x-1/2"></div>
      <div className="absolute right-0 w-5 h-5 bg-[#F9F9FA] rounded-full translate-x-1/2"></div>
    </div>
  )
}

export default TicketDivider