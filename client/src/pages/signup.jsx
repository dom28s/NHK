import React, { useState } from "react";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");



  async function signupCheck() {
    if (!email && !username && !password) {
      alert('enter email , username , password')
      return
    }

    const response = await fetch("http://localhost:3000/signupCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();
    console.log("Result:", result);
  }

  return (
    <div className="main-signup">
      <div className="signup-card">
        <h1>Signup</h1>

        <div className="signup-input">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        </div>

        <button onClick={signupCheck}>Signup</button>


      </div>
    </div>
  );
}
