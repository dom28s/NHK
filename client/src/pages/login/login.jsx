import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'


export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();


  async function loginCheck() {
    try {
      const response = await fetch('http://localhost:3000/loginCheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (data.isUser && data.isPassword) {
        localStorage.setItem('token', data.token);
        navigate('/news');
     
      }
    }
    catch (err) {
      console.error(`error in loginChekc : ${err}`)
    }
  }


  return (
    <div>
      <div className="main-login">
        <div className="login-card">
          <h1>LOGIN</h1>
          <div className="login-input">

            <input type="username" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
            <button onClick={loginCheck}>Log In</button>
            <button onClick={() => navigate('/signup')}>Go to Signup</button>

        </div>
        <div className="line"></div>
      </div>
    </div>
  );
}
