import React from 'react';
import {
  Home,
  User,
  ShoppingCart,
  Star,
  Mail,
  LogOut,
  Package,
  Heart,
  MessageCircle,
  Settings,
  CreditCard,
  Shield
} from "lucide-react";

const UserSidebar = ({ active, setActive, sidebarOpen, setSidebarOpen, onLogout }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "My Orders", icon: ShoppingCart },
    { id: "tracking", label: "Track Order", icon: Package },
    { id: "liked", label: "Liked Books", icon: Heart },
    { id: "messages", label: "Messages", icon: MessageCircle },
  ];

  const additionalItems = [
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleMenuClick = (menuId) => {
    setActive(menuId);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white shadow-md flex flex-col min-h-[calc(100vh-64px)]">
        {/* User Profile Summary */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              U
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Welcome Back!</h3>
              <p className="text-sm text-gray-600">Manage your account</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 py-4">
          <div className="px-4 mb-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">MAIN</h4>
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mx-2 transition-all ${
                    isActive
                      ? "bg-purple-50 text-purple-700 font-semibold border-r-2 border-purple-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-purple-600" : "text-gray-500"} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Additional Settings */}
          <div className="px-4 mb-2 mt-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">SETTINGS</h4>
          </div>
          <div className="space-y-1">
            {additionalItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mx-2 transition-all ${
                    isActive
                      ? "bg-purple-50 text-purple-700 font-semibold border-r-2 border-purple-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-purple-600" : "text-gray-500"} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-xl transform transition-transform md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              U
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">User Dashboard</h3>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto">
          <div className="py-4">
            <div className="px-4 mb-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">MAIN</h4>
            </div>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mx-2 transition-all ${
                      isActive
                        ? "bg-purple-50 text-purple-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={20} className={isActive ? "text-purple-600" : "text-gray-500"} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Additional Settings */}
            <div className="px-4 mb-2 mt-6">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">SETTINGS</h4>
            </div>
            <div className="space-y-1">
              {additionalItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mx-2 transition-all ${
                      isActive
                        ? "bg-purple-50 text-purple-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={20} className={isActive ? "text-purple-600" : "text-gray-500"} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Logout */}
          <div className="p-4 border-t border-gray-200 mt-auto">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;