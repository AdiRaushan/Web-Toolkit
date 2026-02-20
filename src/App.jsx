/**
 * App.jsx
 * Root application shell with React Router.
 * Routes to Dashboard, DemoApp, and AuditApp.
 * Layout includes the global Navbar.
 */

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./routes/Dashboard";
import DemoApp from "./routes/DemoApp";
import AuditApp from "./routes/AuditApp";

const App = () => {
  const location = useLocation();
  const isDemoPage = location.pathname === "/demo";
  const isDashboard = location.pathname === "/";

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Global Navigation — hidden on / (hero has integrated navbar), auto-hide on /demo */}
      {!isDashboard && <Navbar autoHide={isDemoPage} />}

      {/* Route Pages */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/demo" element={<DemoApp />} />
        <Route path="/audit" element={<AuditApp />} />
      </Routes>
    </div>
  );
};

export default App;
