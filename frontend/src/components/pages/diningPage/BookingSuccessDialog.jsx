import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { useEffect } from "react"
import confetti from "canvas-confetti"
import { useNavigate } from "react-router-dom"
import { formatDateRange, formatTime } from "../../../lib/utils"

const BookingSuccessDialog = ({open,restaurant,date,time,guests,bookingId,autoRedirect = true}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    })
    if (autoRedirect) {
      const t = setTimeout(() => {
        navigate("/bookings")
      }, 5000)
      return () => clearTimeout(t)
    }
  }, [open, autoRedirect, navigate])

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 overflow-hidden"
        > 
          {/* gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-white opacity-40 pointer-events-none"/>

          {/* animated check circle */}
          <div className="flex justify-center mb-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
            >
              <Check className="text-white" size={32} strokeWidth={3}/>
            </motion.div>
          </div>
          {/* title */}
          <h2 className="text-xl font-semibold text-center mb-1">
            Booking Confirmed 🎉
          </h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            Your table reservation is confirmed.
          </p>
          {/* booking summary */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 mb-6">
            <SummaryRow label="Restaurant" value={restaurant} />
            <SummaryRow label="Date" value={formatDateRange(date)} />
            <SummaryRow label="Time" value={formatTime(time)} />
            <SummaryRow label="Guests" value={`${guests}`} />

            {bookingId && (
              <SummaryRow label="Booking ID" value={`#${bookingId}`} />
            )}

          </div>
          {/* buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/bookings")}
              className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
            >
              View Bookings
            </button>
            <button
              onClick={() => navigate("/dining")}
              className="flex-1 border py-3 rounded-xl hover:bg-gray-50 transition"
            >
              Explore
            </button>

          </div>
          {autoRedirect && (
            <p className="text-center text-xs text-gray-400 mt-4">
              Redirecting to bookings in 5 seconds...
            </p>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BookingSuccessDialog


const SummaryRow = ({ label, value }) => {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}