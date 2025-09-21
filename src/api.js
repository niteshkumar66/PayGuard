// src/api.js

// 👇 Change the port number here if backend runs on a different port
const BASE = "http://localhost:5001/api";

export async function scanLink(link) {
  const res = await fetch(`${BASE}/scan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ link })
  });
  return res.json();
}

export async function getAlerts() {
  const res = await fetch(`${BASE}/alerts`);
  return res.json();
}

export async function createCase(payload) {
  const res = await fetch(`${BASE}/cases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function generateFIR(payload) {
  const res = await fetch(`${BASE}/fir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.blob(); // returns PDF blob
}

export async function getCases() {
  const res = await fetch(`${BASE}/cases`);
  return res.json();
}

export function reportFraud(payload) {
  // Implement your fraud reporting logic here
  // Example:
  return fetch('/api/report-fraud', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  });
}

export function fetchReports() {
  // Example implementation
  return fetch('/api/reports').then(res => res.json());
}