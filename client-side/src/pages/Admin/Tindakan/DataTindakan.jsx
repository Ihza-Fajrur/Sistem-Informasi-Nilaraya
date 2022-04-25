import React from "react";
// import Error404 from "../src/pages/Error404";
import { useNavigate } from "react-router-dom";
import "./dataTindakan.scss";

// icons sicdebar
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function DataTindakan() {
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
            <h1>Data Tindakan Medis</h1>
          </div>
          <div className="cari">
            <input
              type="text"
              className="inputcari"
              placeholder="Masukkan Kata Kunci"
            />
          </div>
        </div>

        <div className="wrap-table">
          <div>
            <button
              className="btn_tambah"
              onClick={() => {
                navigate("/admin/dataTindakan/tambah");
              }}
            >
              Tambah Tindakan
            </button>
          </div>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Nama Tindakan</th>
                  <th>Kode Tindakan</th>
                  <th>Klasifikasi Umur</th>
                  <th>Tarif</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Cabut Gigi</th>
                  <th>627361</th>
                  <th>Dewasa</th>
                  <th>400.000</th>
                  <th>
                    <div className="aksi">
                      <button
                        className="btn_ubah"
                        onClick={() => {
                          navigate("/admin/dataTindakan/ubah");
                        }}
                      >
                        Ubah
                      </button>
                      <button
                        className="btn_hapus"
                        onClick={() => {
                          navigate("/admin/dataTindakan");
                        }}
                      >
                        Hapus
                      </button>
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
