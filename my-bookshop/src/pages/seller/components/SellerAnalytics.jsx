import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, BookOpen, Loader } from "lucide-react";

const SellerAnalytics = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual API call
        // const response = await fetch('/api/seller/analytics');
        // const data = await response.json();
        // setAnalyticsData(data);
        
        // Temporary: Calculate from actual books data
        const savedBooks = JSON.parse(localStorage.getItem("sellerBooks") || "[]");
        const savedOrders = JSON.parse(localStorage.getItem("sellerOrders") || "[]");
        
        const totalBooks = savedBooks.length;
        const totalOrders = savedOrders.length;
        const totalRevenue = savedOrders.reduce((sum, order) => sum + (order.price || 0), 0);
        
        // Calculate real data from available sources
        const realData = {
          totalRevenue: totalRevenue,
          totalOrders: totalOrders,
          totalBooks: totalBooks,
          conversionRate: totalBooks > 0 ? ((totalOrders / totalBooks) * 100).toFixed(1) : 0,
          topBooks: calculateTopBooks(savedBooks, savedOrders),
          recentActivity: generateRecentActivity(savedOrders),
          revenueData: generateRevenueData(savedOrders, timeRange)
        };
        
        setAnalyticsData(realData);
        
      } catch (err) {
        setError("Failed to load analytics data");
        console.error("Analytics error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeRange]);

  // Real data calculation functions
  const calculateTopBooks = (books, orders) => {
    const bookSales = {};
    
    orders.forEach(order => {
      if (order.bookId) {
        bookSales[order.bookId] = (bookSales[order.bookId] || 0) + 1;
      }
    });
    
    return books
      .map(book => ({
        title: book.title,
        sales: bookSales[book.id] || 0,
        revenue: (bookSales[book.id] || 0) * (book.price || 0)
      }))
      .filter(book => book.sales > 0)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4);
  };

  const generateRecentActivity = (orders) => {
    return orders
      .slice(0, 4)
      .map(order => ({
        action: "New Order",
        book: order.bookTitle || "Book",
        time: "Recently",
        amount: order.price
      }));
  };

  const generateRevenueData = (orders, range) => {
    // Simple revenue data based on actual orders
    const baseData = {
      monthly: Array(12).fill(0),
      weekly: Array(7).fill(0),
      daily: Array(7).fill(0)
    };
    
    orders.forEach(order => {
      // Add order amount to appropriate time period
      // This is simplified - you can implement proper date grouping
      if (baseData[range]) {
        baseData[range][0] += order.price || 0;
      }
    });
    
    return baseData;
  };

  const stats = [
    {
      title: "Total Revenue",
      value: analyticsData ? `$${analyticsData.totalRevenue.toFixed(2)}` : "$0.00",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+0%"
    },
    {
      title: "Total Orders",
      value: analyticsData?.totalOrders || 0,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+0%"
    },
    {
      title: "Books Listed",
      value: analyticsData?.totalBooks || 0,
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+0%"
    },
    {
      title: "Conversion Rate",
      value: analyticsData ? `${analyticsData.conversionRate}%` : "0%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "+0%"
    }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your sales and performance</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 text-purple-600 animate-spin" />
          <span className="ml-2 text-gray-600">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your sales and performance</p>
            </div>
          </div>
        </div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <BarChart3 className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your sales and performance</p>
          </div>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Books */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Books</h3>
          {analyticsData.topBooks.length > 0 ? (
            <div className="space-y-4">
              {analyticsData.topBooks.map((book, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{book.title}</p>
                    <p className="text-sm text-gray-600">{book.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">${book.revenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p>No sales data yet</p>
              <p className="text-sm">Your top books will appear here</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          {analyticsData.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.action.includes('Order') ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <ShoppingCart className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.book}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <div className="text-right">
                      <p className="font-semibold text-green-600">${activity.amount}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p>No recent activity</p>
              <p className="text-sm">Orders will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Revenue Chart Placeholder - Ready for real chart library */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend ({timeRange})</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Real revenue chart</p>
            <p className="text-sm text-gray-400">Connect to chart library when data available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics;