import React from "react";
// import Error404 from "../src/pages/Error404";
import {useNavigate} from "react-router-dom";
import "./beranda.scss";

// icons sicdebar
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// icons cari
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function Kasir() {
  let navigate = useNavigate();
  return (
    <div className="body">
      <div className="sidebar">
        <header className="header">KliniX</header>
        <ul className="ul">
          <li><a href="/kasir" className="active"><HomeOutlinedIcon className="iconSidebar"/>Beranda</a></li>
          <li><a href="/kasir/waitinglist/umum"><SummarizeOutlinedIcon className="iconSidebar"/>Waiting List Umum</a></li>
          <li><a href="/kasir/waitinglist/gigi"><SummarizeOutlinedIcon className="iconSidebar"/>Waiting List Gigi</a></li>
          <li><a href=""><AccessibleForwardOutlinedIcon className="iconSidebar"/>Pasien</a></li>
          <li><a href="/"><LogoutOutlinedIcon className="iconSidebar"/>Logout</a></li>
        </ul>
      </div>

      <div className="head">
        <div className="wrap-bagianAtas">
          <div className="cari">
            <input type="text" className="inputcari" placeholder="Masukkan Kata Kunci"/>
          </div>
        </div>
        

        <div className="wrap-card">
          <div className="card">
            <div className="card-body">
              <button className="card-btn"
              onClick={() => {
                navigate("/kasir/waitinglist/umum");
              }}>
                <SummarizeOutlinedIcon className="icon"/>
                <h2> Waiting List Umum</h2>
              </button>
            </div>          
            
            <div className="card-body">
              <button className="card-btn"
              onClick={() => {
                navigate("/kasir/waitinglist/gigi");
              }}>
                <SummarizeOutlinedIcon className="icon"/>
                <h2> Waiting List Gigi</h2>
              </button>
            </div>          
            
            <div className="card-body">
              <button className="card-btn"
              onClick={() => {
                navigate("");
              }}>
                <AccessibleForwardOutlinedIcon className="icon"/>
                <h2> Data pasien</h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

