import React, { useEffect, useState } from 'react';
import { 
  Home, 
  Users, 
  UserPlus, 
  LogOut, 
  Menu, 
  X, 
  Shield,
  BarChart3,
  Settings,
  Edit,
  Trash2,
  Search,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../lib/auth';
import { 
  getAllUsers, 
  updateUserRole, 
  deleteUser, 
  createUser, 
  updateUser 
} from '../../lib/users';

export default function SuperAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Create user form state
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  // Edit user form state
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.role || userData.role !== 'superadmin') {
      navigate('/login');
      return;
    }
    fetchUsers();
  }, [navigate]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response.data);
      setMessage('');
    } catch (err) {
      console.error(err);
      setMessage('Unable to fetch users. Please login again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleRoleChange(userId, newRole) {
    try {
      await updateUserRole(userId, newRole);
      setUsers(prev => prev.map(u => 
        u._id === userId ? { ...u, role: newRole } : u
      ));
      setMessage('Role updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update role');
    }
  }

  async function handleDeleteUser(userId) {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(u => u._id !== userId));
      setMessage('User deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete user');
    }
  }

  async function handleCreateUser(e) {
    e.preventDefault();
    try {
      const response = await createUser(createForm);
      setUsers(prev => [...prev, response.data]);
      setShowCreateModal(false);
      setCreateForm({ name: '', email: '', password: '', role: 'user' });
      setMessage('User created successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create user');
    }
  }

  async function handleEditUser(e) {
    e.preventDefault();
    try {
      const response = await updateUser(selectedUser._id, editForm);
      setUsers(prev => prev.map(u => 
        u._id === selectedUser._id ? response.data : u
      ));
      setShowEditModal(false);
      setSelectedUser(null);
      setMessage('User updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update user');
    }
  }

  function openEditModal(user) {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowEditModal(true);
  }

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'superadmin': return 'bg-red-100 text-red-800 border-red-200';
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'seller': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'user': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const stats = {
    totalUsers: users.length,
    totalAdmins: users.filter(u => u.role === 'admin').length,
    totalSellers: users.filter(u => u.role === 'seller').length,
    totalSuperAdmins: users.filter(u => u.role === 'superadmin').length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center px-4 py-3 bg-white shadow md:px-8">
        <div className="flex items-center gap-4">
          <button 
            className="block md:hidden" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <div>
            <span className="font-bold text-purple-700">BOOK</span>
            <span className="font-bold">LIBRARY</span>
            <div className="text-xs text-gray-500 hidden md:block">SuperAdmin Panel</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            Hi, SuperAdmin
          </span>
          <img 
            src={`https://api.dicebear.com/7.x/initials/svg?seed=SuperAdmin&backgroundColor=7c3aed`} 
            alt="avatar" 
            className="w-8 h-8 rounded-full"
          />
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "block" : "hidden"} fixed z-20 inset-0 w-64 md:static md:block bg-white shadow-md flex flex-col transition-all duration-200 md:min-h-[calc(100vh-64px)]`}>
          <div className="flex-1 py-8 space-y-2">
            <button className={`flex items-center gap-3 px-6 py-2 w-full text-left ${active === "dashboard" ? "bg-purple-50 text-purple-700 font-bold" : "text-gray-700"}`} onClick={() => { setActive("dashboard"); setSidebarOpen(false); }}>
              <Home size={18} /> Dashboard
            </button>
            <button className={`flex items-center gap-3 px-6 py-2 w-full text-left ${active === "users" ? "bg-purple-50 text-purple-700 font-bold" : "text-gray-700"}`} onClick={() => { setActive("users"); setSidebarOpen(false); }}>
              <Users size={18} /> User Management
            </button>
          </div>
          <div className="py-4 border-t flex flex-col">
            <button className="flex items-center gap-3 px-6 py-2 w-full text-red-700 hover:bg-red-50" onClick={() => { logout(); navigate('/login'); }}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-10 py-8 ml-0 md:ml-0">
          {message && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
              {message}
            </div>
          )}

          {active === 'dashboard' && (
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">SuperAdmin Overview</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{stats.totalUsers}</div>
                      <div className="text-sm text-gray-500 mt-1">Total Users</div>
                    </div>
                    <Users className="text-purple-500" size={24} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{stats.totalAdmins}</div>
                      <div className="text-sm text-gray-500 mt-1">Admins</div>
                    </div>
                    <Shield className="text-blue-500" size={24} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{stats.totalSellers}</div>
                      <div className="text-sm text-gray-500 mt-1">Sellers</div>
                    </div>
                    <UserPlus className="text-green-500" size={24} />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-800">{stats.totalSuperAdmins}</div>
                      <div className="text-sm text-gray-500 mt-1">SuperAdmins</div>
                    </div>
                    <Shield className="text-red-500" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-purple-500 hover:bg-purple-50 transition-colors" onClick={() => setActive('users')}>
                    <Users className="mx-auto mb-2 text-gray-400" size={24} />
                    <div className="font-medium">Manage All Users</div>
                    <div className="text-sm text-gray-500">View, edit, and manage users</div>
                  </button>
                  
                  <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-green-500 hover:bg-green-50 transition-colors" onClick={() => setShowCreateModal(true)}>
                    <UserPlus className="mx-auto mb-2 text-gray-400" size={24} />
                    <div className="font-medium">Create New User</div>
                    <div className="text-sm text-gray-500">Add new user to system</div>
                  </button>
                </div>
              </div>
            </section>
          )}

          {active === 'users' && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">User Management</h2>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center gap-2"
                >
                  <UserPlus size={18} />
                  Create User
                </button>
              </div>

              {/* Search and Filter */}
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    >
                      <option value="all">All Roles</option>
                      <option value="superadmin">SuperAdmin</option>
                      <option value="admin">Admin</option>
                      <option value="seller">Seller</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      All Users ({filteredUsers.length})
                      {loading && <span className="text-sm text-gray-500 ml-2">Loading...</span>}
                    </h3>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-700">User</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Role</th>
                        <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.length === 0 && !loading && (
                        <tr>
                          <td colSpan="4" className="p-8 text-center text-gray-500">
                            <Users className="mx-auto mb-2 text-gray-400" size={32} />
                            <div>No users found</div>
                          </td>
                        </tr>
                      )}
                      {filteredUsers.map(user => (
                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}&backgroundColor=7c3aed`} 
                                alt="avatar" 
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <div className="font-medium text-gray-800">{user.name}</div>
                                <div className="text-xs text-gray-500">ID: {user._id.slice(-6)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600">{user.email}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <select 
                                value={user.role} 
                                onChange={e => handleRoleChange(user._id, e.target.value)} 
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                              >
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                                <option value="admin">Admin</option>
                                <option value="superadmin">SuperAdmin</option>
                              </select>
                              
                              <button 
                                onClick={() => openEditModal(user)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit User"
                              >
                                <Edit size={16} />
                              </button>
                              
                              <button 
                                onClick={() => handleDeleteUser(user._id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Delete User"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Create New User</h3>
            </div>
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={createForm.name}
                  onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={createForm.email}
                  onChange={(e) => setCreateForm({...createForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={createForm.password}
                  onChange={(e) => setCreateForm({...createForm, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  value={createForm.role}
                  onChange={(e) => setCreateForm({...createForm, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">SuperAdmin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                  Create User
                </button>
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 bg-gray-300 py-2 rounded-md hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Edit User</h3>
            </div>
            <form onSubmit={handleEditUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">SuperAdmin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                  Update User
                </button>
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-gray-300 py-2 rounded-md hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}