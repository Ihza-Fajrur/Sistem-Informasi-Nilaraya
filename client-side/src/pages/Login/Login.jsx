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
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" className="input" placeholder="email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="text" className="input" placeholder="password" />
            </div>
            <div>
              <label htmlFor="option">Masuk Sebagai</label>
              <select
                name="role"
                id=""
                value={data.role}
                onChange={(e) => setData({ ...data, role: e.target.value })}
              >
                <option value="0">Pilih role</option>
                <option value="admin">Admin</option>
                <option value="Dokter">Dokter</option>
                <option value="kasir">Kasir</option>
              </select>
            </div>
          </form>
          <button
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
