import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/Authcontext";

const BASE_URL = "http://localhost:5000";

export default function UserDashboard() {
  const [products,setProducts] = useState([]);
  const { cartCount, setCartCount, user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const loadProducts = async () => {
    const res = await fetch(`${BASE_URL}/product/all`);
    const data = await res.json();
    setProducts(data);
  };

  const addToCart = async (id) => {
    if (!user) {
      alert("Please login to add to cart");
      return;
    }

    await fetch(`${BASE_URL}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: id }),
    });

    setCartCount(cartCount + 1);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>All Products</h2>
      {products.map((p) => (
        <div key={p._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <p><b>{p.name}</b></p>
          <p>₹{p.price}</p>
          <p>{p.description}</p>
          <button onClick={() => addToCart(p._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
