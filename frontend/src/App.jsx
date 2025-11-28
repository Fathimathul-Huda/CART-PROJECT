import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/Authcontext";
import Navbar from "./Component/Navbar";
import ProtectedRoute from "./Component/ProtectedRoutes";
import Login from "./Component/Login";
import Register from "./Component/Register";
import AdminDashboard from "./Component/AdminDashboard";
import AddProduct from "./Component/AddProduct";
import EditProduct from "./Component/EditProduct";
import UserDashboard from "./Component/Routes/UserDashboard";
import Cart from "./Component/Routes/Cart";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* User side */}
          <Route path="/" element={<UserDashboard />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute role="admin">
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute role="admin">
                <EditProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
