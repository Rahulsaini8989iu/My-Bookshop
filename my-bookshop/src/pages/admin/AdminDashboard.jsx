// src/pages/admin/AdminDashboard.jsx

import React, { useState } from "react";
import { Users, BarChart3, Settings } from "lucide-react";

// Components
import UserManagement from "./components/UserManagement";
import SellerRequests from "./components/SellerRequests";
import AllSellers from "./components/AllSellers";
import Analytics from "./components/Analytics";
import SystemSettings from "./components/SystemSettings";

const menuItems = [
  { id: "users",          label: "User Management",  icon: Users,    description: "Manage users & roles" },
  { id: "sellerRequests", label: "Seller Requests",  icon: Users,    description: "Approve seller applications" },
  { id: "allSellers",     label: "All Sellers",      icon: Users,    description: "View and manage sellers" },
  { id: "analytics",      label: "Analytics",        icon: BarChart3,description: "View platform stats" },
  { id: "settings",       label: "System Settings",  icon: Settings, description: "Configure system" },
];

const AdminDashboard = () => {
  const [active, setActive] = useState("users");

  const renderActiveComponent = () => {
    switch (active) {
      case "users":
        return <UserManagement />;
      case "sellerRequests":
        return <SellerRequests />;
      case "allSellers":
        return <AllSellers />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <SystemSettings />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="p-4 border-b border-slate-800">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-xs text-slate-400">
            Manage users, sellers & system
          </p>
        </div>

        <nav className="p-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition
                ${
                  isActive
                    ? "bg-slate-800 text-emerald-300"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-800/80">
                  <Icon size={18} />
                </span>
                <span className="flex flex-col">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-[11px] text-slate-400">
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
