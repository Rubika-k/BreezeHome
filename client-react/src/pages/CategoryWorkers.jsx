import React, { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiCalendar } from "react-icons/fi";

export default function CategoryWorkers() {
  const location = useLocation();
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCategory(params.get("/categories") || "");
  }, [location.search]);

  const fetchWorkers = async () => {
    try {
      if (!category) {
        setWorkers([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `/workers/category?category=${encodeURIComponent(category)}`
      );
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid data format received");
      }
      setWorkers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load workers. Please try again.");
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, [category]);

  const filteredWorkers = workers.filter((w) =>
    w.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading workers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
          <h3 className="text-xl font-bold mb-2 text-red-600">Error</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* Back & Heading */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline flex items-center"
          >
            <FiArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            {category} Professionals
          </h1>
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search workers by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Workers List */}
        {filteredWorkers.length > 0 ? (
          <div className="space-y-6">
            {filteredWorkers.map((worker) => (
              <div
                key={worker._id}
                className="flex flex-col md:flex-row bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden transition cursor-pointer"
              >
                {/* Left: Worker Image */}
                <div className="md:w-2/5 h-56 md:h-auto flex-shrink-0">
                  {worker.profilePicture ? (
                    <img
                      src={worker.profilePicture}
                      alt={worker.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-6xl text-blue-600">
                      {worker.fullName?.[0] || "?"}
                    </div>
                  )}
                </div>

                {/* Right: Details */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-1 text-blue-800">
                    {worker.fullName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Category: <span className="font-medium">{worker.category?.name || worker.category || "-"}</span>
                  </p>
                  <p className="text-gray-700 mb-1 line-clamp-2">
                    {worker.bio || "No description available"}
                  </p>
                  <p className="text-gray-600 mb-1">
                    Experience: {worker.experience || 0} years
                  </p>

                  {worker.isAvailable ? (
                    <p className="flex items-center text-green-600 mb-2">
                      <FiCheckCircle className="mr-1" /> Available
                    </p>
                  ) : (
                    <div className="text-gray-500 flex items-center text-sm mb-2">
                      <FiXCircle className="mr-1" />
                      Not Available
                      {worker.nextAvailableTime && (
                        <span className="ml-4 flex items-center">
                          <FiCalendar className="mr-1" />
                          Next: {new Date(worker.nextAvailableTime).toLocaleString()}
                        </span>
                      )}
                    </div>
                  )}

                  <button
                    disabled={!worker.isAvailable}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/booking?workerId=${worker._id}`);
                    }}
                    className={`self-start mt-2 px-5 py-2 rounded-full font-semibold transition ${
                      worker.isAvailable
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {worker.isAvailable ? "Book Now" : "Not Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-12">
            <p>No workers found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
