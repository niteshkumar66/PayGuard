# 🚨 PayGuard App

PayGuard is a fraud-prevention and reporting system built for hackathons.  
It empowers users to **scan suspicious links, detect scams, auto-generate FIR reports, and track fraud cases** in real-time.

---

## ✨ Features

- 🔐 **Authentication** – Login/Signup with phone/email or Guest mode  
- 🏠 **Dashboard** – Quick scan, latest fraud alerts, and navigation shortcuts  
- 🔍 **Fraud Detection** – AI-powered link scanner with risk scoring (0–100%)  
- ⚠️ **Alerts Feed** – Shows details of detected frauds with suggested actions  
- 🔗 **Money Tracing Flow** – Visual timeline of money movement between wallets/accounts  
- 📑 **FIR Generator** – Auto-fills FIR details, generates PDF, and registers case  
- 📂 **Case Tracker** – Track cases filed with live status updates  
- ⚙️ **Settings** – Dark mode, language selection, notifications, profile & privacy options  
- 🤖 **AI Help Bot** – Built-in chatbot for guidance & quick help  

---

## 🏗️ Tech Stack

**Frontend:**  
- React + Vite (TypeScript)  
- TailwindCSS (UI styling)  

**Backend:**  
- Node.js + Express  
- PDF-Lib (for FIR PDF generation)  
- In-memory data store (for demo/hackathon use)  

**Database (future scope):**  
- MongoDB / Firebase  

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/payguard-app.git
cd payguard-app
