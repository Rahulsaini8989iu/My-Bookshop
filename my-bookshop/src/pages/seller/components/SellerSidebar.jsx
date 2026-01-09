import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  Plus, 
  ShoppingCart, 
  BarChart3, 
  User, 
  LogOut 
} from "lucide-react";

const SellerSidebar = ({ active, setActive, sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { 
      key: "addBook", 
      label: "Add New Book", 
      icon: Plus,
      path: "/dashboard/seller/add-book" 
    },
    { 
      key: "myBooks", 
      label: "My Books", 
      icon: BookOpen,
      path: "/dashboard/seller/books" 
    },
    { 
      key: "orders", 
      label: "Orders", 
      icon: ShoppingCart,
      path: "/dashboard/seller/orders" 
    },
    { 
      key: "analytics", 
      label: "Analytics", 
      icon: BarChart3,
      path: "/dashboard/seller/analytics" 
    },
    { 
      key: "profile", 
      label: "Profile", 
      icon: User,
      path: "/dashboard/seller/profile" 
    },
  ];

  const handleMenuClick = (key) => {
    setActive(key);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "block" : "hidden"
      } fixed z-20 inset-0 w-64 md:static md:block bg-white shadow-lg flex flex-col transition-all duration-200 md:min-h-[calc(100vh-64px)]`}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-purple-600 text-xl">BOOK</span>
          <span className="font-bold text-xl">STORE</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">Seller</span>
        </Link>
      </div>
      
      {/* Navigation Menu */}
      <div className="flex-1 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          
          return (
            <button
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
              className={`flex items-center gap-3 px-6 py-3 w-full text-left transition-all duration-200 ${
                isActive 
                  ? "bg-green-50 text-green-700 font-semibold border-r-4 border-green-600" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={20} className={isActive ? "text-green-600" : "text-gray-500"} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Footer Section */}
      <div className="p-6 border-t">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="text-sm font-medium text-gray-800">Need Help?</div>
          <div className="text-xs text-gray-600 mt-1">Contact support for assistance</div>
        </div>
        
        <Link 
          to="/"
          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Home size={18} />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>
    </aside>
  );
};

export default SellerSidebar;