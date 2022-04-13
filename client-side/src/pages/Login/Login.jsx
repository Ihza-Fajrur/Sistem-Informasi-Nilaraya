import React from "react";
import Background from "../../../src/components/background_login/Background";
import "./login.scss";
import {useNavigate} from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  return (
    <div className="container">    
      <div className="login">   
        <div className="div2">
          <h1>LOGIN</h1>
          <input type="text"  className="input" placeholder="email"/>
          <input type="text"  className="input" placeholder="password" />
          <button onClick={()=> {
          navigate("/admin");
            }}>change</button>
        </div>  
      </div>
    </div>
    
  );
}
