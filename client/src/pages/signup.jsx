import React, { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");



  async function signupCheck() {
    if(!email && !username && !password ){
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
    <div>
      <h1>Signup</h1>

      <p>Email<input 
      type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required /></p>

      <p>Username<input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        required /></p>

      <p>Password<input type="password"
        onChange={(e) => setPassword(e.target.value)}
        required /></p>

      <button onClick={signupCheck}>Signup</button>
    </div>
  );
}
