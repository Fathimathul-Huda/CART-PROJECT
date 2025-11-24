import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  const loadProducts = async () => {
    const res = await fetch(`${BASE_URL}/product/all`);
    const data = await res.json();
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    await fetch(`${BASE_URL}/product/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <Link to="/add">Add Product</Link>

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - {p.price}{" "}
            <Link to={`/edit/${p._id}`}>✏ Edit</Link>{" "}
            <button onClick={() => deleteProduct(p._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
