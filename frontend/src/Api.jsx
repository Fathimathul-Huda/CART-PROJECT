const API_URL = "http://localhost:3000"; // <-- changed to match backend that exposes /auth

async function parseResponse(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch (e) {
    // attach raw text for easier debugging when server returns HTML/error pages
    throw new Error(`Invalid JSON response (${res.status}): ${text}`);
  }
}

// 🟢 REGISTER
export const registerUser = async (user) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw await parseResponse(res);
  return parseResponse(res);
};

// 🟢 LOGIN
export const loginUser = async (user) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw await parseResponse(res);
  return parseResponse(res);
};

// 🟢 GET PRODUCTS
export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/product`);
  if (!res.ok) throw new Error(`Fetch products failed: ${res.status}`);
  return res.json();
};

// 🟢 GET SINGLE PRODUCT
export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/product/${id}`);
  if (!res.ok) throw new Error(`Fetch product failed: ${res.status}`);
  return res.json();
};

// 🟢 ADD PRODUCT
export const addProduct = async (formData, token) => {
  const res = await fetch(`${API_URL}/product`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error(`Add product failed: ${res.status}`);
  return res.json();
};

// 🟢 UPDATE PRODUCT
export const updateProduct = async (id, formData, token) => {
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error(`Update product failed: ${res.status}`);
  return res.json();
};

// 🟢 DELETE PRODUCT
export const deleteProduct = async (id, token) => {
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Delete product failed: ${res.status}`);
  return res.json();
};
