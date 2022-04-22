import React from "react";
// import Error404 from "../src/pages/Error404";
import {useNavigate} from "react-router-dom";
import "./dataPasien.scss";

// icons sicdebar
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';



export default function DataPasienKasir() {
  let navigate = useNavigate();
  return (
    <div className="body">
      <div className="sidebar">
        <header className="header">KliniX</header>
        <ul className="ul">
          <li><a href="/kasir"><HomeOutlinedIcon className="iconSidebar"/>Beranda</a></li>
          <li><a href="/kasir/waitinglist/umum"><SummarizeOutlinedIcon className="iconSidebar"/>Waiting List Umum</a></li>
          <li><a href="/kasir/waitinglist/gigi"className="active"><SummarizeOutlinedIcon className="iconSidebar"/>Waiting List Gigi</a></li>
          <li><a href=""><AccessibleForwardOutlinedIcon className="iconSidebar"/>Pasien</a></li>
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
                navigate("/admin/dataPasien/tambah");
              }}>
                Tambah Data Pasien
              </button>
            </div>

            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>No. Rekam Medis</th>
                    <th>No. BPJS</th>
                    <th>Kelamin (P/L)</th>  
                    <th>TTL</th>
                    <th>Alamat</th>
                    <th>No. HP</th>
                    <th>Riwayat Penyakit / Alergi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Sudirman</th>
                    <th>124231</th>
                    <th>A112DAE2</th>
                    <th>L</th>
                    <th>Jambi, 13 Maret 1999</th>
                    <th>Kedaton</th>
                    <th>081232124332</th>
                    <th>Alergi Antibiotik</th>
                    <th>
                      <div className="aksi">
                        <button className="btn_rekammedis" 
                        onClick={() => {
                          navigate("");
                        }}>
                        Rekam Medis</button>
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
