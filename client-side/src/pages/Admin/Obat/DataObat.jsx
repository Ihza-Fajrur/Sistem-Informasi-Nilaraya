import React from "react";
// import Error404 from "../src/pages/Error404";
import { useNavigate } from "react-router-dom";
import "./dataObat.scss";

// icons sicdebar
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function DataObat() {
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
            <a href="/admin/dataTindakan">
              <VaccinesOutlinedIcon className="iconSidebar" />
              Tindakan Medis
            </a>
          </li>
          <li>
            <a href="/admin/dataObat" className="active">
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
            <h1>Data Obat</h1>
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
                navigate("/admin/dataObat/tambah");
              }}
            >
              Tambah Obat
            </button>
          </div>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Nama Obat</th>
                  <th>Kuantitas</th>
                  <th>Harga Jual/Strip</th>
                  <th>Harga Jual Satuan</th>
                  <th>Harga Beli</th>
                  <th>Exp Date</th>
                  <th>Jenis Obat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Amoxicillin</th>
                  <th>124321</th>
                  <th>20.000</th>
                  <th>5.000</th>
                  <th>15.000</th>
                  <th>22 April 2022</th>
                  <th>Sirup</th>
                  <th>
                    <div className="aksi">
                      <button
                        className="btn_ubah"
                        onClick={() => {
                          navigate("/admin/dataObat/ubah");
                        }}
                      >
                        Ubah
                      </button>
                      <button
                        className="btn_hapus"
                        onClick={() => {
                          navigate("/admin/dataObat");
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
