import React, { useState } from "react";
import { login } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMsg("");
  
  try {
    const res = await login(form);
    setMsg("Login successful!");
    
    // Save token to localStorage
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    
    // ✅ CORRECTED Role-based redirect
    const role = res.user.role;
    console.log("User role:", role); // Debug ke liye
    
    if (role === "superadmin") {
      navigate("/dashboard/superadmin");
    } else if (role === "admin") {
      navigate("/dashboard/admin");
    } else if (role === "seller") {
      navigate("/dashboard/seller"); // ✅ Seller ko seller dashboard pe bhejo
    } else {
      navigate("/dashboard/user"); // Default user
    }
    
  } catch (error) {
    setMsg(error.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center backdrop-blur-sm bg-black/20 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 text-sm"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="text-red-600 text-sm text-center">{msg}</div>
        </form>
        <div className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-amber-600 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
