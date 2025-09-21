// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PDFDocument, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple in-memory stores (for demo/hackathon)
const alerts = [];   // { id, link, riskScore, type, suggestion, timestamp }
const cases = [];    // { id, title, details, status, createdAt, updates[] }

// Health check
app.get("/", (req, res) => res.send("PayGuard backend running ✅"));

// ---- Mock AI Link Scanner ----
// Returns a risk score and suggestion
app.post("/api/scan", (req, res) => {
  const { link } = req.body || {};
  if (!link) return res.status(400).json({ error: "link required" });

  // Very simple heuristics + word list
  const suspiciousWords = ["free", "win", "lottery", "prize", "bank", "urgent", "verify", "password"];
  const suspicious = suspiciousWords.some(w => new RegExp(`\\b${w}\\b`, "i").test(link));
  const riskScore = suspicious ? Math.floor(70 + Math.random() * 25) : Math.floor(5 + Math.random() * 30);
  const type = suspicious ? "Phishing / Scam" : "Likely Safe";
  const suggestion = suspicious ? "Block / Report / Do not click" : "Monitor";

  const record = {
    id: uuidv4(),
    link,
    riskScore,
    type,
    suggestion,
    timestamp: new Date().toISOString()
  };
  alerts.unshift(record);
  res.json(record);
});

// ---- Get Recent Alerts ----
app.get("/api/alerts", (req, res) => {
  res.json(alerts.slice(0, 50));
});

// ---- Create Case (FIR filing simplified) ----
app.post("/api/cases", (req, res) => {
  const { title, reporterName, reporterEmail, details } = req.body || {};
  if (!title || !details) return res.status(400).json({ error: "title and details required" });

  const newCase = {
    id: uuidv4(),
    title,
    reporterName: reporterName || "Anonymous",
    reporterEmail: reporterEmail || "",
    details,
    status: "Filed",
    createdAt: new Date().toISOString(),
    updates: [{ ts: new Date().toISOString(), status: "Filed" }]
  };
  cases.unshift(newCase);
  res.json(newCase);
});

// ---- Get Cases ----
app.get("/api/cases", (req, res) => {
  res.json(cases);
});

// ---- Update case status (demo) ----
app.post("/api/cases/:id/update", (req, res) => {
  const id = req.params.id;
  const { status, note } = req.body || {};
  const c = cases.find(x => x.id === id);
  if (!c) return res.status(404).json({ error: "case not found" });
  c.status = status || c.status;
  c.updates.push({ ts: new Date().toISOString(), status: c.status, note: note || "" });
  res.json(c);
});

// ---- FIR PDF Generator ----
// ---- FIR PDF Generator ----
app.post("/api/fir", async (req, res) => {
  try {
    const { name, email, phone, description } = req.body || {};

    // Create a case record when FIR is filed
    const newCase = {
      id: uuidv4(),
      title: "FIR Report",
      reporterName: name || "N/A",
      reporterEmail: email || "",
      details: description || "N/A",
      status: "Filed",
      createdAt: new Date().toISOString(),
      updates: [{ ts: new Date().toISOString(), status: "Filed" }]
    };
    cases.unshift(newCase);

    // Generate PDF as before
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const lines = [
      "FIRST INFORMATION REPORT (FIR) - PayGuard (Demo)",
      "-------------------------------------------------",
      `FIR ID: ${newCase.id}`,
      `Reported By: ${name || "N/A"}`,
      `Email: ${email || "N/A"}`,
      `Phone: ${phone || "N/A"}`,
      `Date: ${new Date().toLocaleString()}`,
      "",
      "Description:",
      description || "N/A"
    ];

    let cursorY = 800;
    const lineHeight = 16;
    lines.forEach((ln) => {
      page.drawText(ln, { x: 50, y: cursorY, size: 12, font });
      cursorY -= lineHeight;
    });

    const pdfBytes = await pdfDoc.save();

    // Send back JSON + PDF
    res.json({
      case: newCase,
      pdf: Buffer.from(pdfBytes).toString("base64")
    });

  } catch (err) {
    console.error("FIR gen error", err);
    return res.status(500).json({ error: "failed to generate FIR" });
  }
});

// ---- Serve a small JSON dump for demo if needed ----
app.get("/api/debug", (req, res) => {
  res.json({ alertsCount: alerts.length, casesCount: cases.length });
});

// Start server
const DEFAULT_PORT = process.env.PORT || 5000;

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`🚀 PayGuard backend running at http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`⚠️ Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("Server error:", err);
    }
  });
}

startServer(Number(DEFAULT_PORT));