import { useNavigate } from "react-router-dom"
import notfound from "/notfound.avif"
const BookingNotFound = () => {

  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <img
        src={notfound}
        className="w-40 opacity-80"
      />
      <h2 className="text-lg font-semibold">
        Booking not found
      </h2>
      <p className="text-sm text-gray-500">
        This booking may have been cancelled or removed.
      </p>
      <button
        onClick={() => navigate("/bookings")}
        className="px-5 py-2 bg-black text-white rounded-full text-sm"
      >
        View your bookings
      </button>
    </div>
  )
}

export default BookingNotFound