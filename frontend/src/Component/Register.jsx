import { useState } from "react";

const BASE_URL = "http://localhost:5000";

export default function Register() {
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [msg,setMsg] = useState("");

  const register = async () => {
    setMsg("");
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error("Register failed");

      setMsg("Registered successfully. You can login now.");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      {msg && <p>{msg}</p>}

      <input
        placeholder="Name"
        value={name}
        onChange={e=>setName(e.target.value)}
      /><br />
      <input
        placeholder="Email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
      /><br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
      /><br />
      <button onClick={register}>Sign Up</button>
    </div>
  );
}
