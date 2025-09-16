// src/features/admin/services/logsService.js

// Mock logs data
const mockLogs = [
  {
    id: 1,
    type: "BOOKING",
    message: "PNR 1234567890 booked successfully by user John Doe",
    timestamp: "2025-09-15T10:30:00Z",
  },
  {
    id: 2,
    type: "CANCELLATION",
    message: "PNR 1234567890 cancelled by user John Doe",
    timestamp: "2025-09-15T11:00:00Z",
  },
  {
    id: 3,
    type: "LOGIN",
    message: "Admin user logged in",
    timestamp: "2025-09-15T11:30:00Z",
  },
  {
    id: 4,
    type: "REVENUE",
    message: "Daily revenue report generated",
    timestamp: "2025-09-16T09:15:00Z",
  },
];

// Service function
export const getLogs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockLogs);
    }, 500); // simulate network delay
  });
};
