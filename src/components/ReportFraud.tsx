import { useState } from "react";
import { reportFraud } from "../api";

export default function ReportFraud({ onReported }: { onReported: () => void }) {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async () => {
    if (!title || !details) return alert("Title and details required");
    await reportFraud({ title, reporterName: name, reporterEmail: email, details });
    alert("Fraud reported ✅");
    setTitle(""); setName(""); setEmail(""); setDetails("");
    onReported(); // refresh records
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8, marginBottom: 20 }}>
      <h3>🚨 Report Fraud</h3>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Case Title" /><br />
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" /><br />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" /><br />
      <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Describe the fraud" /><br />
      <button onClick={handleSubmit}>Submit Report</button>
    </div>
  );
}