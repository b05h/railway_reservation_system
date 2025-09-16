// Mock train schedules
export const getTrainSchedule = (trainId) => {
  // You can customize per trainId if needed
  const schedules = {
    12345: [
      { station: "Station X", arrival: "-", departure: "08:00" },
      { station: "Station A", arrival: "09:30", departure: "09:35" },
      { station: "Station B", arrival: "11:00", departure: "11:05" },
      { station: "Station Y", arrival: "12:00", departure: "-" },
    ],
    102: [
      { station: "Station P", arrival: "-", departure: "07:00" },
      { station: "Station Q", arrival: "08:20", departure: "08:25" },
      { station: "Station R", arrival: "09:40", departure: "09:45" },
      { station: "Station S", arrival: "11:00", departure: "-" },
    ],
  };

  return schedules[trainId] || [];
};
