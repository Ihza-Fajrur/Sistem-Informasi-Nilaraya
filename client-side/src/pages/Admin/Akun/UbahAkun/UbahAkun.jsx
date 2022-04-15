import React from "react";
// import Error404 from "../src/pages/Error404";
import {useNavigate} from "react-router-dom";
import "./ubahAkun.scss";

// icons sicdebar
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';



export default function UbahAkun() {
  let navigate = useNavigate();
  return (
    <div className="body">
      <div className="sidebar">
        <header className="header">KliniX</header>
        <ul className="ul">
          <li><a href="/admin"><HomeOutlinedIcon className="iconSidebar"/>Beranda</a></li>
          <li><a href=""><AccessibleForwardOutlinedIcon className="iconSidebar"/>Pasien</a></li>
          <li><a href=""><NoteAddOutlinedIcon className="iconSidebar"/>Rekam Medis</a></li>
          <li><a href=""><VaccinesOutlinedIcon className="iconSidebar"/>Tindakan Medis</a></li>
          <li><a href=""><MedicationOutlinedIcon className="iconSidebar"/>Obat</a></li>
          <li><a href="/admin/dataakun" className="active"><PermIdentityOutlinedIcon className="iconSidebar"/>Akun</a></li>
          <li><a href="/"><LogoutOutlinedIcon className="iconSidebar"/>Logout</a></li>
        </ul>
      </div>

      <div className="head">
            <div className="wrap-bagianAtas">
                <div className="bagianAtas">
                    <h1>Form Ubah Data Akun</h1>
                </div>
            </div>
        
          <div className="wrap-table">
            

            
          </div>
        </div>
      </div>
  );
}
