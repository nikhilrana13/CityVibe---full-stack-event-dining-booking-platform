import { XCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const bookingId = params.get("bookingId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F7F8FC] via-white to-[#F3F4F6] px-4">
      <div className="relative w-full max-w-lg">
        {/* glow background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-200 via-pink-200 to-orange-200 blur-2xl opacity-30 rounded-3xl"></div>
        <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 text-center">
          {/* icon */}
          <div className="flex justify-center">
            <div className="p-5 rounded-full bg-red-50 ring-4 ring-red-100">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>
          {/* title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-6">
            Payment Failed
          </h1>
          {/* subtitle */}
          <p className="text-gray-500 text-sm mt-2">
            Your payment was cancelled or could not be processed.
          </p>
          {/* booking id */}
          {bookingId && (
            <div className="mt-6 bg-gray-50 border rounded-xl py-3 px-4 text-sm text-gray-600">
              Booking ID
              <div className="font-semibold text-gray-900 mt-1">
                {bookingId}
              </div>
            </div>
          )}
          {/* actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl bg-black text-white font-medium hover:opacity-90 transition"
            >
              Retry Payment
            </button>
            <button
              onClick={() => navigate("/bookings")}
              className="px-6 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition"
            >
              View Bookings
            </button>
          </div>
          {/* home link */}
          <p
            onClick={() => navigate("/")}
            className="mt-6 text-xs text-gray-400 cursor-pointer hover:text-gray-600"
          >
            Go back to homepage
          </p>

        </div>

      </div>

    </div>
  );
};

export default PaymentFailed;