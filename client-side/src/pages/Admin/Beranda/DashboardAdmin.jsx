import React from "react";
import DataObat from "../DataObat";
// import Error404 from "../src/pages/Error404";
import {useNavigate} from "react-router-dom";
import "./dashboardAdmin.scss";

// icons sicdebar
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';



export default function DashboardAdmin() {
  let navigate = useNavigate();
  return (
    <div className="body">
      <div className="sidebar">
        <header className="header">KliniX</header>
        <ul className="ul">
          <li><a href="/admin" className="active"><HomeOutlinedIcon className="iconSidebar"/>Beranda</a></li>
          <li><a href=""><AccessibleForwardOutlinedIcon className="iconSidebar"/>Pasien</a></li>
          <li><a href=""><NoteAddOutlinedIcon className="iconSidebar"/>Rekam Medis</a></li>
          <li><a href=""><VaccinesOutlinedIcon className="iconSidebar"/>Tindakan Medis</a></li>
          <li><a href=""><MedicationOutlinedIcon className="iconSidebar"/>Obat</a></li>
          <li><a href="/admin/dataakun"><PermIdentityOutlinedIcon className="iconSidebar"/>Akun</a></li>
          <li><a href="/"><LogoutOutlinedIcon className="iconSidebar"/>Logout</a></li>
        </ul>
      </div>

      <div className="head">
        <div className="wrap-bagianAtas">
          <div className="cari">
            <input type="text" className="inputcari" placeholder="Masukkan Kata Kunci"/>
          </div>
        </div>


        </div>
    </div>
  );
}
