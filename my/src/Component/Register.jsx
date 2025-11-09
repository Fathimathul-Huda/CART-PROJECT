import React, { useState } from "react";
import { registerUser } from "../Api";
import { useNavigate } from "react-router-dom";
import './style.css'

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await registerUser(user);
    alert(data.message);
    if (data.message === "User registered") {
      navigate("/login");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-6 mx-auto shadow-sm">
        <h3 className="text-center mb-3">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" className="form-control mb-3" placeholder="Full Name" onChange={handleChange} />
          <input type="email" name="email" className="form-control mb-3" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" className="form-control mb-3" placeholder="Password" onChange={handleChange} />
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
