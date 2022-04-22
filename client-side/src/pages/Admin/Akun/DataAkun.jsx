import React from "react";
// import Error404 from "../src/pages/Error404";
import {useNavigate} from "react-router-dom";
import "./dataAkun.scss";

// icons sicdebar
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';



export default function DataAkun() {
  let navigate = useNavigate();
  return (
    <div className="body">
      <div className="sidebar">
        <header className="header">KliniX</header>
        <ul className="ul">
          <li><a href="/admin"><HomeOutlinedIcon className="iconSidebar"/>Beranda</a></li>
          <li><a href=""><AccessibleForwardOutlinedIcon className="iconSidebar"/>Pasien</a></li>
          <li><a href="/admin/dataRekamMedis"><NoteAddOutlinedIcon className="iconSidebar"/>Rekam Medis</a></li>
          <li><a href=""><VaccinesOutlinedIcon className="iconSidebar"/>Tindakan Medis</a></li>
          <li><a href=""><MedicationOutlinedIcon className="iconSidebar"/>Obat</a></li>
          <li><a href="/admin/dataakun" className="active"><PermIdentityOutlinedIcon className="iconSidebar"/>Akun</a></li>
          <li><a href="/"><LogoutOutlinedIcon className="iconSidebar"/>Logout</a></li>
        </ul>
      </div>

      <div className="head">
            <div className="wrap-bagianAtas">
                <div className="bagianAtas">
                    <h1>Data Akun</h1>
                </div>
                <div className="cari">
                    <input type="text" className="inputcari" placeholder="Masukkan Kata Kunci"/>
                </div>
          </div>
        
          <div className="wrap-table">
            <div>
              <button className="btn_tambah"
              onClick={() => {
                navigate("/admin/dataakun/tambah");
              }}>
                Tambah Data Akun
              </button>
            </div>

            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Nama User</th>
                    <th>Tipe Akun</th>  
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>ilham11</th>
                    <th>11213</th>
                    <th>Ilham Nofri</th>
                    <th>Kasir</th>
                    <th>
                      <div className="aksi">
                        <button className="btn_ubah" 
                        onClick={() => {
                          navigate("/admin/dataakun/ubah");
                        }}>
                        Ubah</button>
                        <button className="btn_hapus"
                        onClick={() => {
                          navigate("/admin/dataakun");
                        }}>
                        Hapus</button>
                      </div>
                      
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}
