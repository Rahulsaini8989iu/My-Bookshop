import api from "./api.js";

export async function signup({ name, email, password, role }) {
  const res = await api.post("/api/auth/signup", { name, email, password, role });
  const data = res.data;
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
}

export async function login({ email, password }) {
  const res = await api.post("/api/auth/login", { email, password });
  const data = res.data;
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
}

// Profile update function
export async function updateProfile(profileData) {
  const res = await api.put("/api/auth/profile", profileData);
  const data = res.data;
  
  // Update localStorage with new user data
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}