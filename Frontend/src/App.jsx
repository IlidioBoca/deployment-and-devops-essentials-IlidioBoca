import React, { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));

export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 16 }}>
      <header style={{ marginBottom: 24 }}>
        <h1>MERN App - Week 7 Deploy</h1>
        <nav style={{ display: "flex", gap: 16 }}>
          <Link to="/">Dashboard</Link>
          <Link to="/profile">Perfil</Link>
        </nav>
      </header>

      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </div>
  );
}
