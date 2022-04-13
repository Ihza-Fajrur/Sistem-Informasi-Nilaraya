import React from "react";
import DataObat from "./DataObat";
// import Error404 from "../src/pages/Error404";
import {useNavigate} from "react-router-dom";



export default function DashboardAdmin() {
  let navigate = useNavigate();
  return (
    <div>
      <p>Ini dashboard DashboardAdmin 
        <button onClick={() => {
          navigate("/admin/dataobat");
        }}>
          change</button></p>
    </div>
  );
}
