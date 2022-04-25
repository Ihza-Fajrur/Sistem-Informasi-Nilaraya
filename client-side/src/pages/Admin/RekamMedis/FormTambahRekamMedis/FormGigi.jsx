import React from "react";
import { useNavigate } from "react-router-dom";
import "./form.scss";

// icons sicdebar
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function FormUmum() {
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
        <div className="wrap-bagianAtas">
          <div className="bagianAtas">
            <h1>Form Penambahan Rekam Medis Umum</h1>
          </div>
        </div>

        <div className="wrap-table">
          <form action="">
            <div className="flex-input">
              <div className="wrap-input">
                <label htmlFor="namapasien" className="label-input">
                  Nama Pasien
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masukkan Nama Pasien"
                />
              </div>
              <div className="wrap-input">
                <label htmlFor="norm" className="label-input">
                  No. Rekam Medis
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masukkan No. Rekam Medis"
                />
              </div>
              <div className="wrap-input">
                <label htmlFor="Tanggal" className="label-input">
                  Tanggal
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masukkan Tanggal "
                />
              </div>
            </div>
            <div className="wrap-input">
              <label htmlFor="Diagnosis" className="label-input">
                Diagnosis
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Masukkan Diagnosis"
              />
            </div>
            <div className="wrap-input">
              <label htmlFor="Tindakan" className="label-input">
                Tindakan
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Masukkan Tindakan"
              />
            </div>
            <div className="wrap-input">
              <label htmlFor="riwayatpenyakit" className="label-input">
                Obat
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Masukkan Alamat Riwayat Penyakit / Alergi"
              />
            </div>
            <div className="wrap-input">
              <label htmlFor="riwayatpenyakit" className="label-input">
                Keterangan
              </label>
              <textarea
                type="text"
                className="input-field"
                placeholder="Masukkan Keterangan"
              />
            </div>
          </form>

          <div className="tambah">
            <button
              className="btn-tambah"
              onClick={() => {
                navigate("/admin/dataPasien");
              }}
            >
              Tambah Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
