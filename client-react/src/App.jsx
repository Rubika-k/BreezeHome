
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Customer from "./pages/Customer/Dashboard.jsx";
import BookingForm from './pages/Customer/BookingForm';
import Admin from './pages/admin/Dashboard.JSX';  
import React, { useState } from 'react';

function App() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customer/dashboard" element={<Customer />} />
          <Route path="/admin/dashboard" element={<Admin />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
      <div>
        <button
          onClick={() => setIsSignupOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Open Signup
        </button>

        {isSignupOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="relative w-full max-w-md bg-white rounded shadow-lg">
              <button
                onClick={() => setIsSignupOpen(false)}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
              <Signup closeModal={() => setIsSignupOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
