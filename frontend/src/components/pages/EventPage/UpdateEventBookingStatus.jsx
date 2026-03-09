import axios from "axios";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const UpdateEventBookingStatus = () => {
  const [params] = useSearchParams();
  const bookingId = params.get("bookingId");
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!bookingId) {
      setStatus("failed");
      return;
    }

    const fetchBooking = async () => {
      try {
        setStatus("loading");

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/event/booking/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        console.log("response",response.data)
        const bookingData = response?.data?.data?.booking

        if (!bookingData) {
          setStatus("failed");
          return;
        }
        setBooking(bookingData);
        if (bookingData.paymentStatus === "paid") {
          setStatus("success");
          setTimeout(() => {
            navigate("/bookings");
          }, 3000);
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("failed to fetch booking", error);
        setStatus("failed");
      }
    };

    fetchBooking();
  }, [bookingId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F7F8FC] via-white to-[#F3F4F6] px-4">
      <div className="relative w-full max-w-lg">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 blur-2xl opacity-30 rounded-3xl"></div>

        <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 text-center">

          {/* LOADING */}
          {status === "loading" && (
            <>
              <div className="flex justify-center">
                <div className="p-5 rounded-full bg-blue-50 ring-4 ring-blue-100">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                Verifying Payment
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Please wait while we confirm your transaction.
              </p>
            </>
          )}

          {/* SUCCESS */}
          {status === "success" && (
            <>
              <div className="flex justify-center">
                <div className="p-5 rounded-full bg-green-50 ring-4 ring-green-100">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-6">
                Payment Successful 🎉
              </h1>

              <p className="text-gray-500 text-sm mt-2">
                Your booking has been confirmed successfully.
              </p>

              <div className="mt-6 bg-gray-50 border rounded-xl py-3 px-4 text-sm text-gray-600">
                Booking ID
                <div className="font-semibold text-gray-900 mt-1">
                  {bookingId}
                </div>
              </div>

              <p className="mt-6 text-xs text-gray-400">
                Redirecting you to your bookings...
              </p>
            </>
          )}

          {/* FAILED */}
          {status === "failed" && (
            <>
              <div className="flex justify-center">
                <div className="p-5 rounded-full bg-red-50 ring-4 ring-red-100">
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-6">
                Payment Failed
              </h1>

              <p className="text-gray-500 text-sm mt-2">
                We couldn't verify your payment. Please try again.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-6 bg-black text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
              >
                Go Home
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateEventBookingStatus;
