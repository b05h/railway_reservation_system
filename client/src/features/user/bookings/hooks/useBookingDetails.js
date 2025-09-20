import { useEffect } from "react";
import { useGetBookingById } from "../services/bookingService";

/**
 * Custom hook to fetch booking details by ID
 * @param {string} bookingId
 */
export function useBookingDetails(bookingId) {
  const {
    resolve: loadBooking,
    data: booking,
    isLoading,
    isError,
  } = useGetBookingById(bookingId);

  useEffect(() => {
    if (bookingId) {
      loadBooking();
    }
  }, [bookingId, loadBooking]);

  return { booking, isLoading, isError };
}
