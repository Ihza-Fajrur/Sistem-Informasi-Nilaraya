import React from "react";

//import Login
import Login from "./pages/Login/Login";

// import Admin
import Admin from "./pages/Admin/Beranda/DashboardAdmin";
import DataObat from "./pages/Admin/DataObat";
import DataAkun from "./pages/Admin/Akun/DataAkun";
import TambahAkun from "./pages/Admin/Akun/TambahAkun/TambahAkun";
import UbahAkun from "./pages/Admin/Akun/UbahAkun/UbahAkun";
import DataRekamMedis from "./pages/Admin/RekamMedis/DataRekamMedis";

// import Dokter
import Dokter from "./pages/Dokter/Beranda";

// import Kasir
import Kasir from "./pages/Kasir/Beranda/Beranda";
import WaitingListUmum from "./pages/Kasir/WaitingList/WaitingListUmum/WaitingListUmum";
import WaitingListGigi from "./pages/Kasir/WaitingList/WaitingListGigi/WaitingListGigi";


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
            <Route path="/admin" element={<Admin />}/>
            <Route path="/admin/dataobat" element={<DataObat/>}/>
            <Route path="/admin/dataakun" element={<DataAkun/>}/>
            <Route path="/admin/dataakun/tambah" element={<TambahAkun/>}/>
            <Route path="/admin/dataakun/ubah" element={<UbahAkun/>}/>
            <Route path="/admin/dataRekamMedis" element={<DataRekamMedis/>}/>
        
        
            {/* Route Dokter */}
            <Route path="/dokter" element={<Dokter />} />

            {/* Route Kasir */}
            <Route path="/kasir" element={<Kasir />} />
            <Route path="/kasir/waitinglist/umum" element={<WaitingListUmum/>} />
            <Route path="/kasir/waitinglist/gigi" element={<WaitingListGigi/>} />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
