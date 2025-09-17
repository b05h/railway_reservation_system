// Mock Revenue Data
const mockRevenue = [
  {
    id: 1,
    trainCode: "12345",
    trainName: "Express A",
    date: "2025-09-01",
    ticketsSold: 120,
    revenue: 48000,
  },
  {
    id: 2,
    trainCode: "67890",
    trainName: "Express B",
    date: "2025-09-02",
    ticketsSold: 90,
    revenue: 36000,
  },
  {
    id: 3,
    trainCode: "11111",
    trainName: "Express C",
    date: "2025-09-02",
    ticketsSold: 150,
    revenue: 60000,
  },
];

// Fetch all revenue records
export const getRevenueRecords = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRevenue);
    }, 200); // simulate network delay
  });
};

// Fetch revenue by train code
export const getRevenueByTrain = async (trainCode) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockRevenue.filter((r) => r.trainCode === trainCode);
      resolve(filtered);
    }, 200);
  });
};
