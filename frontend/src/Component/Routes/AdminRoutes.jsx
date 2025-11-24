import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />; // not logged in
  }

  if (role !== "admin") {
    return <div style={{textAlign:"center", marginTop:"50px"}}>
      ❌ Access Denied — Only Admin Allowed
    </div>
  }

  return children;
}
