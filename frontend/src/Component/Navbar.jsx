import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, cartCount } = useContext(AuthContext);

  const navStyle = {
    padding: "10px 20px",
    background: "#222",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const linkStyle = { color: "#fff", marginRight: 15, textDecoration: "none" };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        {user && (
          <Link to="/cart" style={linkStyle}>
            🛒 Cart ({cartCount})
          </Link>
        )}
      </div>

      <div>
        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin" style={linkStyle}>
                Admin Panel
              </Link>
            )}
            <button onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
