import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Component/Navbar';
import Login from './Component/Login';
import Register from './Component/Register';
import EditProduct from './Component/EditProduct';
import ProductList from './Component/ProductList';
import ProductDetails from './Component/ProductDetails';
import AddProduct from './Component/AddProduct';
import Home from './Component/Routes/Home';
import About from './Component/Routes/About';
import Contact from './Component/Routes/Contact';
import Discover from './Component/Routes/Discover'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  // Render Navbar only when on "/" and user is logged in
  function NavbarContainer({ isLoggedIn }) {
    const location = useLocation();
    if (!isLoggedIn) return null;
    return location.pathname === '/' ? <Navbar isLoggedIn={isLoggedIn} /> : null;
  }

  return (
    <Router>
      <NavbarContainer isLoggedIn={isLoggedIn} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={isLoggedIn ? <ProductList /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={isLoggedIn ? <ProductDetails /> : <Navigate to="/login" />} />
          <Route path="/add" element={isLoggedIn ? <AddProduct /> : <Navigate to="/login" />} />
          <Route path="/edit/:id" element={isLoggedIn ? <EditProduct /> : <Navigate to="/login" />} />
          <Route path='/Home' element={<Home/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Contact' element={<Contact/>}/>
          <Route path='/Discover' element={<Discover/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
