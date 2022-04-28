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
      <div className="modalContainer3">
        <div className="title">
          <h1>Perawatan</h1>
        </div>
        <div className="body">
          <p>Pilih Tipe Dokter</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              navigate("");
            }}
          >
            Umum
          </button>
          <button
            onClick={() => {
              navigate("");
            }}
          >
            Gigi
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
