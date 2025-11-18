import React, { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("quantity", product.quantity);
    formData.append("description", product.description);
    formData.append("price", product.price);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("❌ Non-JSON response:", text);
        alert("Server returned invalid response");
        return;
      }

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
