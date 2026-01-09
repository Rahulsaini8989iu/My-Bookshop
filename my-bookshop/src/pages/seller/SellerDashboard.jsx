import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  Plus,
  ShoppingCart,
  BarChart3,
  User,
  LogOut,
  Menu,
  X,
  Package
} from "lucide-react";
import { logout } from "../../lib/auth";

// Import components
import AddBookForm from "./components/AddBookForm";
import SellerBooks from "./components/SellerBooks";
import SellerOrders from "./components/SellerOrders";
import SellerAnalytics from "./components/SellerAnalytics";
import SellerProfile from "./components/SellerProfile";

export default function SellerDashboard() {
  const [active, setActive] = useState("addBook");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (localUser && localUser.name && localUser.role === "seller") {
      setUser(localUser);
    } else {
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
      case "addBook":
        return <AddBookForm />;
      case "myBooks":
        return <SellerBooks />;
      case "orders":
        return <SellerOrders />;
      case "analytics":
        return <SellerAnalytics />;
      case "profile":
        return <SellerProfile user={user} setUser={setUser} />;
      default:
        return <AddBookForm />;
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
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-purple-600">BOOK</span>
            <span className="font-bold">LIBRARY</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">
              Seller
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            Hi, {user.name || "Seller"}
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
                active === "addBook"
                  ? "bg-green-50 text-green-700 font-bold border-r-2 border-green-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActive("addBook");
                setSidebarOpen(false);
              }}
            >
              <Plus size={18} /> Add New Book
            </button>

            <button
              className={`flex items-center gap-3 px-6 py-2 w-full text-left ${
                active === "myBooks"
                  ? "bg-green-50 text-green-700 font-bold border-r-2 border-green-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActive("myBooks");
                setSidebarOpen(false);
              }}
            >
              <BookOpen size={18} /> My Books
            </button>

            <button
              className={`flex items-center gap-3 px-6 py-2 w-full text-left ${
                active === "orders"
                  ? "bg-green-50 text-green-700 font-bold border-r-2 border-green-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActive("orders");
                setSidebarOpen(false);
              }}
            >
              <ShoppingCart size={18} /> Orders
            </button>


            <button
              className={`flex items-center gap-3 px-6 py-2 w-full text-left ${
                active === "analytics"
                  ? "bg-green-50 text-green-700 font-bold border-r-2 border-green-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActive("analytics");
                setSidebarOpen(false);
              }}
            >
              <BarChart3 size={18} /> Analytics
            </button>

            <button
              className={`flex items-center gap-3 px-6 py-2 w-full text-left ${
                active === "profile"
                  ? "bg-green-50 text-green-700 font-bold border-r-2 border-green-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => {
                setActive("profile");
                setSidebarOpen(false);
              }}
            >
              <User size={18} /> Profile
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
