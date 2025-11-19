import React, { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    description: "",
    price: "",
    image: ""
  });
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };

    reader.readAsDataURL(file); // convert to base64
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      name: product.name,
      quantity: product.quantity,
      description: product.description,
      price: product.price,
      image: image, // base64 string
    };

    try {
      const res = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product");

      alert("✅ " + data.message);
    } catch (err) {
      console.error("❌ Add product error:", err);
      alert("Error: " + err.message);
    }
  };


  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Add Product</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="quantity"
            className="form-control mb-3"
            placeholder="Quantity"
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            className="form-control mb-3"
            placeholder="Description"
            onChange={handleChange}
          ></textarea>
          <input
            type="number"
            name="price"
            className="form-control mb-3"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            className="form-control mb-3"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
