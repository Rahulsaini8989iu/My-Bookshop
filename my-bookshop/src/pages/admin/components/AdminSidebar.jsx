import React from 'react';
import {
  Home,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  UserCheck,
  TrendingUp,
  Database,
  Bell
} from "lucide-react";

const AdminSidebar = ({ active, setActive, sidebarOpen, setSidebarOpen, onLogout }) => {
  const menuItems = [
    { id: "users", label: "User Management", icon: Users, description: "Manage users & roles" },
    { id: "analytics", label: "Analytics", icon: BarChart3, description: "View platform stats" },
    { id: "settings", label: "System Settings", icon: Settings, description: "Configure system" },
  ];

  const quickAccessItems = [
    { id: "reports", label: "Reports", icon: TrendingUp },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "backup", label: "Backup", icon: Database },
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
      <aside className="hidden md:block w-64 bg-white shadow-md flex flex-col min-h-[calc(100vh-64px)] border-r border-gray-200">
        {/* Admin Profile Summary */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Admin Panel</h3>
              <p className="text-sm text-gray-600">System Administrator</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 py-4">
          <div className="px-4 mb-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ADMINISTRATION</h4>
          </div>
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg mx-2 transition-all group ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold border-r-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Access */}
          <div className="px-4 mb-2 mt-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">QUICK ACCESS</h4>
          </div>
          <div className="space-y-1">
            {quickAccessItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg mx-2 transition-all ${
                    isActive
                      ? "bg-purple-50 text-purple-700 font-semibold border-r-2 border-purple-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-purple-600" : "text-gray-500"} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* System Status */}
          <div className="mt-6 mx-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-800">System Online</span>
            </div>
            <p className="text-xs text-green-600">All services running smoothly</p>
          </div>
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-200 mt-auto bg-gray-50">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
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
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              <Shield size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Admin Dashboard</h3>
              <p className="text-xs text-gray-600">System Control</p>
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
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">ADMINISTRATION</h4>
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
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${
                      isActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium">{item.label}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Access */}
            <div className="px-4 mb-2 mt-6">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">QUICK ACCESS</h4>
            </div>
            <div className="space-y-1">
              {quickAccessItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg mx-2 transition-all ${
                      isActive
                        ? "bg-purple-50 text-purple-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-purple-600" : "text-gray-500"} />
                    <span className="text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* System Status */}
            <div className="mt-6 mx-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-800">System Online</span>
              </div>
              <p className="text-xs text-green-600">All services operational</p>
            </div>
          </div>

          {/* Mobile Logout */}
          <div className="p-4 border-t border-gray-200 mt-auto">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;