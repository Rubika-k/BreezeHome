import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="text-3xl font-bold text-gray-800">
        <span className="text-black">Con</span>
        <span className="text-red-500">nect</span>
        <span className="text-blue-500">ing</span>
      </div>
      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <li><a href="#">Services</a></li>
        <li><a href="#">How It Works</a></li>
        <li><a href="#">Professionals</a></li>
        <li><a href="#">Testimonials</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div className="flex gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</button>
        <button className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition">Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
