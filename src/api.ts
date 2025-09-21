// src/api.ts
const BASE = "http://localhost:5001/api"; // 👈 match your backend port

export async function scanLink(link: string) {
  const res = await fetch(`${BASE}/scan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ link }),
  });
  return res.json();
}

export async function getAlerts() {
  const res = await fetch(`${BASE}/alerts`);
  return res.json();
}

export async function createCase(payload: {
  title: string;
  reporterName?: string;
  reporterEmail?: string;
  details: string;
}) {
  const res = await fetch(`${BASE}/cases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function generateFIR(payload: {
  caseId?: string;
  name?: string;
  email?: string;
  phone?: string;
  description: string;
}) {
  const res = await fetch(`${BASE}/fir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.blob(); // returns a PDF
}

// Submit a fraud report
export async function reportFraud(payload: {
  title: string;
  reporterName?: string;
  reporterEmail?: string;
  details: string;
}) {
  const res = await fetch("http://localhost:5001/api/cases", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Fetch all fraud reports
export async function fetchReports() {
  const res = await fetch("http://localhost:5001/api/cases");
  return res.json();
}

export async function getCases() {
  const res = await fetch(`${BASE}/cases`);
  return res.json();
}