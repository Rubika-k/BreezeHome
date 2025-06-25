import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import axios from '../../axiosConfig';

const stats = [
  { label: 'Total Bookings', value: 3, sub: '1 completed', icon: '📅' },
  { label: 'Active Bookings', value: 2, sub: 'In progress or pending', icon: '⏱️' },
  { label: 'Total Spent', value: '₹3,500', sub: 'This year', icon: '💳' },
  { label: 'Favorite Workers', value: 2, sub: 'Saved for quick booking', icon: '❤️' },
];

const servicesSample = [
  {  
    name: 'Electrician',
    desc: 'Electrical repairs and installations',
    rating: 4.8,
    workers: 45,
    price: 500,
  },
  {
    name: 'Plumber',
    desc: 'Plumbing services and repairs',
    rating: 4.7,
    workers: 38,
    price: 400,
  },
  {
    name: 'House Cleaning',
    desc: 'Professional house cleaning services',
    rating: 4.9,
    workers: 62,
    price: 800,
  }
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('browse'); // browse | bookings | favorites | history | profile
  const [services, setServices] = useState([]);

  useEffect(() => {
    // TODO: fetch your real services
    // axios.get('/api/services').then(r => setServices(r.data));
    setServices(servicesSample);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome + Stats */}
        <h1 className="text-2xl font-semibold mb-1">Welcome back, Sarah Johnson!</h1>
        <p className="text-gray-600 mb-6">Manage your bookings and discover new services</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="text-3xl mr-4">{s.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <nav className="bg-white rounded-md shadow mb-6">
          <ul className="flex">
            {[
              ['browse', 'Browse Services'],
              ['bookings', 'My Bookings'],
              ['favorites', 'Favorites'],
              ['history', 'History'],
              ['profile', 'Profile'],
            ].map(([key, label]) => (
              <li
                key={key}
                onClick={() => setActiveTab(key)}
                className={
                  'cursor-pointer px-4 py-2 flex-1 text-center ' +
                  (activeTab === key
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100')
                }
              >
                {label}
              </li>
            ))}
          </ul>
        </nav>

       
        {activeTab === 'browse' && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Available Services</h2>

            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                placeholder="Search services…"
                className="border px-3 py-2 rounded w-1/3"
              />
              <button className="bg-white border px-4 py-2 rounded hover:bg-gray-100">
                Filter
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((svc, i) => (
                <div key={i} className="border rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center mb-3">
                     
                      ⚙️
                    </div>
                    <h3 className="text-lg font-semibold">{svc.name}</h3>
                    <p className="text-gray-500 text-sm">{svc.desc}</p>
                    <div className="flex items-center text-sm text-gray-700 mt-2">
                      ⭐ {svc.rating}&nbsp;&nbsp;|&nbsp;&nbsp;{svc.workers} workers
                    </div>
                    <div className="mt-2 text-green-600 font-bold">
                      Starting from ₹{svc.price}
                    </div>
                  </div>
                  <button className="mt-4 bg-black text-white py-2 rounded hover:opacity-90">
                    + Book Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
// inside AdminDashboard.jsx, below the browse panel
{activeTab === 'bookings' && (
  <section className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
    <p className="text-gray-600 mb-6">Track your current and upcoming service bookings</p>

    <div className="space-y-4">
      {[
        {
          id: 1,
          title: 'Electrical Wiring Repair',
          address: '123 Main St, Downtown',
          date: '2024-01-15',
          time: '10:00 AM',
          price: 1500,
          description: 'Fix faulty wiring in kitchen area. Urgent repair needed.',
          worker: { name: 'John Smith', role: 'Electrician' },
          status: 'in progress',
          paid: true
        },
        {
          id: 2,
          title: 'House Deep Cleaning',
          address: '456 Oak Ave, Suburbs',
          date: '2024-01-12',
          time: '2:00 PM',
          price: 2000,
          description: '3 bedroom house needs deep cleaning before guests arrive.',
          worker: { name: 'Maria Garcia', role: 'House Cleaning' },
          status: 'completed',
          paid: true
        },
        {
          id: 3,
          title: 'Plumbing Leak Fix',
          address: '789 Pine St, City Center',
          date: '2024-01-20',
          time: '9:00 AM',
          price: 800,
          description: 'Kitchen sink has a persistent leak that needs immediate attention.',
          worker: null, // not assigned yet
          status: 'pending',
          paid: false
        }
      ].map((booking) => (
        <div
          key={booking.id}
          className="border-l-4 border-blue-600 rounded-r-lg bg-white p-4 flex flex-col lg:flex-row lg:items-center justify-between"
        >
          {/* Left: booking details */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{booking.title}</h3>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <span>📍</span>{booking.address}
            </p>
            <div className="flex items-center text-gray-600 text-sm gap-4 my-2">
              <span>📅 {booking.date}</span>
              <span>⏰ {booking.time}</span>
            </div>
            <p className="text-gray-700 text-sm mb-2">{booking.description}</p>

            {booking.worker ? (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {/* avatar placeholder */}
                  {booking.worker.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{booking.worker.name}</p>
                  <p className="text-gray-500">{booking.worker.role}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Worker not assigned yet</p>
            )}
          </div>

          {/* Right: price & actions */}
          <div className="mt-4 lg:mt-0 lg:ml-6 text-right space-y-2">
            <p className="text-lg font-semibold">₹{booking.price}</p>
            <div className="flex flex-wrap justify-end gap-2">
              {/* Call */}
              <button className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
                📞 Call
              </button>
              {/* Message */}
              <button className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
                💬 Message
              </button>
              {/* Conditional action */}
              {booking.status === 'completed' && booking.paid && (
                <button className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100">
                  ⭐ Rate Service
                </button>
              )}
              {booking.status === 'pending' && !booking.paid && (
                <button className="px-3 py-1 border rounded text-red-600 hover:bg-gray-100">
                  Cancel Booking
                </button>
              )}
            </div>
            {/* Status badges */}
            <div className="flex flex-wrap justify-end gap-2 mt-1">
              <span
                className={`text-xs px-2 py-0.5 rounded-full uppercase ${
                  booking.status === 'in progress'
                    ? 'bg-purple-100 text-purple-600'
                    : booking.status === 'completed'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {booking.status}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full uppercase ${
                  booking.paid ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {booking.paid ? 'paid' : 'pending'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)}
