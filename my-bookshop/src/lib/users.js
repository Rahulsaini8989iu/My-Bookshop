import api from "./api.js";

// Get all users
export async function getAllUsers() {
  const res = await api.get("/api/users/all");
  return res.data;
}

// Create new user
export async function createUser(userData) {
  const res = await api.post("/api/users/create", userData);
  return res.data;
}

// Update user role
export async function updateUserRole(userId, role) {
  const res = await api.patch(`/api/users/role/${userId}`, { role });
  return res.data;
}

// Update user profile
export async function updateUser(userId, userData) {
  const res = await api.put(`/api/users/${userId}`, userData);
  return res.data;
}

// Delete user
export async function deleteUser(userId) {
  const res = await api.delete(`/api/users/${userId}`);
  return res.data;
}

// Get user by ID
export async function getUserById(userId) {
  const res = await api.get(`/api/users/${userId}`);
  return res.data;
}