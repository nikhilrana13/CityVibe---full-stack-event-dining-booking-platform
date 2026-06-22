import BookingNotFound from "@/components/bookings/BookingNotFound";
import { useGetEventBookingDetailQuery } from "@/redux/api/BookingApi";
import { CheckCircle, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const bookingId = params.get("bookingId");
  if (!bookingId) {
    return <BookingNotFound />;
  }
  const bookingQuery = useGetEventBookingDetailQuery(bookingId, {
    skip: !bookingId
  })
  const booking = bookingQuery?.data?.data?.booking
  const notFound = !bookingQuery.isLoading && bookingQuery.isSuccess && !booking;
  const navigate = useNavigate();

  // auto redirect
  useEffect(() => {
    if (booking) {
      const timer = setTimeout(() => {
        navigate("/bookings", { replace: true });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [booking, navigate]);

  if (bookingQuery?.isLoading) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="p-5 rounded-full bg-blue-50 ring-4 ring-blue-100">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mt-6">
            Verifying Payment
          </h2>

          <p className="text-gray-500 text-sm mt-2 text-center">
            Please wait while we confirm your transaction.
          </p>
        </div>
      </>
    )
  }
  if (bookingQuery?.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h2 className="text-lg font-semibold">Unable to load booking</h2>
          <p className="mt-2 text-sm text-gray-600">There was an issue fetching your booking details.</p>
          <button
            onClick={() => bookingQuery.refetch()}
            className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  if (notFound) {
    return <BookingNotFound />
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F7F8FC] via-white to-[#F3F4F6] px-4">
      <div className="relative w-full max-w-lg">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 blur-2xl opacity-30 rounded-3xl"></div>

        <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 text-center">

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

        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess
