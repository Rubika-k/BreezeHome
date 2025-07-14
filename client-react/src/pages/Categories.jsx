import React, { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("categories").then((res) => setCategories(res.data || []));
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-12 animate-fadein">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-8 text-blue-700 text-center drop-shadow animate-slidein">
          Service Categories
        </h2>

        {/* Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories by name..."
              className="w-full px-6 py-4 rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-5 top-4 h-6 w-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-8">
          {filteredCategories.map((cat, idx) => (
            <div
              key={cat._id}
              className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group animate-pop"
              style={{ animationDelay: `${idx * 0.08}s` }}
              onClick={() =>
                navigate(
                  `/categories/${cat._id}?category=${encodeURIComponent(
                    cat.name
                  )}`
                )
              }
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Image */}
                <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-6xl">{cat.icon || "🔧"}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/30"></div>
                </div>

                {/* Right Side - Content */}
                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                  <div>
                    {/* Category Name */}
                    <h3 className="font-bold text-3xl mb-3 text-blue-800 group-hover:text-blue-600 transition">
                      {cat.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 text-lg">
                      {cat.description || "No description available"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Workers count */}
                    <p className="text-blue-700 font-medium">
                      {cat.workersCount || 0} workers available
                    </p>

                    {/* View Workers button */}
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md font-semibold transition transform hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/categories/${cat._id}?category=${encodeURIComponent(
                            cat.name
                          )}`
                        );
                      }}
                    >
                      View Workers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fadein { animation: fadein 1s; }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }

        .animate-slidein { animation: slidein 0.8s; }
        @keyframes slidein { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .animate-pop { animation: pop 0.5s forwards; }
        @keyframes pop { 
          0% { transform: scale(0.7); opacity: 0; } 
          80% { transform: scale(1.05); opacity: 1; } 
          100% { transform: scale(1); } 
        }
      `}</style>
    </div>
  );
}