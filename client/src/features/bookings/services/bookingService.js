// Mock booking data
const mockBookings = [
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
      totalAmount: 1500.00,
      status: "CONFIRMED",
    },
    {
      bookingId: "B1002",
      pnr: "PNR4D5E6F",
      train: { name: "Express B", code: "67890" },
      source: "Station P",
      destination: "Station R",
      departureDate: "2025-11-01",
      passengers: [
        { name: "Peter Jones", age: 45, seat: "A2-10" },
      ],
      totalAmount: 800.00,
      status: "CONFIRMED",
    },
  ];
  
  // Fetch all bookings for a user
  export const getBookingsByUserId = async (userId) => {
    console.log(`Fetching bookings for user: ${userId}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would query a database by userId.
        // For now, we return all mock bookings.
        resolve(mockBookings);
      }, 500); // Simulate network delay
    });
  };
  
  // Fetch a single booking by its ID
  export const getBookingById = async (bookingId) => {
    console.log(`Fetching booking details for ID: ${bookingId}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        const booking = mockBookings.find((b) => b.bookingId === bookingId);
        resolve(booking);
      }, 500);
    });
  };
  
  // Simulate creating a new booking
  export const createBooking = async (bookingData) => {
    console.log("Creating new booking with data:", bookingData);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate PNR and booking ID generation
        const newBooking = {
          ...bookingData,
          bookingId: `B${Math.floor(Math.random() * 10000)}`,
          pnr: `PNR${Math.random().toString(36).substr(2, 7).toUpperCase()}`,
          status: "CONFIRMED",
        };
        // In a real app, you would save this to the database
        mockBookings.push(newBooking);
        resolve(newBooking);
      }, 1000);
    });
  };