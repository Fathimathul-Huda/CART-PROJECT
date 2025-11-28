import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedCartCount = localStorage.getItem("cartCount");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Invalid user JSON:", storedUser);
        localStorage.removeItem("user");
      }
    }

    if (storedCartCount) {
      setCartCount(Number(storedCartCount));
    }
  }, []);

  const loginUser = (userData, token) => {
    setUser(userData);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Failed to store user:", err);
    }
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setCartCount(0);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cartCount");
  };

  const updateCartCount = (count) => {
    setCartCount(count);
    localStorage.setItem("cartCount", count);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout, cartCount, setCartCount: updateCartCount }}>
      {children}
    </AuthContext.Provider>
  );
}
