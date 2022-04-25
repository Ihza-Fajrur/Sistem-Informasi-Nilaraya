import React from "react";
// import Error404 from "../src/pages/Error404";
import { useNavigate } from "react-router-dom";
import "./waitingListUmum.scss";

// icons sicdebar
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

// icons cari
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function waitingListUmum() {
  // let navigate = useNavigate();
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
            <a href="/kasir/waitingList/umum" className="active">
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
            <a href="/kasir/dataPasien">
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
            <h1>Waiting List Perawatan Umum</h1>
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
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>No. Urut</th>
                  <th>No.Rekam Medis</th>
                  <th>Nama Pasien</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <th>11213</th>
                  <th>Sudirman</th>
                  <th>
                    <button>Tagihan Harga</button>
                  </th>
                </tr>
                <tr>
                  <th>2</th>
                  <th>11213</th>
                  <th>Sudirman</th>
                  <th>
                    <button>Tagihan Harga</button>
                  </th>
                </tr>
                <tr>
                  <th>3</th>
                  <th>11213</th>
                  <th>Sudirman</th>
                  <th>
                    <button>Tagihan Harga</button>
                  </th>
                </tr>
                <tr>
                  <th>4</th>
                  <th>11213</th>
                  <th>Sudirman</th>
                  <th>
                    <button>Tagihan Harga</button>
                  </th>
                </tr>
                <tr>
                  <th>5</th>
                  <th>11213</th>
                  <th>Sudirman</th>
                  <th>
                    <button>Tagihan Harga</button>
                  </th>
                </tr>
                <tr>
                  <th>6</th>
                  <th>11213</th>
                  <th>Sudirman</th>
                  <th>
                    <button>Tagihan Harga</button>
                  </th>
                </tr>
                <tr>
                  <th>7</th>
                  <th>11213</th>
                  <th>Sudirman</th>
                  <th>
                    <button>Tagihan Harga</button>
                  </th>
                </tr>
                <tr>
                  <th>8</th>
                  <th>11213</th>
                  <th>Sudirman</th>
                  <th>
                    <button>Tagihan Harga</button>
                  </th>
                </tr>
                <tr>
                  <th>9</th>
                  <th>11213</th>
                  <th>Sudirman</th>
                  <th>
                    <button>Tagihan Harga</button>
                  </th>
                </tr>
                <tr>
                  <th>10</th>
                  <th>11213</th>
                  <th>Sudirman</th>
                  <th>
                    <button>Tagihan Harga</button>
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
