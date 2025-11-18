import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from "../Api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [product, setProduct] = useState({
    productname: "",
    quantity: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProductById(id).then(setProduct);
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productname", product.productname);
    formData.append("quantity", product.quantity);
    formData.append("description", product.description);
    formData.append("price", product.price);
    if (image) formData.append("image", image);

    const res = await updateProduct(id, formData, token);
    alert(res.message);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-3">Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="productname"
            value={product.productname}
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
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button type="submit" className="btn btn-success w-100">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
