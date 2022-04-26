import React, { useState, useEffect } from "react";
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
  const [gigiState, setGigiState] = useState([]);

  useEffect(() => {
    let gigiState = [
      { id: 1, nomorgigi: "11" },
      { id: 2, nomorgigi: "12" },
      { id: 3, nomorgigi: "13" },
      { id: 4, nomorgigi: "14" },
      { id: 5, nomorgigi: "15" },
      { id: 6, nomorgigi: "16" },
      { id: 7, nomorgigi: "17" },
      { id: 8, nomorgigi: "18" },
      { id: 9, nomorgigi: "21" },
      { id: 10, nomorgigi: "22" },
      { id: 11, nomorgigi: "23" },
      { id: 12, nomorgigi: "24" },
      { id: 13, nomorgigi: "25" },
      { id: 14, nomorgigi: "26" },
      { id: 15, nomorgigi: "27" },
      { id: 16, nomorgigi: "28" },
      { id: 17, nomorgigi: "51" },
      { id: 18, nomorgigi: "52" },
      { id: 19, nomorgigi: "53" },
      { id: 20, nomorgigi: "54" },
      { id: 21, nomorgigi: "55" },
      { id: 22, nomorgigi: "61" },
      { id: 23, nomorgigi: "62" },
      { id: 24, nomorgigi: "63" },
      { id: 25, nomorgigi: "64" },
      { id: 26, nomorgigi: "65" },
      { id: 27, nomorgigi: "81" },
      { id: 28, nomorgigi: "82" },
      { id: 29, nomorgigi: "83" },
      { id: 30, nomorgigi: "84" },
      { id: 31, nomorgigi: "85" },
      { id: 32, nomorgigi: "71" },
      { id: 33, nomorgigi: "72" },
      { id: 34, nomorgigi: "73" },
      { id: 35, nomorgigi: "74" },
      { id: 36, nomorgigi: "75" },
      { id: 37, nomorgigi: "41" },
      { id: 38, nomorgigi: "42" },
      { id: 39, nomorgigi: "43" },
      { id: 40, nomorgigi: "44" },
      { id: 41, nomorgigi: "45" },
      { id: 42, nomorgigi: "46" },
      { id: 43, nomorgigi: "47" },
      { id: 44, nomorgigi: "48" },
      { id: 45, nomorgigi: "31" },
      { id: 46, nomorgigi: "32" },
      { id: 47, nomorgigi: "33" },
      { id: 48, nomorgigi: "34" },
      { id: 49, nomorgigi: "35" },
      { id: 50, nomorgigi: "36" },
      { id: 51, nomorgigi: "37" },
      { id: 52, nomorgigi: "38" },
    ];
    setGigiState(
      gigiState.map((gigi) => {
        return {
          select: false,
          id: gigi.id,
          nomorgigi: gigi.nomorgigi,
        };
      })
    );
  }, []);

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
            <h1>Form Penambahan Rekam Medis Gigi</h1>
          </div>
        </div>

        <div className="wrap-table">
          <img src={process.env.PUBLIC_URL + "/image 1 (2).png"} alt="mypic" />

          <table className="table-bordered">
            <thead>
              <thead>
                <tr>
                  <th className="checkbox" scope="col">
                    <label>Check All</label>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        let checked = e.target.checked;
                        setGigiState(
                          gigiState.map((gigi) => {
                            gigi.select = checked;
                            return gigi;
                          })
                        );
                      }}
                    ></input>
                  </th>
                  <th scope="col">Nomor gigi</th>
                </tr>
              </thead>
            </thead>
            <tbody>
              {gigiState.map((gigi, i) => (
                <tr key={gigi.id}>
                  <tsd scope="row">
                    <input
                      onChange={(event) => {
                        let checked = event.target.checked;
                        setGigiState(
                          gigiState.map((data) => {
                            if (gigi.id === data.id) {
                              data.select = checked;
                            }
                            return data;
                          })
                        );
                      }}
                      type="checkbox"
                      checked={gigi.select}
                    ></input>
                  </tsd>
                  <td>{gigi.nomorgigi}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
