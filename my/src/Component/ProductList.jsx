import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../Api";
import './style.css'

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("accessToken");

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/product");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const res = await deleteProduct(id, token);
    alert(res.message);
    fetchData();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>🛒 Product List</h2>
        <Link to="/add" className="btn btn-primary">
          ➕ Add Product
        </Link>
      </div>

      <div className="row">
        {products.map((p) => (
          <div key={p._id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img
                src={
                  p.image
                    ? `http://localhost:p000${p.image}`
                    : "https://via.placeholder.com/300x200"
                }
                className="card-img-top"
                alt={p.productname}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{p.name}</h5>
                <p className="text-center">{p.description}</p>
                <p className="fw-bold text-center">₹{p.price}</p>

                <div className="d-flex justify-content-between">
                  <Link
                    to={`/edit/${p._id}`}
                    className="btn btn-warning btn-sm w-50 me-2"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm w-50"
                    onClick={() => handleDelete(p._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

