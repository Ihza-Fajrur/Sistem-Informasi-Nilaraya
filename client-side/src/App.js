import React from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin/DashboardAdmin";
import Dokter from "./pages/Dokter/Beranda";
import Kasir from "./pages/Kasir/Beranda";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dokter" element={<Dokter />} />
        <Route path="/kasir" element={<Kasir />} />
      </Routes>
    </Router>
  );
}

export default App;
