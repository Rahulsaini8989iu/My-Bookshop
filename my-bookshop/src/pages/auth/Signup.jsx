import React, { useState } from "react";
import { signup } from "../../lib/auth"; // api functions file

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await signup(form);
      setMsg("Account created successfully!");
      setForm({ name: "", email: "", password: "", role: "user" });
      // You can redirect here if needed, e.g., window.location = "/login";
    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center backdrop-blur-sm bg-black/20 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
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
              placeholder="Create password"
              required
            />
          </div>
        // Signup form mein ye add karo
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
              {/* Admin aur superadmin manually database mein set karenge */}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 text-sm"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="text-red-600 text-sm text-center">{msg}</div>
        </form>
        <div className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-amber-600 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
