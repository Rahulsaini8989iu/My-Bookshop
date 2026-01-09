import React, { useState, useEffect } from 'react';
import { BarChart3, Users, ShoppingCart, BookOpen, TrendingUp, DollarSign, Eye, Download } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalUsers: 1247,
      totalSellers: 89,
      totalBooks: 3456,
      totalOrders: 892,
      totalRevenue: 245670,
      pageViews: 15678
    },
    growth: {
      users: '+12%',
      sellers: '+8%',
      books: '+15%',
      revenue: '+22%'
    },
    charts: {
      userGrowth: [120, 190, 300, 500, 800, 1247],
      revenue: [45000, 78000, 120000, 156000, 189000, 245670],
      orders: [120, 250, 400, 580, 720, 892]
    },
    topSellers: [
      { name: 'Classic Books Store', sales: 156, revenue: 45600, growth: '+15%' },
      { name: 'Fantasy World', sales: 134, revenue: 38900, growth: '+22%' },
      { name: 'Tech Books Hub', sales: 98, revenue: 28700, growth: '+8%' },
      { name: 'Romantic Tales', sales: 87, revenue: 23400, growth: '+12%' },
      { name: 'Science Reads', sales: 76, revenue: 19800, growth: '+18%' }
    ],
    popularBooks: [
      { title: 'The Great Gatsby', sales: 45, revenue: 13455 },
      { title: 'To Kill a Mockingbird', sales: 38, revenue: 13300 },
      { title: '1984', sales: 34, revenue: 9350 },
      { title: 'The Hobbit', sales: 29, revenue: 11600 },
      { title: 'Pride and Prejudice', sales: 27, revenue: 8640 }
    ]
  };

  const stats = [
    {
      title: 'Total Users',
      value: analyticsData.overview.totalUsers.toLocaleString(),
      change: analyticsData.growth.users,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Sellers',
      value: analyticsData.overview.totalSellers.toLocaleString(),
      change: analyticsData.growth.sellers,
      icon: BookOpen,
      color: 'green'
    },
    {
      title: 'Total Books',
      value: analyticsData.overview.totalBooks.toLocaleString(),
      change: analyticsData.growth.books,
      icon: BookOpen,
      color: 'purple'
    },
    {
      title: 'Total Orders',
      value: analyticsData.overview.totalOrders.toLocaleString(),
      change: '+18%',
      icon: ShoppingCart,
      color: 'orange'
    },
    {
      title: 'Total Revenue',
      value: `₹${analyticsData.overview.totalRevenue.toLocaleString()}`,
      change: analyticsData.growth.revenue,
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Page Views',
      value: analyticsData.overview.pageViews.toLocaleString(),
      change: '+25%',
      icon: Eye,
      color: 'blue'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Platform performance and insights</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</p>
                  <div className={`flex items-center gap-1 text-sm ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp size={14} />
                    <span>{stat.change} from last period</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sellers */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Top Sellers</h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {analyticsData.topSellers.map((seller, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {seller.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{seller.name}</div>
                    <div className="text-sm text-gray-500">{seller.sales} sales</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">₹{seller.revenue.toLocaleString()}</div>
                  <div className={`text-xs ${seller.growth.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {seller.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Books */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Popular Books</h3>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {analyticsData.popularBooks.map((book, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    <BookOpen size={16} />
                  </div>
                  <div className="max-w-[160px]">
                    <div className="font-medium text-gray-800 text-sm truncate">{book.title}</div>
                    <div className="text-xs text-gray-500">{book.sales} sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">₹{book.revenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">User Growth</h3>
          <div className="space-y-3">
            {analyticsData.charts.userGrowth.map((count, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-16 text-sm text-gray-500">Month {index + 1}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(count / Math.max(...analyticsData.charts.userGrowth)) * 100}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm font-medium text-gray-800">{count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Revenue Trend</h3>
          <div className="space-y-3">
            {analyticsData.charts.revenue.map((revenue, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-16 text-sm text-gray-500">M{index + 1}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(revenue / Math.max(...analyticsData.charts.revenue)) * 100}%` }}
                  ></div>
                </div>
                <div className="w-20 text-sm font-medium text-gray-800">₹{(revenue/1000).toFixed(0)}K</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800 mb-1">Peak Hours</div>
            <div className="text-2xl font-bold text-blue-600">7-9 PM</div>
            <div className="text-xs text-blue-600">Most active time</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm font-medium text-green-800 mb-1">Avg. Order</div>
            <div className="text-2xl font-bold text-green-600">₹275</div>
            <div className="text-xs text-green-600">Per transaction</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm font-medium text-purple-800 mb-1">Conversion</div>
            <div className="text-2xl font-bold text-purple-600">3.2%</div>
            <div className="text-xs text-purple-600">Visitor to buyer</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-sm font-medium text-orange-800 mb-1">Bounce Rate</div>
            <div className="text-2xl font-bold text-orange-600">28%</div>
            <div className="text-xs text-orange-600">Lower is better</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;