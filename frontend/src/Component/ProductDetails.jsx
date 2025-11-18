import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../Api";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container">
      <div className="card shadow p-4 mt-4">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={product.image || "https://via.placeholder.com/400x300"}
              alt={product.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <h4 className="text-success">₹{product.price}</h4>
            <button className="btn btn-success mt-3">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
