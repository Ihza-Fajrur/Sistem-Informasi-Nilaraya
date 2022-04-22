import React from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "",
  });
  let navigate = useNavigate();
  return (
    <div className="container">
      <div className="login">
        <div className="div2">
          <h1>LOGIN</h1>
          <form action="">
            <div className="wrap-input">
              <label htmlFor="email" className="label-input">Email</label><br />
              <input type="text" className="input" placeholder="Email"/>
            </div>
            <div className="wrap-input">
              <label htmlFor="password" className="label-input">Password</label><br />
              <input type="text" className="input" placeholder="Password" />
            </div>
            <div className="wrap-input">
              <label htmlFor="option" className="label-input">Masuk Sebagai</label><br />
              <select
                name="role"
                id=""
                value={data.role}
                onChange={(e) => setData({ ...data, role: e.target.value })}
                className="input"
              >
                <option value="0">Pilih Role</option>
                <option value="admin">Admin</option>
                <option value="Dokter">Dokter</option>
                <option value="kasir">Kasir</option>
              </select>
            </div>
          </form>
          <button className="button"
            onClick={() => {
              if (data.role === "admin") {
                navigate("/admin");
              } else if (data.role === "Dokter") {
                navigate("/dokter");
              } else if (data.role === "kasir") {
                navigate("/kasir");
              }
            }}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}
