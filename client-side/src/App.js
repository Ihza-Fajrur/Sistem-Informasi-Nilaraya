import React from "react";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/DashboardAdmin";
import Dokter from "./pages/Dokter/Beranda";
import Kasir from "./pages/Kasir/Beranda";
import Error404 from "../src/pages/Error404";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import "./app.scss";
import DataObat from "./pages/Admin/DataObat";

function App() {
  return (
    <div className="app">
      <div className="sections">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Admin />}/>
            <Route path="/admin/dataobat" element={<DataObat/>}/>
            <Route path="/dokter" element={<Dokter />} />
            <Route path="/kasir" element={<Kasir />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
