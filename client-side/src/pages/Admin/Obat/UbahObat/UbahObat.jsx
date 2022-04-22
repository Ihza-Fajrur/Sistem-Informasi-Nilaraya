import React from "react";
// import Error404 from "../src/pages/Error404";
import {useNavigate} from "react-router-dom";
import "./ubahObat.scss";

// icons sicdebar
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';



export default function UbahObat() {
  let navigate = useNavigate();
  return (
    <div className="body">
      <div className="sidebar">
        <header className="header">KliniX</header>
        <ul className="ul">
          <li><a href="/admin"><HomeOutlinedIcon className="iconSidebar"/>Beranda</a></li>
          <li><a href=""><AccessibleForwardOutlinedIcon className="iconSidebar"/>Pasien</a></li>
          <li><a href="/admin/dataRekamMedis"><NoteAddOutlinedIcon className="iconSidebar"/>Rekam Medis</a></li>
          <li><a href="/admin/dataTindakan"><VaccinesOutlinedIcon className="iconSidebar"/>Tindakan Medis</a></li>
          <li><a href="/admin/dataObat" clasname ="active"><MedicationOutlinedIcon className="iconSidebar"/>Obat</a></li>
          <li><a href="/admin/dataakun"><PermIdentityOutlinedIcon className="iconSidebar"/>Akun</a></li>
          <li><a href="/"><LogoutOutlinedIcon className="iconSidebar"/>Logout</a></li>
        </ul>
      </div>

      <div className="head">
            <div className="wrap-bagianAtas">
                <div className="bagianAtas">
                    <h1>Form Pengubahan Data Obat</h1>
                </div>
            </div>
        
          <div className="wrap-table">
            <form action="">
              <div className="wrap-input">
                <label htmlFor="namaobat" className="label-input">Nama Obat</label>
                <input type="text" className="input-field" placeholder="Masukkan Nama Obat" />
              </div>
              <div className="wrap-input">
                <label htmlFor="kuantitas" className="label-input">Kuantitas</label>
                <input type="text" className="input-field" placeholder="Masukkan Kuantitas" />
              </div>
              <div className="flex-input">
                <div className="wrap-input">
                    <label htmlFor="hargajual" className="label-input">Harga Jual/Strip</label>
                    <input type="number" className="input-field" placeholder="Masukkan Harga Jual/Strip" />
                </div>
                <div className="wrap-input">
                    <label htmlFor="hargajualsatuan" className="label-input">Harga Jual Satuan</label>
                    <input type="number" className="input-field" placeholder="Masukkan Harga Jual Satuan" />
                </div>
              </div>
              <div className="wrap-input">
                <label htmlFor="hargabeli" className="label-input">Harga Beli</label>
                <input type="number" className="input-field" placeholder="Masukkan Harga Beli" />
              </div>
              <div className="wrap-input">
                <label htmlFor="expdate" className="label-input">Exp Date</label>
                <input type="date" className="input-field" placeholder="Masukkan Exp Date" />
              </div>
              <div className="wrap-input">
                <label htmlFor="jenis" className="label-input">Jenis Obat</label>
                <select name="jenis" id="jenis" className="input-field">
                  <option value="sirup">Sirup</option>
                  <option value="tablet">Tablet</option>
                  <option value="kapsul">Kapsul</option>
                  <option value="ampul">Ampul</option>
                </select>
              </div>
            </form>

            <div className="ubah">
              <button className="btn-ubah" 
              onClick={() => {
                navigate("/admin/dataObat");
              }}> 
              Ubah Data</button>
            </div>

          </div>

          
        </div>
      </div>
  );
}