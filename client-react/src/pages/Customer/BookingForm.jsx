import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const [form, setForm] = useState({
    workTitle: '',
    description: '',
    serviceLocation: '',
    preferredDate: '',
    preferredTime: '',
    estimatedHours: '',
    urgency: 'normal',
    paymentOption: 'cash',
  });

  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // ✅ Get userId from localStorage or your auth context
    const userId = localStorage.getItem('userId'); // Replace with your auth logic

    if (!userId) {
      setMessage('User not logged in. Please log in first.');
      return;
    }

    // ✅ Hardcode or select the workerId (replace this with actual selected worker!)
    const workerId = 'REPLACE_WITH_ACTUAL_WORKER_ID';

    try {
      await axios.post('/api/bookings', {
        ...form,
        userId,
        workerId,
      });
      setShowModal(true); // Show confirmation modal
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking creation failed');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/'); // Redirect to home after closing modal
  };

  return (
    <div className="min-h-screen  flex flex-col bg-cover bg-center bg-no-repeat">
      <Navbar />
      <main id="BookingForm" className="flex-grow container mx-auto py-10 px-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">Book a Service</h1>
        {message && (
          <div className="mb-4 text-center text-red-600 font-semibold">
            {message}
          </div>
        )}
        <form
          className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="workTitle"
            placeholder="Work Title"
            className="w-full border p-2 rounded"
            required
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded h-24"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="serviceLocation"
            placeholder="Service Location"
            className="w-full border p-2 rounded"
            required
            onChange={handleChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="preferredDate"
              className="w-full border p-2 rounded"
              required
              onChange={handleChange}
            />
            <input
              type="time"
              name="preferredTime"
              className="w-full border p-2 rounded"
              required
              onChange={handleChange}
            />
          </div>
          <input
            type="number"
            name="estimatedHours"
            placeholder="Estimated Hours"
            className="w-full border p-2 rounded"
            required
            onChange={handleChange}
          />
          <select
            name="urgency"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
          </select>
          <select
            name="paymentOption"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="cash">Cash Payment on Completion</option>
            <option value="online">Pay Now (Online)</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Booking
          </button>
        </form>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
              <h2 className="text-xl font-semibold mb-4">Booking Confirmed!</h2>
              <p className="mb-4">Your booking has been successfully created.</p>
              <button
                onClick={handleCloseModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BookingForm;
