import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, Clock, Mail, Phone, MapPin, FileText, Download } from 'lucide-react';

const SellerRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filter, setFilter] = useState('pending');

  // Mock seller requests data
  const mockRequests = [
    {
      id: 'REQ-001',
      userId: 'USER-001',
      userName: 'Rahul Sharma',
      userEmail: 'rahul@example.com',
      userPhone: '+91 9876543210',
      userAddress: '123 Main Street, Mumbai, Maharashtra 400001',
      requestDate: '2024-01-20',
      status: 'pending',
      businessName: 'Sharma Book Store',
      businessType: 'Physical Store',
      businessAddress: '123 Main Street, Mumbai, Maharashtra 400001',
      businessDescription: 'A family-owned book store specializing in academic and fiction books with 5 years of experience.',
      documents: [
        { name: 'Aadhar Card', url: '#', verified: true },
        { name: 'GST Certificate', url: '#', verified: true },
        { name: 'Business License', url: '#', verified: false }
      ],
      notes: 'Interested in selling academic books and novels.',
      previousOrders: 12,
      accountAge: '2 years'
    },
    {
      id: 'REQ-002',
      userId: 'USER-002',
      userName: 'Priya Patel',
      userEmail: 'priya@example.com',
      userPhone: '+91 9876543211',
      userAddress: '456 Park Avenue, Delhi 110001',
      requestDate: '2024-01-19',
      status: 'pending',
      businessName: 'Patel Book Corner',
      businessType: 'Online Store',
      businessAddress: '456 Park Avenue, Delhi 110001',
      businessDescription: 'Online book seller focusing on children books and educational materials. Operating since 2022.',
      documents: [
        { name: 'Aadhar Card', url: '#', verified: true },
        { name: 'PAN Card', url: '#', verified: true }
      ],
      notes: 'Specializes in children educational books.',
      previousOrders: 8,
      accountAge: '1 year'
    },
    {
      id: 'REQ-003',
      userId: 'USER-003',
      userName: 'Amit Kumar',
      userEmail: 'amit@example.com',
      userPhone: '+91 9876543212',
      userAddress: '789 MG Road, Bangalore 560001',
      requestDate: '2024-01-18',
      status: 'approved',
      businessName: 'Kumar Books',
      businessType: 'Both Physical & Online',
      businessAddress: '789 MG Road, Bangalore 560001',
      businessDescription: 'Established book retailer with both physical store and online presence. Wide collection of fiction and non-fiction.',
      documents: [
        { name: 'Aadhar Card', url: '#', verified: true },
        { name: 'GST Certificate', url: '#', verified: true },
        { name: 'Business License', url: '#', verified: true },
        { name: 'Shop Act License', url: '#', verified: true }
      ],
      notes: 'Approved after document verification.',
      previousOrders: 25,
      accountAge: '3 years',
      approvedDate: '2024-01-19',
      approvedBy: 'Admin User'
    },
    {
      id: 'REQ-004',
      userId: 'USER-004',
      userName: 'Sneha Gupta',
      userEmail: 'sneha@example.com',
      userPhone: '+91 9876543213',
      userAddress: '321 Cross Road, Chennai 600001',
      requestDate: '2024-01-17',
      status: 'rejected',
      businessName: 'Gupta Book House',
      businessType: 'Physical Store',
      businessAddress: '321 Cross Road, Chennai 600001',
      businessDescription: 'Small book store in Chennai central area.',
      documents: [
        { name: 'Aadhar Card', url: '#', verified: true },
        { name: 'PAN Card', url: '#', verified: true }
      ],
      notes: 'Rejected due to incomplete business documentation.',
      previousOrders: 3,
      accountAge: '6 months',
      rejectedDate: '2024-01-18',
      rejectedBy: 'Admin User',
      rejectionReason: 'Incomplete business registration documents'
    }
  ];

  useEffect(() => {
    // Load requests (in real app, fetch from API)
    setLoading(true);
    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (requestId) => {
    if (window.confirm('Are you sure you want to approve this seller request?')) {
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              status: 'approved',
              approvedDate: new Date().toISOString().split('T')[0],
              approvedBy: 'Current Admin'
            }
          : req
      ));
    }
  };

  const handleReject = (requestId) => {
    const reason = prompt('Please enter rejection reason:');
    if (reason) {
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { 
              ...req, 
              status: 'rejected',
              rejectedDate: new Date().toISOString().split('T')[0],
              rejectedBy: 'Current Admin',
              rejectionReason: reason
            }
          : req
      ));
    }
  };

  const filteredRequests = requests.filter(request => 
    filter === 'all' || request.status === filter
  );

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={14} />;
      case 'approved': return <CheckCircle size={14} />;
      case 'rejected': return <XCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Seller Requests</h1>
              <p className="text-gray-600 mt-1">Manage user requests to become sellers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-gray-800 mb-2">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Requests</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-2">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">{stats.approved}</div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">{stats.rejected}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All Requests', count: stats.total },
            { key: 'pending', label: 'Pending', count: stats.pending },
            { key: 'approved', label: 'Approved', count: stats.approved },
            { key: 'rejected', label: 'Rejected', count: stats.rejected }
          ].map((status) => (
            <button
              key={status.key}
              onClick={() => setFilter(status.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
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

      {/* Requests List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Seller Requests ({filteredRequests.length})
              {loading && <span className="text-sm text-gray-500 ml-2">Loading...</span>}
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700">User & Business</th>
                <th className="text-left p-4 font-semibold text-gray-700">Request Details</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    <Users className="mx-auto mb-2 text-gray-400" size={32} />
                    <div>No requests found</div>
                  </td>
                </tr>
              )}
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        {request.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{request.userName}</div>
                        <div className="text-sm text-gray-500">{request.businessName}</div>
                        <div className="text-xs text-gray-400">{request.businessType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={12} />
                        {request.userEmail}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={12} />
                        {request.userPhone}
                      </div>
                      <div className="text-gray-500">
                        Requested: {request.requestDate}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    {request.approvedDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        Approved: {request.approvedDate}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                      >
                        View Details
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Seller Request Details</h3>
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* User Information */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">User Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                    <div className="font-medium">{selectedRequest.userName}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <div className="font-medium">{selectedRequest.userEmail}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone</label>
                    <div className="font-medium">{selectedRequest.userPhone}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Account Age</label>
                    <div className="font-medium">{selectedRequest.accountAge}</div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Address</label>
                    <div className="font-medium flex items-center gap-1">
                      <MapPin size={14} />
                      {selectedRequest.userAddress}
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Business Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Business Name</label>
                    <div className="font-medium">{selectedRequest.businessName}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Business Type</label>
                    <div className="font-medium">{selectedRequest.businessType}</div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Business Description</label>
                    <div className="font-medium">{selectedRequest.businessDescription}</div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Submitted Documents</h4>
                <div className="space-y-2">
                  {selectedRequest.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-500" />
                        <span className="font-medium">{doc.name}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          doc.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.verified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        View Document
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Previous Orders</label>
                  <div className="font-medium text-lg">{selectedRequest.previousOrders} orders</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Request Date</label>
                  <div className="font-medium">{selectedRequest.requestDate}</div>
                </div>
              </div>

              {/* Notes */}
              {selectedRequest.notes && (
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Additional Notes</label>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {selectedRequest.notes}
                  </div>
                </div>
              )}

              {/* Rejection Reason */}
              {selectedRequest.rejectionReason && (
                <div>
                  <label className="block text-sm text-red-600 mb-1">Rejection Reason</label>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-red-800">
                    {selectedRequest.rejectionReason}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {selectedRequest.status === 'pending' && (
              <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
                <button
                  onClick={() => handleReject(selectedRequest.id)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject Request
                </button>
                <button
                  onClick={() => handleApprove(selectedRequest.id)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve Request
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerRequests;