import React, { useState } from "react";
// import axios from "../api/axiosInstance";
import Loader from "../Components/Loader";
import axios from "axios";

const OrderHistory = () => {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!phone || !/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError("");
    setOrders([]);

    try {
<<<<<<< HEAD
      const response = await axios.get(`https://digital-dinner-new.onrender.com/api/order?phone=${phone}`);
=======
      const response = await axios.get(`http://localhost:5003/api/order?phone=${phone}`);
>>>>>>> 173f299 (code added)

      if (response.data.length > 0) {
        setOrders(response.data);
      } else {
        setError("No orders found for this phone number.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  
    if (loading) return <Loader/>;
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Order History
      </h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter phone number"
        />
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        className={`w-full ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-600"
        } text-white py-3 rounded-lg text-lg font-semibold transition`}
      >
        {loading ? "Searching..." : "Search Orders"}
      </button>

      {error && (
        <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
      )}

      <div className="mt-8">
        {orders.length > 0 &&
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-6 mb-6 shadow-xl rounded-lg transition duration-300 hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {order.name}
              </h3>
              <p className="text-gray-600 text-sm mb-1">
                Total:{" "}
                <span className="font-semibold text-green-600">
                  ₹{order.totalAmount}
                </span>
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Date:{" "}
                {new Date(order.createdAt).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })}
              </p>

              <div className="mt-4">
                <h4 className="text-md font-semibold text-gray-700">
                  Cart Items:
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-gray-600 text-sm">
                      {item.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderHistory;
