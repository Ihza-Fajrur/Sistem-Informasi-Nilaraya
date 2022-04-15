import React from "react";
// import Error404 from "../src/pages/Error404";
import {useNavigate} from "react-router-dom";
import "./tambahAkun.scss";

// icons sicdebar
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';



export default function TambahAkun() {
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
                    <h1>Form Tambah Data Akun</h1>
                </div>
            </div>
        
          {/* <div className="wrap-table">
            <form action="">
              <div>
                <label htmlFor="username">Username</label><br />
                <input type="text" className="input-field" placeholder="Masukkan Username" />
              </div>
              <div>
                <label htmlFor="password">Password</label><br />
                <input type="text" className="input-field" placeholder="Masukkan Password" />
              </div>
              <div>
                <label htmlFor="namaUser">Nama User</label><br />
                <input type="text" className="input-field" placeholder="Masukkan Nama User" />
              </div>
              <div>
                <label htmlFor="tipeakun">Tipe Akun</label><br />
                <select name="tipeakun" id="tipeakun" className="tipeakun">
                  <option value="admin">Admin</option>
                  <option value="dokter">Dokter</option>
                  <option value="kasir">Kasir</option>
                </select>
              </div>
            </form>
          </div> */}
        </div>
      </div>
  );
}
