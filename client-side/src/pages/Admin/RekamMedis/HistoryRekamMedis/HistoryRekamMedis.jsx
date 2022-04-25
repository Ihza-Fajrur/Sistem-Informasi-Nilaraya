import React, { useState } from "react";
// import Error404 from "../src/pages/Error404";
import { useNavigate } from "react-router-dom";
import "./historyRekamMedis.scss";

// icons sicdebar
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function HistoryRekamMedis() {
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
            <a href="/admin/dataRekamMedis" className="active">
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
        <div className="bagianAtas">
          <h1>History Rekam Medis</h1>
          <div className="line"></div>
          <h2>Data Pasien</h2>
          <div className="space">
            <div className="left-side">
              <p>Nama : </p>
              <p>Tanggal Lahir :</p>
              <p>Alamat :</p>
              <p>No. Telp :</p>
            </div>
            <div className="right-side">
              <p> No. Rekam Medis : </p>
              <p> Jenis Kelamin :</p>
              <p> Umur : </p>
              <p> Riwayat Penyakit : </p>
            </div>
          </div>
          <div className="table">
            <h2>Data Rekam Medis</h2>

            <div>
              <button
                className="btn_tambah"
                onClick={() => {
                  navigate("");
                }}
              >
                Tambah Data Rekam Medis
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>No.Rekam Medis</th>
                  <th>Tanggal</th>
                  <th>Diagnosis</th>
                  <th>Tindakan</th>
                  <th>Obat</th>
                  <th>Ket</th>
                  <th>Nama Dokter</th>
                  <th>Tipe Dokter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>11213</th>
                  <th>13/03/22</th>
                  <th>Sakit Perut, Muntah-muntah</th>
                  <th>Swap Tenggorokan</th>
                  <th>Amoxicilin</th>
                  <th>Cek Rutin per-2mg</th>
                  <th>Sophia Nou</th>
                  <th>Umum</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
