import React, { useState } from 'react';
import { ShoppingCart, Package, Truck, CheckCircle, Clock, Search, Filter, Download } from 'lucide-react';

const UserOrders = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock orders data
  const orders = [
    {
      id: 'ORD-001',
      bookTitle: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 299,
      quantity: 1,
      orderDate: '2024-01-15',
      status: 'delivered',
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-20',
      deliveredDate: '2024-01-18',
      seller: 'Classic Books Store',
      image: '/api/placeholder/80/120',
      items: [
        { name: 'The Great Gatsby', price: 299, quantity: 1 }
      ]
    },
    {
      id: 'ORD-002',
      bookTitle: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 350,
      quantity: 1,
      orderDate: '2024-01-12',
      status: 'shipped',
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-18',
      seller: 'Literary Haven',
      image: '/api/placeholder/80/120',
      items: [
        { name: 'To Kill a Mockingbird', price: 350, quantity: 1 }
      ]
    },
    {
      id: 'ORD-003',
      bookTitle: '1984',
      author: 'George Orwell',
      price: 275,
      quantity: 1,
      orderDate: '2024-01-10',
      status: 'processing',
      seller: 'Future Reads',
      image: '/api/placeholder/80/120',
      items: [
        { name: '1984', price: 275, quantity: 1 }
      ]
    },
    {
      id: 'ORD-004',
      bookTitle: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: 320,
      quantity: 1,
      orderDate: '2024-01-08',
      status: 'cancelled',
      seller: 'Romantic Tales',
      image: '/api/placeholder/80/120',
      items: [
        { name: 'Pride and Prejudice', price: 320, quantity: 1 }
      ]
    },
    {
      id: 'ORD-005',
      bookTitle: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      price: 400,
      quantity: 1,
      orderDate: '2024-01-05',
      status: 'delivered',
      trackingNumber: 'TRK456789123',
      estimatedDelivery: '2024-01-12',
      deliveredDate: '2024-01-10',
      seller: 'Fantasy World',
      image: '/api/placeholder/80/120',
      items: [
        { name: 'The Hobbit', price: 400, quantity: 1 }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Package className="h-5 w-5 text-yellow-600" />;
      case 'cancelled':
        return <Clock className="h-5 w-5 text-red-600" />;
      default:
        return <ShoppingCart className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    processing: orders.filter(o => o.status === 'processing').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-600 mt-1">Manage and track your book orders</p>
          </div>
          <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-fit">
            <Download size={18} />
            Export Orders
          </button>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search orders by book title or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-gray-600" />
            {[
              { key: 'all', label: 'All Orders', count: statusCounts.all },
              { key: 'delivered', label: 'Delivered', count: statusCounts.delivered },
              { key: 'shipped', label: 'Shipped', count: statusCounts.shipped },
              { key: 'processing', label: 'Processing', count: statusCounts.processing },
              { key: 'cancelled', label: 'Cancelled', count: statusCounts.cancelled }
            ].map((status) => (
              <button
                key={status.key}
                onClick={() => setFilter(status.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                  filter === status.key
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {status.label} ({status.count})
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No orders found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Order #: <span className="font-medium">{order.id}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Placed on: <span className="font-medium">{order.orderDate}</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      ₹{order.price}
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Book Image */}
                    <div className="w-20 h-28 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={order.image} 
                        alt={order.bookTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Book Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">
                        {order.bookTitle}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">by {order.author}</p>
                      <p className="text-gray-600 text-sm mb-3">
                        Seller: <span className="font-medium">{order.seller}</span>
                      </p>

                      {/* Order Progress */}
                      {order.status !== 'cancelled' && (
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          {order.trackingNumber && (
                            <span>Tracking: <strong>{order.trackingNumber}</strong></span>
                          )}
                          {order.estimatedDelivery && (
                            <span>Est. Delivery: <strong>{order.estimatedDelivery}</strong></span>
                          )}
                          {order.deliveredDate && (
                            <span className="text-green-600">
                              Delivered on: <strong>{order.deliveredDate}</strong>
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                          View Details
                        </button>
                        {order.status === 'delivered' && (
                          <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                            Write Review
                          </button>
                        )}
                        {order.status === 'shipped' && (
                          <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                            Track Order
                          </button>
                        )}
                        {(order.status === 'processing' || order.status === 'shipped') && (
                          <button className="px-3 py-1 border border-red-300 text-red-700 text-sm rounded-lg hover:bg-red-50 transition-colors">
                            Cancel Order
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                            Buy Again
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredOrders.length > 0 && (
          <div className="text-center mt-6">
            <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Load More Orders
            </button>
          </div>
        )}
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">{orders.length}</div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {orders.filter(o => o.status === 'delivered').length}
          </div>
          <div className="text-sm text-gray-600">Completed Orders</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            ₹{orders.reduce((total, order) => total + order.price, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Spent</div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;