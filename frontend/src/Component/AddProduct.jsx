import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

export default function AddProduct() {
  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const add = async () => {
    await fetch(`${BASE_URL}/product/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price, description }),
    });

    navigate("/admin");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Product</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={e=>setName(e.target.value)}
      /><br />
      <input
        placeholder="Price"
        value={price}
        onChange={e=>setPrice(e.target.value)}
      /><br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e=>setDescription(e.target.value)}
      /><br />
      <button onClick={add}>Add</button>
    </div>
  );
}
