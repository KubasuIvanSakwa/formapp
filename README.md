📋 Client Management Portal (Frontend)
A sophisticated, multi-step data entry application built with React and Tailwind CSS. Designed for enterprise client onboarding, it features real-time record searching, smart auto-filling, and comprehensive audit logging.

Live Demo: [Demo](https://formapp-opal.vercel.app/)

Backend Repository: [backend](https://github.com/KubasuIvanSakwa/formappdb)

<h1>Key Features</h1>
<h3>Smart Data Entry</h3>
Multi-Step Wizard: Seamless navigation between Corporate, Address, and Special Offers tabs using a custom routing system.

Live Search & Auto-Fill: Type a Client ID or Name to instantly search the database. If a record exists, the form auto-populates; if not, it prepares a new entry.

Debounced API Calls: Optimized search inputs that prevent API flooding by waiting for user inactivity.

<h3Intelligent Location Handling</h3>
Cascading Dropdowns: Selecting a Country (e.g., Kenya) automatically filters the available Regions, Districts, and Wards.

Smart Resets: Changing a parent field (like Country) automatically clears child fields to prevent invalid data combinations.

East Africa Dataset: Pre-configured data for Kenya, Tanzania, Uganda, Rwanda, and Burundi.

<h3Audit & Validation</h3>
"Behind The Scenes" (BTS) Log: A dedicated sidebar panel that tracks metadata invisible to standard users:

Record Status (Active/Closed)

Creation Timestamp & User

Last Modification Timestamp

Visual Validation: Progress bars and animated checkmarks indicate section completion status in real-time.

<h3> Modern UI/UX</h3>
Glassmorphism Headers: Sticky headers with blur effects.

Custom Inputs: tailored components for "Split Inputs" (e.g., BSC-0000) and animated search fields.

Responsive Design: Fully adaptive layout that works on desktop and tablets.

<h1>🛠️ Tech Stack</h1>
Framework: React 18 (Vite)

Styling: Tailwind CSS

Routing: React Router v6

HTTP Client: Axios

Icons: Heroicons / Custom SVG

State Management: React Hooks (useState, useReducer, useContext)

<h1>⚡ Getting Started</h1>
Prerequisites
Node.js (v16 or higher)

npm or yarn

Installation
Clone the repository

```
git clone https://github.com/KubasuIvanSakwa/formapp
cd formapp
```

Install dependencies
```
npm install
npm run dev
```

📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ActionSidebar.jsx    # Right sidebar (Save/New/Delete)
│   ├── AddressTab.jsx       # Location logic & cascading dropdowns
│   ├── FormHeader.jsx       # Collapsible header with search
│   ├── FormNavigation.jsx   # Next/Back buttons logic
│   ├── InputField.jsx       # Custom styled inputs (Split, Search, Select)
│   └── ProgressSidebar.jsx  # Left sidebar with audit logs
├── pages/
│   └── Layout.jsx       # Main layout handling global state & API calls
├── App.jsx              # Route definitions
└── main.jsx             # Entry point
```

🧩 Usage Guide
Creating a Record:

Click New in the right sidebar.

Fill in the Corporate details.

Click Next Step to move to Address.

Click Save when finished. The system will generate timestamps automatically.

<h1>Searching/Editing:</h1>

In the Header, type a Client ID (e.g., CL-001) or Name.

Wait for the "Record Found!" notification.

The form will auto-fill.

Edit any field and click Save to update.



📄 License
Distributed under the MIT License. See LICENSE for more information.

<h4>Developed by Kubasu Ivan Sakwa Full Stack Developer</h4>
