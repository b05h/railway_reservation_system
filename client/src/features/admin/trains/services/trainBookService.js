// src/features/trains/services/trainBookService.js

// Mock DB of trains with detailed coach + fare
const mockTrains = [
  {
    code: "12345",
    name: "Express A",
    source: "Station X",
    destination: "Station Y",
    departureTime: "08:00",
    arrivalTime: "12:00",
    duration: "4h",
    classes: [
      { type: "Sleeper", fare: 300 },
      { type: "AC 3 Tier", fare: 750 },
      { type: "AC 2 Tier", fare: 1100 },
      { type: "AC First Class", fare: 1850 },
    ],
  },
  {
    code: "54321",
    name: "Express B",
    source: "Station Y",
    destination: "Station Z",
    departureTime: "15:00",
    arrivalTime: "20:00",
    duration: "5h",
    classes: [
      { type: "Sleeper", fare: 350 },
      { type: "AC 3 Tier", fare: 800 },
      { type: "AC 2 Tier", fare: 1200 },
    ],
  },
];

// Mock booking function
export const bookTrain = async ({ trainId, coachType, passengerName }) => {
  // Find train
  const train = mockTrains.find((t) => t.code === trainId);
  if (!train) {
    throw new Error("Train not found");
  }

  // Find selected coach
  const coach = train.classes.find((c) => c.type === coachType);
  if (!coach) {
    throw new Error("Invalid coach type");
  }

  // Mock booking confirmation
  const booking = {
    pnr: Math.floor(1000000000 + Math.random() * 9000000000).toString(), // random 10-digit PNR
    trainNo: train.code,
    trainName: train.name,
    source: train.source,
    destination: train.destination,
    passenger: passengerName || "Unknown",
    coachType: coach.type,
    fare: coach.fare,
    status: "CONFIRMED",
    bookedAt: new Date().toISOString(),
  };

  // Simulate async delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(booking), 800);
  });
};

// Optional helper: fetch train details for booking page
export const getTrainById = async (trainId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const train = mockTrains.find((t) => t.code === trainId);
      resolve(train || null);
    }, 300); // simulate small delay
  });
};
