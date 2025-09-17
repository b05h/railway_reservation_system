// src/features/trains/components/TrainSchedule.jsx
export default function TrainSchedule({ trainId, schedule }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Schedule for Train {trainId}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Station</th>
              <th>Arrival</th>
              <th>Departure</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((stop, idx) => (
              <tr key={idx}>
                <td>{stop.station}</td>
                <td>{stop.arrival}</td>
                <td>{stop.departure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
