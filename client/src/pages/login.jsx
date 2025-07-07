import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

    const navigate = useNavigate();  // <-- ต้องเพิ่มบรรทัดนี้


  async function loginCheck(params) {
    try {
      const response = await fetch('http://localhost:3000/loginCheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({username,password})
      })
      const data = await response.json()
      if(data.isUser && data.isPassword){
                navigate('/home');

      }
    }
    catch (err){
      console.error(`error in loginChekc : ${err}`)
    }
  }


  return (
    <div>
      <p>Username: <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} /></p>
      <p>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></p>
      <button onClick={loginCheck}>Log In</button>
    </div>
  );
}
