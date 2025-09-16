import React, { useEffect, useState } from "react";
import { getRevenueRecords } from "../services/revenueService";

export default function RevenuePage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRevenueRecords();
      setRecords(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Revenue Reports</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Train Code</th>
              <th>Train Name</th>
              <th>Date</th>
              <th>Tickets Sold</th>
              <th>Revenue (₹)</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.id}</td>
                <td>{rec.trainCode}</td>
                <td>{rec.trainName}</td>
                <td>{rec.date}</td>
                <td>{rec.ticketsSold}</td>
                <td>{rec.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
