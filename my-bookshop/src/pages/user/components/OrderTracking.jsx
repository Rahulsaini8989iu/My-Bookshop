import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

const OrderTracking = ({ orders = [] }) => {
  const [trackingId, setTrackingId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Order status steps
  const statusSteps = [
    { key: 'ordered', label: 'Ordered', icon: Clock },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { key: 'processing', label: 'Processing', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  // Mock tracking data (backend se aayega)
  const mockOrders = [
    {
      id: 'ORD-001',
      bookTitle: 'The Great Gatsby',
      price: 299,
      orderDate: '2024-01-15',
      status: 'shipped',
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-20',
      seller: 'BookStore Pro',
      address: '123 Main St, City, State 12345',
      statusHistory: [
        { status: 'ordered', date: '2024-01-15 10:30 AM', description: 'Order placed successfully' },
        { status: 'confirmed', date: '2024-01-15 11:00 AM', description: 'Order confirmed by seller' },
        { status: 'processing', date: '2024-01-16 09:15 AM', description: 'Order is being processed' },
        { status: 'shipped', date: '2024-01-17 02:30 PM', description: 'Order shipped via delivery partner' }
      ]
    },
    {
      id: 'ORD-002',
      bookTitle: 'To Kill a Mockingbird',
      price: 350,
      orderDate: '2024-01-10',
      status: 'delivered',
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-14',
      seller: 'Classic Books',
      address: '123 Main St, City, State 12345',
      statusHistory: [
        { status: 'ordered', date: '2024-01-10 03:45 PM', description: 'Order placed successfully' },
        { status: 'confirmed', date: '2024-01-10 04:20 PM', description: 'Order confirmed by seller' },
        { status: 'processing', date: '2024-01-11 10:00 AM', description: 'Order is being processed' },
        { status: 'shipped', date: '2024-01-12 11:30 AM', description: 'Order shipped via delivery partner' },
        { status: 'delivered', date: '2024-01-13 02:15 PM', description: 'Order delivered successfully' }
      ]
    },
    {
      id: 'ORD-003',
      bookTitle: '1984',
      price: 275,
      orderDate: '2024-01-18',
      status: 'processing',
      trackingNumber: 'TRK456789123',
      estimatedDelivery: '2024-01-23',
      seller: 'Future Reads',
      address: '123 Main St, City, State 12345',
      statusHistory: [
        { status: 'ordered', date: '2024-01-18 09:20 AM', description: 'Order placed successfully' },
        { status: 'confirmed', date: '2024-01-18 10:05 AM', description: 'Order confirmed by seller' },
        { status: 'processing', date: '2024-01-19 08:45 AM', description: 'Order is being processed' }
      ]
    }
  ];

  const displayOrders = orders.length > 0 ? orders : mockOrders;

  const handleTrackOrder = () => {
    const order = displayOrders.find(order => 
      order.id.toLowerCase().includes(trackingId.toLowerCase()) || 
      order.trackingNumber.toLowerCase().includes(trackingId.toLowerCase())
    );
    setSelectedOrder(order || null);
  };

  const getStatusIndex = (status) => {
    const index = statusSteps.findIndex(step => step.key === status);
    return index >= 0 ? index : 0;
  };

  const getStatusColor = (status, currentStatus) => {
    const currentIndex = getStatusIndex(currentStatus);
    const statusIndex = getStatusIndex(status);
    
    if (statusIndex < currentIndex) return 'text-green-600 bg-green-100';
    if (statusIndex === currentIndex) return 'text-blue-600 bg-blue-100';
    return 'text-gray-400 bg-gray-100';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Track Your Order</h1>
        <p className="text-gray-600">Check the status of your book orders</p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Order ID or Tracking Number
            </label>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g., ORD-001 or TRK123456789"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleTrackOrder}
              className="w-full md:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium transition-colors"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* Order List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Your Orders</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {displayOrders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                 onClick={() => setSelectedOrder(order)}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{order.bookTitle}</h3>
                      <p className="text-gray-600 text-sm">Order ID: {order.id}</p>
                      <p className="text-gray-600 text-sm">Seller: {order.seller}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <p className="text-gray-600 text-sm">₹{order.price}</p>
                  <p className="text-gray-500 text-xs">Ordered: {order.orderDate}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index <= getStatusIndex(order.status);
                    const isCurrent = index === getStatusIndex(order.status);
                    
                    return (
                      <div key={step.key} className="flex flex-col items-center flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-green-500 text-white' : 
                          isCurrent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          <Icon size={16} />
                        </div>
                        <span className={`text-xs mt-1 ${
                          isCompleted || isCurrent ? 'text-gray-800 font-medium' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Progress Line */}
                <div className="relative -mt-4">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 -translate-y-1/2"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 transition-all duration-500"
                    style={{ width: `${(getStatusIndex(order.status) / (statusSteps.length - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Order Details</h3>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Order Info */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Order Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-medium">{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tracking Number:</span>
                      <span className="font-medium">{selectedOrder.trackingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium">{selectedOrder.orderDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Delivery:</span>
                      <span className="font-medium">{selectedOrder.estimatedDelivery}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Book Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Book Title:</span>
                      <span className="font-medium">{selectedOrder.bookTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seller:</span>
                      <span className="font-medium">{selectedOrder.seller}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">₹{selectedOrder.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${
                        selectedOrder.status === 'delivered' ? 'text-green-600' :
                        selectedOrder.status === 'shipped' ? 'text-blue-600' :
                        selectedOrder.status === 'processing' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} />
                  Delivery Address
                </h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {selectedOrder.address}
                </p>
              </div>

              {/* Status Timeline */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-4">Order Status Timeline</h4>
                <div className="space-y-4">
                  {selectedOrder.statusHistory?.map((history, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          index === selectedOrder.statusHistory.length - 1 ? 'bg-blue-500' : 'bg-green-500'
                        }`}></div>
                        {index < selectedOrder.statusHistory.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-300 mt-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">{history.description}</p>
                            <p className="text-sm text-gray-500 mt-1">{history.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            getStatusColor(history.status, selectedOrder.status)
                          }`}>
                            {history.status.charAt(0).toUpperCase() + history.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;