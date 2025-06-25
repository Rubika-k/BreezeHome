import React, { useState } from 'react';
import axios from '../../axiosConfig'; 

const Signup = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        {message && <div className="text-red-600 mb-4 text-sm text-center">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="address" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="w-full p-2 border rounded" required />
          <select name="role" onChange={handleChange} className="w-full p-2 border rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
