import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Camera, Save, Edit3, BookOpen, ShoppingCart, DollarSign, Star } from "lucide-react";

const SellerProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    storeName: "",
    joinDate: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({
    booksListed: 0,
    totalSales: 0,
    totalRevenue: 0,
    customerRating: 0
  });

  useEffect(() => {
    loadProfileData();
    calculateStats();
  }, []);

  const loadProfileData = () => {
    try {
      // Load from actual user data
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const savedProfile = JSON.parse(localStorage.getItem("sellerProfile") || "{}");
      
      const profileData = {
        name: userData.name || savedProfile.name || "",
        email: userData.email || savedProfile.email || "",
        phone: savedProfile.phone || "",
        address: savedProfile.address || "",
        bio: savedProfile.bio || "",
        storeName: savedProfile.storeName || `${userData.name || "Seller"}'s Book Store`,
        joinDate: savedProfile.joinDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
      
      setProfile(profileData);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    try {
      // Calculate real stats from actual data
      const savedBooks = JSON.parse(localStorage.getItem("sellerBooks") || "[]");
      const savedOrders = JSON.parse(localStorage.getItem("sellerOrders") || "[]");
      
      const booksListed = savedBooks.length;
      const totalSales = savedOrders.length;
      const totalRevenue = savedOrders.reduce((sum, order) => sum + (order.price || 0), 0);
      
      setStats({
        booksListed,
        totalSales,
        totalRevenue,
        customerRating: booksListed > 0 ? (totalSales / booksListed * 5).toFixed(1) : 0
      });
    } catch (error) {
      console.error("Error calculating stats:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    
    try {
      // Save to localStorage (replace with API call later)
      localStorage.setItem("sellerProfile", JSON.stringify(profile));
      
      // Update user data if needed
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      if (profile.name && profile.name !== userData.name) {
        userData.name = profile.name;
        localStorage.setItem("user", JSON.stringify(userData));
      }
      
      setMessage("Profile updated successfully! ✅");
      setIsEditing(false);
      
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Error updating profile. Please try again.");
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  const statItems = [
    { 
      label: "Books Listed", 
      value: stats.booksListed.toString(),
      icon: BookOpen,
      color: "text-blue-600"
    },
    { 
      label: "Total Sales", 
      value: stats.totalSales.toString(),
      icon: ShoppingCart,
      color: "text-green-600"
    },
    { 
      label: "Total Revenue", 
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-purple-600"
    },
    { 
      label: "Customer Rating", 
      value: `${stats.customerRating}/5`,
      icon: Star,
      color: "text-yellow-600"
    }
  ];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Seller Profile</h1>
              <p className="text-gray-600 mt-1">Manage your profile information</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Seller Profile</h1>
              <p className="text-gray-600 mt-1">Manage your profile information</p>
            </div>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={saving}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : isEditing ? (
              <>
                <Save size={18} />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 size={18} />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Profile Picture */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto">
                  {profile.name ? profile.name.charAt(0).toUpperCase() : "S"}
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Camera size={16} className="text-gray-600" />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-800 mt-4">{profile.name || "Seller"}</h2>
              <p className="text-gray-600">{profile.storeName}</p>
              <p className="text-sm text-gray-500 mt-1">Seller since {profile.joinDate}</p>
            </div>

            {/* Real Stats */}
            <div className="space-y-4">
              {statItems.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={stat.color} />
                      <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-800">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Profile Information</h3>
            
            <div className="space-y-6">
              {/* Store Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name *
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.storeName}
                    onChange={(e) => handleInputChange("storeName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                    {profile.storeName || "No store name set"}
                  </div>
                )}
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User size={16} />
                    Full Name *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {profile.name || "No name set"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} />
                    Email Address *
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {profile.email || "No email set"}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="+1 (555) 123-4567"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {profile.phone || "No phone number set"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} />
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter your address"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                      {profile.address || "No address set"}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio / Description
                </label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Tell customers about yourself and your store..."
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 whitespace-pre-line">
                    {profile.bio || "No bio description set"}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 mt-8 pt-6 border-t">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex-1 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;