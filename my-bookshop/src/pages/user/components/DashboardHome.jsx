import React from 'react';
import { BookOpen, ShoppingCart, Heart, MessageCircle, TrendingUp, Package } from 'lucide-react';

const DashboardHome = ({ user }) => {
  // Mock data for dashboard
  const stats = {
    totalOrders: 5,
    pendingOrders: 2,
    likedBooks: 8,
    unreadMessages: 3,
    totalSpent: 2450
  };

  const recentActivities = [
    { id: 1, type: 'order', message: 'You placed an order for "The Great Gatsby"', time: '2 hours ago' },
    { id: 2, type: 'like', message: 'You liked "To Kill a Mockingbird"', time: '1 day ago' },
    { id: 3, type: 'message', message: 'New message from BookStore Pro', time: '2 days ago' },
    { id: 4, type: 'order', message: 'Order #ORD-004 delivered successfully', time: '3 days ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-purple-100">
          Here's what's happening with your book journey today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalOrders}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-3 text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span>+2 from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.pendingOrders}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">Need attention</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Liked Books</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.likedBooks}</p>
            </div>
            <div className="p-3 bg-pink-100 rounded-lg">
              <Heart className="h-6 w-6 text-pink-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">Your wishlist</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">₹{stats.totalSpent}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-3 text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span>Good reading habits!</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.type === 'order' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'like' ? 'bg-pink-100 text-pink-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {activity.type === 'order' && <ShoppingCart size={16} />}
                  {activity.type === 'like' && <Heart size={16} />}
                  {activity.type === 'message' && <MessageCircle size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-purple-500 hover:bg-purple-50 transition-colors group">
              <ShoppingCart className="h-8 w-8 text-gray-400 group-hover:text-purple-600 mx-auto mb-2" />
              <div className="font-medium text-gray-700 group-hover:text-purple-700">Browse Books</div>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-blue-500 hover:bg-blue-50 transition-colors group">
              <Package className="h-8 w-8 text-gray-400 group-hover:text-blue-600 mx-auto mb-2" />
              <div className="font-medium text-gray-700 group-hover:text-blue-700">Track Order</div>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-pink-500 hover:bg-pink-50 transition-colors group">
              <Heart className="h-8 w-8 text-gray-400 group-hover:text-pink-600 mx-auto mb-2" />
              <div className="font-medium text-gray-700 group-hover:text-pink-700">Wishlist</div>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-green-500 hover:bg-green-50 transition-colors group">
              <MessageCircle className="h-8 w-8 text-gray-400 group-hover:text-green-600 mx-auto mb-2" />
              <div className="font-medium text-gray-700 group-hover:text-green-700">Messages</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;