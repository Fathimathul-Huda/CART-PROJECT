import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = "http://localhost:5000";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token");
  const { setCartCount } = useContext(AuthContext);

  const loadCart = async () => {
    const res = await fetch(`${BASE_URL}/cart/my-cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCart(data);
    setCartCount(data?.products?.length || 0);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      {cart?.products?.length ? (
        cart.products.map((item) => (
          <p key={item.productId._id}>{item.productId.name}</p>
        ))
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
}
