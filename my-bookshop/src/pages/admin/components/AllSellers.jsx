import React, { useState, useEffect } from 'react';
import { Users, Star, TrendingUp, Package, DollarSign, Mail, Phone, MapPin, Search, Filter, Download, Eye, UserX } from 'lucide-react';

const AllSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSeller, setSelectedSeller] = useState(null);

  // Mock sellers data
  const mockSellers = [
    {
      id: 'SELLER-001',
      name: 'Rahul Sharma',
      email: 'rahul@example.com',
      phone: '+91 9876543210',
      businessName: 'Sharma Book Store',
      businessType: 'Physical Store',
      address: '123 Main Street, Mumbai, Maharashtra 400001',
      joinDate: '2024-01-15',
      status: 'active',
      rating: 4.8,
      totalReviews: 45,
      totalBooks: 56,
      totalSales: 89,
      totalRevenue: 245600,
      performance: 'excellent',
      lastActive: '2 hours ago'
    },
    {
      id: 'SELLER-002',
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      businessName: 'Patel Book Corner',
      businessType: 'Online Store',
      address: '456 Park Avenue, Delhi 110001',
      joinDate: '2024-01-10',
      status: 'active',
      rating: 4.5,
      totalReviews: 23,
      totalBooks: 34,
      totalSales: 67,
      totalRevenue: 178900,
      performance: 'good',
      lastActive: '1 day ago'
    },
    {
      id: 'SELLER-003',
      name: 'Amit Kumar',
      email: 'amit@example.com',
      phone: '+91 9876543212',
      businessName: 'Kumar Books',
      businessType: 'Both Physical & Online',
      address: '789 MG Road, Bangalore 560001',
      joinDate: '2024-01-05',
      status: 'active',
      rating: 4.9,
      totalReviews: 78,
      totalBooks: 89,
      totalSales: 156,
      totalRevenue: 456800,
      performance: 'excellent',
      lastActive: '5 hours ago'
    },
    {
      id: 'SELLER-004',
      name: 'Neha Verma',
      email: 'neha@example.com',
      phone: '+91 9876543213',
      businessName: 'Verma Book House',
      businessType: 'Physical Store',
      address: '321 Cross Road, Chennai 600001',
      joinDate: '2024-01-02',
      status: 'inactive',
      rating: 4.2,
      totalReviews: 12,
      totalBooks: 15,
      totalSales: 23,
      totalRevenue: 67800,
      performance: 'average',
      lastActive: '2 weeks ago'
    },
    {
      id: 'SELLER-005',
      name: 'Rajesh Singh',
      email: 'rajesh@example.com',
      phone: '+91 9876543214',
      businessName: 'Singh Book Palace',
      businessType: 'Online Store',
      address: '654 Temple Street, Kolkata 700001',
      joinDate: '2023-12-28',
      status: 'suspended',
      rating: 3.8,
      totalReviews: 8,
      totalBooks: 22,
      totalSales: 18,
      totalRevenue: 45600,
      performance: 'poor',
      lastActive: '1 month ago',
      suspensionReason: 'Multiple customer complaints'
    }
  ];

  useEffect(() => {
    // Load sellers (in real app, fetch from API)
    setLoading(true);
    setTimeout(() => {
      setSellers(mockSellers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSuspendSeller = (sellerId) => {
    if (window.confirm('Are you sure you want to suspend this seller?')) {
      const reason = prompt('Please enter suspension reason:');
      if (reason) {
        setSellers(prev => prev.map(seller => 
          seller.id === sellerId 
            ? { 
                ...seller, 
                status: 'suspended',
                suspensionReason: reason
              }
            : seller
        ));
      }
    }
  };

  const handleActivateSeller = (sellerId) => {
    setSellers(prev => prev.map(seller => 
      seller.id === sellerId 
        ? { 
            ...seller, 
            status: 'active',
            suspensionReason: null
          }
        : seller
    ));
  };

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         seller.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || seller.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: sellers.length,
    active: sellers.filter(s => s.status === 'active').length,
    inactive: sellers.filter(s => s.status === 'inactive').length,
    suspended: sellers.filter(s => s.status === 'suspended').length,
    totalRevenue: sellers.reduce((sum, seller) => sum + seller.totalRevenue, 0),
    totalBooks: sellers.reduce((sum, seller) => sum + seller.totalBooks, 0)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">All Sellers</h1>
              <p className="text-gray-600 mt-1">Manage and monitor all registered sellers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-xl font-bold text-gray-800 mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Sellers</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-xl font-bold text-green-600 mb-1">{stats.active}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-xl font-bold text-yellow-600 mb-1">{stats.inactive}</div>
          <div className="text-sm text-gray-600">Inactive</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-xl font-bold text-red-600 mb-1">{stats.suspended}</div>
          <div className="text-sm text-gray-600">Suspended</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-xl font-bold text-purple-600 mb-1">{stats.totalBooks}</div>
          <div className="text-sm text-gray-600">Total Books</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 text-center">
          <div className="text-xl font-bold text-blue-600 mb-1">₹{(stats.totalRevenue/1000).toFixed(0)}K</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search sellers by name, business or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-600" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSellers.length === 0 && !loading && (
          <div className="col-span-3 bg-white rounded-xl shadow-sm p-12 text-center">
            <Users className="mx-auto mb-4 text-gray-300" size={48} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No sellers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}

        {filteredSellers.map((seller) => (
          <div key={seller.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
            {/* Seller Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {seller.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{seller.name}</h3>
                    <p className="text-sm text-gray-600">{seller.businessName}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(seller.status)}`}>
                  {seller.status}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(seller.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {seller.rating} ({seller.totalReviews} reviews)
                </span>
              </div>

              {/* Performance */}
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPerformanceColor(seller.performance)}`}>
                  {seller.performance}
                </span>
                <span className="text-xs text-gray-500">Last active: {seller.lastActive}</span>
              </div>
            </div>

            {/* Seller Stats */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <div className="text-lg font-bold text-gray-800">{seller.totalBooks}</div>
                  <div className="text-xs text-gray-600">Books</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">{seller.totalSales}</div>
                  <div className="text-xs text-gray-600">Sales</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-800">₹{(seller.totalRevenue/1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-600">Revenue</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Mail size={12} />
                  {seller.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={12} />
                  {seller.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={12} />
                  <span className="truncate">{seller.address.split(',')[0]}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSeller(seller)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-700 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                >
                  <Eye size={14} />
                  View
                </button>
                {seller.status === 'active' ? (
                  <button
                    onClick={() => handleSuspendSeller(seller.id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-700 py-2 rounded-lg text-sm hover:bg-red-200 transition-colors"
                  >
                    <UserX size={14} />
                    Suspend
                  </button>
                ) : (
                  <button
                    onClick={() => handleActivateSeller(seller.id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-green-100 text-green-700 py-2 rounded-lg text-sm hover:bg-green-200 transition-colors"
                  >
                    <Users size={14} />
                    Activate
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Seller Details Modal */}
      {selectedSeller && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Seller Details</h3>
                <button 
                  onClick={() => setSelectedSeller(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <UserX size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {selectedSeller.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{selectedSeller.name}</h4>
                  <p className="text-gray-600">{selectedSeller.businessName}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedSeller.status)}`}>
                    {selectedSeller.status}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-800">{selectedSeller.totalBooks}</div>
                  <div className="text-xs text-gray-600">Books</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-800">{selectedSeller.totalSales}</div>
                  <div className="text-xs text-gray-600">Sales</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-800">{selectedSeller.totalReviews}</div>
                  <div className="text-xs text-gray-600">Reviews</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-800">₹{(selectedSeller.totalRevenue/1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-600">Revenue</div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h5 className="font-semibold text-gray-700 mb-3">Contact Information</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-gray-500" />
                    <span>{selectedSeller.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-500" />
                    <span>{selectedSeller.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-500" />
                    <span>{selectedSeller.address}</span>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h5 className="font-semibold text-gray-700 mb-3">Business Information</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-gray-600">Business Type</label>
                    <div className="font-medium">{selectedSeller.businessType}</div>
                  </div>
                  <div>
                    <label className="text-gray-600">Join Date</label>
                    <div className="font-medium">{selectedSeller.joinDate}</div>
                  </div>
                  <div>
                    <label className="text-gray-600">Performance</label>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getPerformanceColor(selectedSeller.performance)}`}>
                      {selectedSeller.performance}
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600">Rating</label>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="font-medium">{selectedSeller.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suspension Reason */}
              {selectedSeller.suspensionReason && (
                <div>
                  <h5 className="font-semibold text-red-700 mb-2">Suspension Reason</h5>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                    {selectedSeller.suspensionReason}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
              {selectedSeller.status === 'active' ? (
                <button
                  onClick={() => {
                    handleSuspendSeller(selectedSeller.id);
                    setSelectedSeller(null);
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Suspend Seller
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleActivateSeller(selectedSeller.id);
                    setSelectedSeller(null);
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Activate Seller
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSellers;