import React, { useState }  from "react";
// import Error404 from "../src/pages/Error404";
import {useNavigate} from "react-router-dom";
import "./beranda.scss";
import Modal from "./Components/Modal";

// icons sicdebar
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';

export default function Kasir() {
  let navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <div className="body">
      <div className="sidebar">
        <header className="header">KliniX</header>
        <ul className="ul">
          <li><a href="/kasir" className="active"><HomeOutlinedIcon className="iconSidebar"/>Beranda</a></li>
          <li><a href=""><NoteAddOutlinedIcon className="iconSidebar"/>Rekam Medis</a></li>
          <li><a href="/"><LogoutOutlinedIcon className="iconSidebar"/>Logout</a></li>
        </ul>
      </div>

      <div className="head">
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
        <div className="wrap-bagianAtas">
        </div>
      </div>
    </div>
  );
}

