import React, { useEffect, useState } from "react";
import { getLogs } from "../services/logsService.js";

const LogsPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs().then(setLogs);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">System Logs</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Message</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>
                  <span className="badge badge-primary">{log.type}</span>
                </td>
                <td>{log.message}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsPage;
