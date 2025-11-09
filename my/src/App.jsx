import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './Component/Navbar'
import Login from './Component/Login'
import Register from './Components/Register'

import EditProduct from './Components/EditProduct'
import ProductList from './Components/Productlist'
import ProductDetails from './Components/Productdetails'
import AddProduct from './Components/Addproduct'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <Router>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <ProductList /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/product/:id"
            element={isLoggedIn ? <ProductDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/add"
            element={isLoggedIn ? <AddProduct /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={isLoggedIn ? <EditProduct /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
