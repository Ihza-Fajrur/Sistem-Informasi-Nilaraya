import React from "react";
// import Error404 from "../src/pages/Error404";
import { useNavigate } from "react-router-dom";
import "./ubahTindakan.scss";

// icons sicdebar
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function UbahTindakan() {
  let navigate = useNavigate();
  return (
    <div className="body">
      <div className="sidebar">
        <header className="header">KliniX</header>
        <ul className="ul">
          <li>
            <a href="/admin">
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
            <a href="/admin/dataTindakan" className="active">
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
        <div className="wrap-bagianAtas">
          <div className="bagianAtas">
            <h1>Form Pengubahan Tindakan</h1>
          </div>
        </div>

        <div className="wrap-table">
          <form action="">
            <div className="wrap-input">
              <label htmlFor="namatindakan" className="label-input">
                Nama Tindakan
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Masukkan Nama Tindakan"
              />
            </div>
            <div className="wrap-input">
              <label htmlFor="kodetindakan" className="label-input">
                Kode Tindakan
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Masukkan Kode Tindakan"
              />
            </div>
            <div className="wrap-input">
              <label htmlFor="klasifikasiumur" className="label-input">
                Klasifikasi Umur
              </label>
              <select
                name="klasifikasiumur"
                id="klasifikasiumur"
                className="input-field"
              >
                <option value="anakanak">Anak-Anak</option>
                <option value="dewasa">Dewasa</option>
                <option value="lansia">Lansia</option>
              </select>
            </div>
            <div className="wrap-input">
              <label htmlFor="tarif" className="label-input">
                Tarif
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Masukkan Tarif"
              />
            </div>
          </form>

          <div className="ubah">
            <button
              className="btn-ubah"
              onClick={() => {
                navigate("/admin/dataTindakan");
              }}
            >
              Ubah Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
