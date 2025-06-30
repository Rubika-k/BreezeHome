import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from '../../axiosConfig';

const adminToken = localStorage.getItem('token');

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-sm text-gray-600">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [customers, setCustomers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchUser, setSearchUser] = useState('');
  const [searchWorker, setSearchWorker] = useState('');
  const [newCategory, setNewCategory] = useState({ name: '', icon: '' });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    await Promise.all([fetchCustomers(), fetchWorkers(), fetchBookings(), fetchCategories()]);
  };

  const fetchCustomers = async () => {
    const res = await axios.get('/api/customers', {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    setCustomers(res.data.users || []);
  };

  const fetchWorkers = async () => {
    const res = await axios.get('/api/workers', {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    setWorkers(res.data || []);
  };

  const fetchBookings = async () => {
    const res = await axios.get('/api/admin/bookings', {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    setBookings(res.data || []);
  };

  const fetchCategories = async () => {
    const res = await axios.get('/api/categories');
    setCategories(res.data || []);
  };

  // === Users ===
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await axios.delete(`/api/customers/${id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    fetchCustomers();
  };

  const filteredUsers = customers.filter((u) =>
    u.fullName?.toLowerCase().includes(searchUser.toLowerCase())
  );

  // === Workers ===

  const filteredWorkers = workers.filter((w) =>
    w.fullName?.toLowerCase().includes(searchWorker.toLowerCase())
  );
const [newWorker, setNewWorker] = useState({
  fullName: '',
  category: '',
  phone: '',
});

const handleWorkerChange = (e) => {
  setNewWorker({ ...newWorker, [e.target.name]: e.target.value });
};

const handleAddWorker = async (e) => {
  e.preventDefault();
  await axios.post('/api/workers', newWorker, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  setNewWorker({ fullName: '', category: '', phone: '' });
  fetchWorkers();
};

const handleDeleteWorker = async (id) => {
  if (!window.confirm('Delete this worker?')) return;
  await axios.delete(`/api/workers/${id}`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  fetchWorkers();
};

  // === Bookings ===
  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    await axios.delete(`/api/bookings/${id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    fetchBookings();
  };

  // === Categories ===
  const handleCategoryChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    await axios.post('/api/categories', newCategory, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    setNewCategory({ name: '', icon: '' });
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    await axios.delete(`/api/categories/${id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    fetchCategories();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-red-500">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-4 text-white">Admin Dashboard</h1>

        <div className="flex gap-4 mb-6">
          {['dashboard', 'users', 'workers', 'bookings', 'services'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab
                  ? 'bg-white text-blue-600 font-semibold'
                  : 'bg-white bg-opacity-80 text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Users" value={customers.length} subtitle="Registered Users" />
            <StatCard title="Total Workers" value={workers.length} subtitle="Service Workers" />
            <StatCard title="Total Bookings" value={bookings.length} subtitle="Bookings Made" />
            <StatCard title="Categories" value={categories.length} subtitle="Service Types" />
          </div>
        )}

        {/* USERS */}
        {activeTab === 'users' && (
          <section className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Users</h2>
            <input
              type="text"
              placeholder="Search users..."
              className="p-2 border rounded mb-4 w-full"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="border-t">
                    <td className="p-2">{u.fullName}</td>
                    <td className="p-2">{u.email}</td>
                    <td className="p-2">{u.phone}</td>
                    <td className="p-2">{u.role}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="text-red-600 underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* WORKERS */}
        {activeTab === 'workers' && (
          <section className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Workers</h2>
            <input
              type="text"
              placeholder="Search workers..."
              className="p-2 border rounded mb-4 w-full"
              value={searchWorker}
              onChange={(e) => setSearchWorker(e.target.value)}
            />
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Name</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Verified</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkers.map((w) => (
                  <tr key={w._id} className="border-t">
                    <td className="p-2">{w.fullName}</td>
                    <td className="p-2">{w.category}</td>
                    <td className="p-2">{w.phone}</td>
                    <td className="p-2">{w.isVerified ? 'Yes' : 'No'}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteWorker(w._id)}
                        className="text-red-600 underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* BOOKINGS */}
        {/* {activeTab === 'bookings' && (
          <section className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Bookings</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Service</th>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-t">
                    <td className="p-2">{b.workTitle}</td>
                    <td className="p-2">{b.userId?.fullName}</td>
                    <td className="p-2">{b.status}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteBooking(b._id)}
                        className="text-red-600 underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )} */}
{/* === BOOKINGS TAB === */}
{activeTab === 'bookings' && (
  <section className="bg-white rounded shadow p-6">
    <h2 className="text-lg font-semibold mb-4">All Bookings</h2>

    {bookings.length === 0 ? (
      <p className="text-gray-500">No bookings found.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">User</th>
              <th className="p-2">Title</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-2">{b.userId?.fullName || 'N/A'}</td>
                <td className="p-2">{b.workTitle}</td>
                <td className="p-2">{b.preferredDate}</td>
                <td className="p-2">{b.preferredTime}</td>
                <td className="p-2 font-semibold">{b.status}</td>
                <td className="p-2 space-x-2">
                  {b.status !== 'Accepted' && (
                    <button
                      onClick={() => updateStatus(b._id, 'Accepted')}
                      className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Accept
                    </button>
                  )}
                  {b.status !== 'Rejected' && (
                    <button
                      onClick={() => updateStatus(b._id, 'Rejected')}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Reject
                    </button>
                  )}
                  {b.status !== 'Completed' && (
                    <button
                      onClick={() => updateStatus(b._id, 'Completed')}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteBooking(b._id)}
                    className="text-gray-500 underline text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
)}

        {/* SERVICES */}
        {activeTab === 'services' && (
          <section className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Service Categories</h2>
            <form
              onSubmit={handleAddCategory}
              className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={handleCategoryChange}
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                name="icon"
                placeholder="Icon (optional)"
                value={newCategory.icon}
                onChange={handleCategoryChange}
                className="p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                + Add
              </button>
            </form>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Icon</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Workers</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => {
                  const workerCount = workers.filter((w) => w.category === cat.name).length;
                  return (
                    <tr key={cat._id} className="border-t">
                      <td className="p-2">{cat.icon || '—'}</td>
                      <td className="p-2">{cat.name}</td>
                      <td className="p-2">{workerCount}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDeleteCategory(cat._id)}
                          className="text-red-600 underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}
