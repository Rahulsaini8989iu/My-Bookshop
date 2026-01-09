import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  User,
  ShoppingCart,
  Star,
  Mail,
  LogOut,
  Menu,
  X,
  Package,
  Heart,
  MessageCircle
} from "lucide-react";
import { logout } from "../../lib/auth";

// Import components
import DashboardHome from "./components/DashboardHome";
import UserProfile from "./components/UserProfile";
import UserOrders from "./components/UserOrders";
import OrderTracking from "./components/OrderTracking";
import LikedBooks from "./components/LikedBooks";
import MessageHistory from "./components/MessageHistory";

export default function UserDashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (localUser && localUser.name) {
      setUser(localUser);
    } else {
      // If no user data, redirect to login
      navigate("/login");
    }
  }, [navigate]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // Render active component
  const renderActiveComponent = () => {
    switch (active) {
      case "dashboard":
        return <DashboardHome user={user} />;
      case "profile":
        return <UserProfile user={user} setUser={setUser} />;
      case "orders":
        return <UserOrders />;
      case "tracking":
        return <OrderTracking />;
      case "liked":
        return <LikedBooks />;
      case "messages":
        return <MessageHistory />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center px-4 py-3 bg-white shadow md:px-8">
        <div className="flex items-center gap-4">
          <button 
            className="block md:hidden" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <Link to='/' className="flex items-center gap-2">
            <span className="font-bold text-purple-600">BOOK</span>
            <span className="font-bold">LIBRARY</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            Hi, {user.name || 'User'}
          </span>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-56px)]">
        {/* Sidebar Responsive */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } fixed z-20 inset-0 w-64 md:static md:block bg-white shadow-md flex flex-col transition-all duration-200 md:min-h-[calc(100vh-64px)]`}
        >
          <div className="flex-1 py-8 space-y-2">
            <button 
              className={`flex items-center gap-3 px-6 py-2 w-full text-left ${
                active === "dashboard" 
                  ? "bg-purple-50 text-purple-700 font-bold border-r-2 border-purple-600" 
                  : "text-gray-700 hover:bg-gray-50"
              }`} 
              onClick={() => { setActive("dashboard"); setSidebarOpen(false); }}
            >
              <Home size={18} /> Dashboard
            </button>
            
            <button 
              className={`flex items-center gap-3 px-6 py-2 w-full text-left ${
                active === "profile" 
                  ? "bg-purple-50 text-purple-700 font-bold border-r-2 border-purple-600" 
                  : "text-gray-700 hover:bg-gray-50"
              }`} 
              onClick={() => { setActive("profile"); setSidebarOpen(false); }}
            >
              <User size={18} /> Profile
            </button>
            
            <button 
              className={`flex items-center gap-3 px-6 py-2 w-full text-left ${
                active === "orders" 
                  ? "bg-purple-50 text-purple-700 font-bold border-r-2 border-purple-600" 
                  : "text-gray-700 hover:bg-gray-50"
              }`} 
              onClick={() => { setActive("orders"); setSidebarOpen(false); }}
            >
              <ShoppingCart size={18} /> My Orders
            </button>
            
            <button 
              className={`flex items-center gap-3 px-6 py-2 w-full text-left ${
                active === "tracking" 
                  ? "bg-purple-50 text-purple-700 font-bold border-r-2 border-purple-600" 
                  : "text-gray-700 hover:bg-gray-50"
              }`} 
              onClick={() => { setActive("tracking"); setSidebarOpen(false); }}
            >
              <Package size={18} /> Track Order
            </button>
            
            <button 
              className={`flex items-center gap-3 px-6 py-2 w-full text-left ${
                active === "liked" 
                  ? "bg-purple-50 text-purple-700 font-bold border-r-2 border-purple-600" 
                  : "text-gray-700 hover:bg-gray-50"
              }`} 
              onClick={() => { setActive("liked"); setSidebarOpen(false); }}
            >
              <Heart size={18} /> Liked Books
            </button>
            
            <button 
              className={`flex items-center gap-3 px-6 py-2 w-full text-left ${
                active === "messages" 
                  ? "bg-purple-50 text-purple-700 font-bold border-r-2 border-purple-600" 
                  : "text-gray-700 hover:bg-gray-50"
              }`} 
              onClick={() => { setActive("messages"); setSidebarOpen(false); }}
            >
              <MessageCircle size={18} /> Messages
            </button>
          </div>
          
          <div className="py-4 border-t flex flex-col">
            <button 
              className="flex items-center gap-3 px-6 py-2 w-full text-red-700 hover:bg-red-50" 
              onClick={handleLogout}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 py-6 ml-0 md:ml-0">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}