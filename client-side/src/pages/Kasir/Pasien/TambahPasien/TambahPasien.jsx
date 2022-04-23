import React from "react";
// import Error404 from "../src/pages/Error404";
import { useNavigate } from "react-router-dom";
import "./tambahPasien.scss";

// icons sidebar
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function TambahPasienKasir() {
  let navigate = useNavigate();
  return (
    <div className="body">
      <div className="sidebar">
        <header className="header">KliniX</header>
        <ul className="ul">
          <li>
            <a href="/kasir">
              <HomeOutlinedIcon className="iconSidebar" />
              Beranda
            </a>
          </li>
          <li>
            <a href="/kasir/waitingList/umum">
              <SummarizeOutlinedIcon className="iconSidebar" />
              Waiting List Umum
            </a>
          </li>
          <li>
            <a href="/kasir/waitingList/gigi">
              <SummarizeOutlinedIcon className="iconSidebar" />
              Waiting List Gigi
            </a>
          </li>
          <li>
            <a href="/kasir/dataPasien" className="active">
              <AccessibleForwardOutlinedIcon className="iconSidebar" />
              Pasien
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
            <h1>Form Tambah Data Pasien</h1>
          </div>
        </div>

        <div className="wrap-table">
          <form action="">
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
            <div className="flex-input">
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
                <label htmlFor="nobpjs" className="label-input">
                  No. BPJS
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masukkan No. BPJS"
                />
              </div>
            </div>
            <div className="flex-input">
              <div className="wrap-input">
                <label htmlFor="kelamin" className="label-input">
                  Kelamin
                </label>
                <select
                  name="jeniskelamin"
                  id="jeniskelamin"
                  className="input-field"
                >
                  <option value="" disabled selected>
                    Pilih Jenis Kelamin
                  </option>
                  <option value="laki-laki">Laki-laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
              <div className="wrap-input">
                <label htmlFor="ttl" className="label-input">
                  Tempat Tanggal Lahir
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masukkan Tempat Tanggal Lahir"
                />
              </div>
            </div>
            <div className="flex-input">
              <div className="wrap-input">
                <label htmlFor="alamat" className="label-input">
                  Alamat
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masukkan Alamat"
                />
              </div>
              <div className="wrap-input">
                <label htmlFor="nohp" className="label-input">
                  No. HP
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masukkan Nomor Handphone"
                />
              </div>
            </div>
            <div className="wrap-input">
              <label htmlFor="riwayatpenyakit" className="label-input">
                Riwayat Penyakit / Alergi
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Masukkan Alamat Riwayat Penyakit / Alergi"
              />
            </div>
          </form>

          <div className="tambah">
            <button
              className="btn-tambah"
              onClick={() => {
                navigate("/kasir/dataPasien");
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
