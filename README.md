# 🛡️ IT-Ticketing tool

An automated, full-stack IT helpdesk ticketing system powered by **Gemini API** for automated issue classification and triage scoring. Built with a lightweight backend using **Express.js** and **SQLite**, wrapped inside a sleek, responsive cyber-ops themed management console dashboard.

---

## 🚀 Key Features

* **AI Triage & Auto-Classification:** Leverages the Gemini API to automatically parse user descriptions, categorize them (e.g., Network, Hardware, Software), and assign appropriate urgency priorities (High, Medium, Low) in real-time.
* **Cyber-Ops Terminal UI:** A dark-themed management dashboard inspired by terminal networks, engineered using Tailwind CSS and JetBrains Mono typography for high scannability.
* **Live Status Operations:** Provides operations handlers (`// prcs` and `// rslv`) to update internal ticket states directly from the console interface.
* **Matrix Filtering Grid:** Instant real-time matrix sorting system to filter incoming support queues by specific hardware/network targets or strict urgency vectors.
* **Persistent Lightweight Database:** Uses an optimized local SQLite structure that auto-initializes schemas cleanly on startup.

---

## 📁 Project Architecture

```text
ticketing/
├── public/
│   └── index.html         # Cyber-ops Dashboard View & Fetch Interface
├── src/
│   ├── config/
│   │   └── database.js    # SQLite Client Initialization & Table Schema
│   ├── controllers/
│   │   └── ticketController.js # Core Business Logic & Gemini API Prompt Engine
│   ├── routes/
│   │   └── ticketRoutes.js     # API Route Decoupling Matrix
│   └── app.js             # Main Express Engine Server Setup
├── .env                   # Local Environment Keys (Protected)
├── package.json           # Node Dependency Matrix
└── README.md              # Project Documentation

```

---

## 🛠️ Tech Stack Matrix

* **Backend Engine:** Node.js, Express.js
* **Intelligence Layer:** Google Gen AI SDK (`@google/genai`)
* **Storage Matrix:** SQLite (`sqlite` & `sqlite3`)
* **Frontend Layer:** HTML5, Tailwind CSS, JetBrains Mono & Inter Fonts

---

## 🔧 Installation & Environment Setup

Follow these operational guidelines to clone and execute the console infrastructure locally on your machine:

### 1. Prerequisites

Ensure you have the following frameworks installed:

* [Node.js](https://nodejs.org/) (Version 18+ or later recommended)
* A Google AI Studio API key (Obtainable via [Google AI Studio](https://aistudio.google.com/))

### 2. Dependency Extraction

Navigate to your active directory and install the necessary package node modules:

```bash
npm install

```

### 3. Environment Variables Configuration

Create a `.env` file in the root directory of your project (parallel to `package.json`) and insert your API credentials:

```env
PORT=3000
GEMINI_API_KEY=your_actual_gemini_api_key_here

```

> ⚠️ **Security Note:** Never commit your `.env` file to public Git repositories. Ensure it remains added inside your `.gitignore` configuration.

---

## 📡 Operational Execution

Start the core Express server stack using the node module loader runner:

```bash
node src/app.js

```

Upon a successful handshake protocol, the console output will log:

```text
📌 SQLite Database & Table "tickets" successfully initialized.
📡 Server backend is running perfectly on http://localhost:3000

```

Open your default web browser interface and enter the local socket navigation layer:

```text
http://localhost:3000

```

---

## 🎛️ REST API Schema Reference

### 1. File a Support Ticket

* **Endpoint:** `POST /api/tickets`
* **Payload Structure (JSON):**

```json
{
  "title": "Koneksi Wi-Fi Ruang Meeting Putus",
  "description": "Halo tim IT, Wi-Fi di ruang meeting utama lantai 3 tidak bisa terhubung sama sekali dari pagi ini. Padahal ada jadwal meeting penting dengan klien satu jam lagi. Mohon bantuannya."
}

```

### 2. Fetch Active Queue Array

* **Endpoint:** `GET /api/tickets`

### 3. Mutate Ticket Lifecycle Status

* **Endpoint:** `PUT /api/tickets/:id/status`
* **Payload Structure (JSON):**

```json
{
  "status": "In Progress" // Accepted Values: "Open", "In Progress", "Resolved"
}

```

---

## 👤 Author Credits

* **Systems Engineer & Developer:** Rezi Ichsan
* **Console Edition:** v2.0 // 2026
