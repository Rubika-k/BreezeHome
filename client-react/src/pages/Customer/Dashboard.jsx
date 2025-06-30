import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

export default function Customer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('browse');
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);

  const stats = [
    { label: 'Total Bookings', value: bookings.length, sub: '1 completed', icon: '📅' },
    { label: 'Active Bookings', value: bookings.filter(b => b.status !== 'completed').length, sub: 'In progress or pending', icon: '⏱️' },
    { label: 'Total Spent', value: 'Rs.0', sub: 'This year', icon: '💳' },
    { label: 'Favorite Workers', value: 0, sub: 'Saved for quick booking', icon: '❤️' },
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

  useEffect(() => {
    setServices(servicesSample);

    const fetchMyBookings = async () => {
      try {
        const res = await axios.get('/api/my-bookings'); // Pass token in header if required
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings", err);
      }
    };
    fetchMyBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-red-500" id="customer/dashboard">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-1 text-white">Welcome back, Aathavan!</h1>
        <p className="text-gray-200 mb-6">Manage your bookings and discover new services</p>

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

        <nav className="bg-white rounded-md shadow mb-6">
          <ul className="flex">                                                         
            {/* , 'favorites', 'history', 'profile' */}
            {['browse', 'bookings'].map(key => (
              <li
                key={key}
                onClick={() => setActiveTab(key)}
                className={`cursor-pointer px-4 py-2 flex-1 text-center ${activeTab === key ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </li>
            ))}
          </ul>
        </nav>

        {activeTab === 'browse' && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Available Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((svc, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold">{svc.name}</h3>
                  <p className="text-sm text-gray-500">{svc.desc}</p>
                  <button
                    className="mt-4 bg-red-500 text-white py-2 rounded hover:bg-blue-500 transition w-full"
                    onClick={() => navigate('/booking')}
                  >
                    + Book Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'bookings' && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
            <div>
              {bookings.length === 0 ? (
                <p className="text-gray-500">No bookings yet.</p>
              ) : (
                bookings.map(booking => (
                  <div key={booking._id || booking.id} className="border-l-4 border-blue-600 p-4 mb-4">
                    <h3 className="font-semibold">{booking.serviceName}</h3>
                    <p>📍 {booking.address}</p>
                    <p>📅 {booking.date}, ⏰ {booking.time}</p>
                    <p>{booking.description}</p>
                    <div className="mt-2 text-sm">
                      {booking.worker ? `${booking.worker.name} (${booking.worker.role})` : 'Worker not assigned'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
