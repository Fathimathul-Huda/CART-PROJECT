import React, { useState } from "react";
import { loginUser } from "../Api";
import { Link, useNavigate } from "react-router-dom";
import './style.css'

export default function Login({ setIsLoggedIn }) {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(user);
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      alert("Login successful!");
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert(data.message || "Login failed!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-6 mx-auto shadow-sm">
        <h3 className="text-center mb-3">Login to Grocery Mart</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-success w-100 mb-2">
            Login
          </button>
        </form>
        <p className="text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-decoration-none">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
