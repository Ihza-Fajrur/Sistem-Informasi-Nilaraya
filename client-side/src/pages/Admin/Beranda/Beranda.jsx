import React from "react";
// import Error404 from "../src/pages/Error404";
import { useNavigate } from "react-router-dom";
import "./beranda.scss";
// icons sicdebar
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HotelIcon from "@mui/icons-material/Hotel";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MedicationIcon from "@mui/icons-material/Medication";
import PersonIcon from "@mui/icons-material/Person";

export default function Admin() {
  let navigate = useNavigate();
  return (
    <div className="body">
      <div className="sidebar">
        <header className="header">KliniX</header>
        <ul className="ul">
          <li>
            <a href="/admin" className="active">
              <HomeOutlinedIcon className="iconSidebar" />
              Beranda
            </a>
          </li>
          <li>
            <a href="/admin/dataPasien">
              <AccessibleForwardOutlinedIcon className="iconSidebar" />
              Pasien
            </a>
          </li>
          <li>
            <a href="/admin/dataRekamMedis">
              <NoteAddOutlinedIcon className="iconSidebar" />
              Rekam Medis
            </a>
          </li>
          <li>
            <a href="/admin/dataTindakan">
              <VaccinesOutlinedIcon className="iconSidebar" />
              Tindakan Medis
            </a>
          </li>
          <li>
            <a href="/admin/dataObat">
              <MedicationOutlinedIcon className="iconSidebar" />
              Obat
            </a>
          </li>
          <li>
            <a href="/admin/dataAkun">
              <PermIdentityOutlinedIcon className="iconSidebar" />
              Akun
            </a>
          </li>
          <li>
            <a href="/">
              <LogoutOutlinedIcon className="iconSidebar" />
              Logout
            </a>
          </li>
        </ul>
      </div>

      <div className="head">
        <div className="wrap-card">
          <div className="card">
            <div className="card-body">
              <button
                className="card-btn"
                onClick={() => {
                  navigate("/admin/dataPasien");
                }}
              >
                <HotelIcon className="icon" />
                <h2> Data Pasien </h2>
              </button>
            </div>

            <div className="card-body">
              <button
                className="card-btn"
                onClick={() => {
                  navigate("/admin/dataRekamMedis");
                }}
              >
                <MedicalInformationIcon className="icon" />
                <h2>Rekam Medis</h2>
              </button>
            </div>
            <div className="card-body">
              <button
                className="card-btn"
                onClick={() => {
                  navigate("/admin/dataTindakan");
                }}
              >
                <MedicalServicesIcon className="icon" />
                <h2> Data Tindakan</h2>
              </button>
            </div>

            <div className="card-body">
              <button
                className="card-btn"
                onClick={() => {
                  navigate("/admin/dataObat");
                }}
              >
                <MedicationIcon className="icon" />
                <h2> Data Obat</h2>
              </button>
            </div>
            <div className="card-body">
              <button
                className="card-btn"
                onClick={() => {
                  navigate("/admin/dataAkun");
                }}
              >
                <PersonIcon className="icon" />
                <h2> Data Akun</h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
