import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user.name || !user.email || !user.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("✅ Registration successful! Redirecting to login...");
        setUser({ name: "", email: "", password: "" });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Server connection error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-6 mx-auto shadow-sm">
        <h3 className="text-center mb-4">📝 Create Account</h3>
        
        {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError("")}></button>
        </div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={user.name}
              className="form-control" 
              placeholder="Enter your full name" 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email" 
              value={user.email}
              className="form-control" 
              placeholder="Enter your email" 
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              name="password" 
              value={user.password}
              className="form-control" 
              placeholder="Enter a strong password" 
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "⏳ Registering..." : "✅ Register"}
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <a href="/login" className="text-decoration-none">Login here</a>
        </p>
      </div>
    </div>
  );
}