import { useState } from "react";
import { scanLink } from "../api";

interface ScanResult {
  id: string;
  link: string;
  riskScore: number;
  type: string;
  suggestion: string;
  timestamp: string;
}

export default function Scanner() {
  const [link, setLink] = useState<string>("");
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async () => {
    if (!link) return;
    const res = await scanLink(link);
    setResult(res);
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8, marginBottom: 20 }}>
      <h3>🔍 Quick Link Scanner</h3>
      <input
        value={link}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)}
        placeholder="Paste suspicious link"
        style={{ padding: "6px", width: "70%", marginRight: "10px" }}
      />
      <button onClick={handleScan}>Scan</button>

      {result && (
        <div style={{ marginTop: 10 }}>
          <p><b>Type:</b> {result.type}</p>
          <p><b>Risk:</b> {result.riskScore}%</p>
          <p><b>Suggestion:</b> {result.suggestion}</p>
        </div>
      )}
    </div>
  );
}