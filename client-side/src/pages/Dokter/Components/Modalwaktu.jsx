import React from "react";
import "./Modal.scss";
import { useNavigate } from "react-router-dom";

function Modal({ setOpenModal }) {
  let navigate = useNavigate();
  return (
    <div
      className="modalBackground"
      onClick={() => {
        setOpenModal(false);
      }}
    >
      <div className="modalContainer">
        <div className="title">
          <h1>Pasien Baru Masuk</h1>
        </div>
        <div className="body">
          <p className="isi">Nomor Urut : 01</p>
        </div>
        <div className="body">
          <p className="isi">Nama Pasien : Sudirman</p>
        </div>
        <div className="body">
          <p className="isi">Waktu : 14-03-2022 12:03:12</p>
        </div>
        <div className="footer">
          <button
            className="RKM"
            onClick={() => {
              navigate("");
            }}
          >
            Lihat Rekam Medis
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
