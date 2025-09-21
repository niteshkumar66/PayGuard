import { useEffect, useState } from "react";
import { fetchReports } from "../api";

interface Report {
  id: string;
  title: string;
  reporterName: string;
  reporterEmail: string;
  details: string;
  status: string;
  createdAt: string;
}

export default function ReportsList({ refresh }: { refresh: boolean }) {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetchReports().then(setReports);
  }, [refresh]);

  return (
    <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
      <h3>📂 Report Records</h3>
      {reports.length === 0 ? (
        <p>No fraud reports yet.</p>
      ) : (
        <ul>
          {reports.map((r) => (
            <li key={r.id}>
              <b>{r.title}</b> — {r.reporterName} ({r.reporterEmail})<br />
              <i>{r.details}</i><br />
              Status: {r.status} | Filed: {new Date(r.createdAt).toLocaleString()}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}