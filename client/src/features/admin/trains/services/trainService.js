// src/features/trains/services/trainService.js

const mockTrains = [
  {
    code: "12345",
    name: "Express A",
    source: "Station X",
    destination: "Station Y",
    departureTime: "08:00",
    arrivalTime: "12:00",
    duration: "4h",
    classes: ["Sleeper", "AC", "General"],
  },
  {
    code: "67890",
    name: "Express B",
    source: "Station X",
    destination: "Station Y",
    departureTime: "14:00",
    arrivalTime: "18:30",
    duration: "4h 30m",
    classes: ["AC", "General"],
  },
  {
    code: "11111",
    name: "Express C",
    source: "Station M",
    destination: "Station N",
    departureTime: "10:00",
    arrivalTime: "15:00",
    duration: "5h",
    classes: ["AC", "Sleeper"],
  },
];

// Fetch trains by source and destination
export const getTrainsByRoute = async (source, destination) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockTrains.filter(
        (t) =>
          t.source.toLowerCase() === source?.toLowerCase() &&
          t.destination.toLowerCase() === destination?.toLowerCase()
      );
      resolve(filtered);
    }, 200); // simulate network delay
  });
};

// Fetch train by train ID
export const getTrainById = async (trainId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const train = mockTrains.find((t) => t.code === trainId);
      resolve(train);
    }, 200); // simulate network delay
  });
};
