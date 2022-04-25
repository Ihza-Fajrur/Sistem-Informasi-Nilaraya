import React from "react";

//import Login
import Login from "./pages/Login/Login";

// import Admin
import Admin from "./pages/Admin/Beranda/Beranda";
import DataAkun from "./pages/Admin/Akun/DataAkun";
import TambahAkun from "./pages/Admin/Akun/TambahAkun/TambahAkun";
import UbahAkun from "./pages/Admin/Akun/UbahAkun/UbahAkun";
import DataRekamMedis from "./pages/Admin/RekamMedis/DataRekamMedis";
import DataPasien from "./pages/Admin/Pasien/DataPasien";
import TambahPasien from "./pages/Admin/Pasien/TambahPasien/TambahPasien";
import DataTindakan from "./pages/Admin/Tindakan/DataTindakan";
import TambahTindakan from "./pages/Admin/Tindakan/TambahTindakan/TambahTindakan";
import UbahTindakan from "./pages/Admin/Tindakan/UbahTindakan/UbahTindakan";
import DataObat from "./pages/Admin/Obat/DataObat";
import TambahObat from "./pages/Admin/Obat/TambahObat/TambahObat";
import UbahObat from "./pages/Admin/Obat/UbahObat/UbahObat";
import HistoryRekamMedis from "./pages/Admin/RekamMedis/HistoryRekamMedis/HistoryRekamMedis";
import FormGigi from "./pages/Admin/RekamMedis/FormTambahRekamMedis/FormGigi";
import FormUmum from "./pages/Admin/RekamMedis/FormTambahRekamMedis/FormUmum";
// import Dokter
import Dokter from "./pages/Dokter/Beranda";

// import Kasir
import Kasir from "./pages/Kasir/Beranda/Beranda";
import WaitingListUmum from "./pages/Kasir/WaitingList/WaitingListUmum/WaitingListUmum";
import WaitingListGigi from "./pages/Kasir/WaitingList/WaitingListGigi/WaitingListGigi";
import DataPasienKasir from "./pages/Kasir/Pasien/DataPasien";
import TambahPasienKasir from "./pages/Kasir/Pasien/TambahPasien/TambahPasien";

import Error404 from "../src/pages/Error404";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import "./app.scss";

function App() {
  return (
    <div className="app">
      <div className="sections">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Route Admin */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dataAkun" element={<DataAkun />} />
            <Route path="/admin/dataAkun/tambah" element={<TambahAkun />} />
            <Route path="/admin/dataAkun/ubah" element={<UbahAkun />} />
            <Route path="/admin/dataRekamMedis" element={<DataRekamMedis />} />
            <Route
              path="/admin/dataRekamMedis/historyRekamMedis"
              element={<HistoryRekamMedis />}
            />
            <Route
              path="/admin/dataRekamMedis/historyRekamMedis/formGigi"
              element={<FormGigi />}
            />
            <Route
              path="/admin/dataRekamMedis/historyRekamMedis/formUmum/"
              element={<FormUmum />}
            />
            <Route path="/admin/dataPasien" element={<DataPasien />} />
            <Route path="/admin/dataPasien/tambah" element={<TambahPasien />} />
            <Route path="/admin/dataTindakan" element={<DataTindakan />} />
            <Route
              path="/admin/dataTindakan/tambah"
              element={<TambahTindakan />}
            />
            <Route path="/admin/dataTindakan/ubah" element={<UbahTindakan />} />
            <Route path="/admin/dataObat" element={<DataObat />} />
            <Route path="/admin/dataObat/tambah" element={<TambahObat />} />
            <Route path="/admin/dataObat/ubah" element={<UbahObat />} />

            {/* Route Dokter */}
            <Route path="/dokter" element={<Dokter />} />

            {/* Route Kasir */}
            <Route path="/kasir" element={<Kasir />} />
            <Route
              path="/kasir/waitingList/umum"
              element={<WaitingListUmum />}
            />
            <Route
              path="/kasir/waitingList/gigi"
              element={<WaitingListGigi />}
            />
            <Route path="/kasir/dataPasien" element={<DataPasienKasir />} />
            <Route
              path="/kasir/dataPasien/tambah"
              element={<TambahPasienKasir />}
            />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
