import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [name,setName] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");

  const loadProduct = async () => {
    const res = await fetch(`${BASE_URL}/product/${id}`);
    const data = await res.json();
    setName(data.name);
    setPrice(data.price);
    setDescription(data.description || "");
  };

  const save = async () => {
    await fetch(`${BASE_URL}/product/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, price, description }),
    });
    navigate("/admin");
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Product</h2>
      <input
        value={name}
        onChange={e=>setName(e.target.value)}
      /><br />
      <input
        value={price}
        onChange={e=>setPrice(e.target.value)}
      /><br />
      <textarea
        value={description}
        onChange={e=>setDescription(e.target.value)}
      /><br />
      <button onClick={save}>Save</button>
    </div>
  );
}
