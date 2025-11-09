const API_URL = "http://localhost:3000/api";

// 🟢 REGISTER
export const registerUser = async (user) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

// 🟢 LOGIN
export const loginUser = async (user) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

// 🟢 GET PRODUCTS
export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/product`);
  return res.json();
};

// 🟢 GET SINGLE PRODUCT
export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/product/${id}`);
  return res.json();
};

// 🟢 ADD PRODUCT
export const addProduct = async (formData, token) => {
  const res = await fetch(`${API_URL}/product`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
};

// 🟢 UPDATE PRODUCT
export const updateProduct = async (id, formData, token) => {
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
};

// 🟢 DELETE PRODUCT
export const deleteProduct = async (id, token) => {
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
