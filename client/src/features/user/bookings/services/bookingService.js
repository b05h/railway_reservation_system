// bookingApi.js
import { useApi } from "../../../../services/useApi";

// --- Demo/mock booking data ---
const demoBookings = [
  {
    bookingId: "B1001",
    pnr: "PNR1A2B3C",
    train: { name: "Express A", code: "12345" },
    source: "Station X",
    destination: "Station Y",
    departureDate: "2025-10-25",
    passengers: [
      { name: "John Doe", age: 30, seat: "S1-25" },
      { name: "Jane Doe", age: 28, seat: "S1-26" },
    ],
    totalAmount: 1500.0,
    status: "CONFIRMED",
  },
  {
    bookingId: "B1002",
    pnr: "PNR4D5E6F",
    train: { name: "Express B", code: "67890" },
    source: "Station P",
    destination: "Station R",
    departureDate: "2025-11-01",
    passengers: [{ name: "Peter Jones", age: 45, seat: "A2-10" }],
    totalAmount: 800.0,
    status: "CONFIRMED",
  },
];

// --- API functions wrapped in useApi ---

// Get all bookings by user ID
export const useGetBookingsByUserId = (userId) =>
  useApi({
    endpoint: async () => {
      const res = await fetch(`/api/users/${userId}/bookings`);
      if (!res.ok) throw new Error(`Failed to fetch bookings (${res.status})`);
      return res.json();
    },
    fallbackData: demoBookings,
  });

// Get booking by booking ID
export const useGetBookingById = (bookingId) =>
  useApi({
    endpoint: async () => {
      const res = await fetch(`/api/bookings/${bookingId}`);
      if (!res.ok) throw new Error(`Failed to fetch booking (${res.status})`);
      return res.json();
    },
    fallbackData: demoBookings.find((b) => b.bookingId === bookingId) || null,
  });

// Create a new booking
export const useCreateBooking = () =>
  useApi({
    endpoint: async (bookingData) => {
      const res = await fetch(`/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (!res.ok) throw new Error(`Failed to create booking (${res.status})`);
      return res.json();
    },
    fallbackData: null,
    onError: (err) =>
      console.warn("Create booking failed, using demo fallback", err),
  });

// Update a booking
export const useUpdateBooking = (bookingId) =>
  useApi({
    endpoint: async (updateData) => {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error(`Failed to update booking (${res.status})`);
      return res.json();
    },
    fallbackData: demoBookings.find((b) => b.bookingId === bookingId) || null,
    onError: (err) =>
      console.warn("Update booking failed, using demo fallback", err),
  });
