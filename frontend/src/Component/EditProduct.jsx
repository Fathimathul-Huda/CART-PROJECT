import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from "../Api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetchProductById(id).then((data) => {
      setProduct({
        name: data.name || "",
        quantity: data.quantity || "",
        description: data.description || "",
        price: data.price || "",
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: product.name,
      quantity: product.quantity,
      description: product.description,
      price: product.price,
    };

    try {
      const res = await updateProduct(id, updatedData, token);
      alert(res.message);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Edit Product</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Product Name"
          />

          <input
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Quantity"
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Description"
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Price"
          />

          <button type="submit" className="btn btn-success w-100">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
