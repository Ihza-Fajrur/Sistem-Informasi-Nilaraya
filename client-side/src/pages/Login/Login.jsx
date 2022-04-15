import React from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
              <select name="" id="">
                <option value="admin">Admin</option>
                <option value="Dokter">Dokter</option>
                <option value="kasir">Kasir</option>
              </select>
            </div>          
          </form>
          
          <button
            onClick={() => {
              navigate("/kasir");
            }}
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}
