import React, { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-300">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 p-4 rounded shadow text-sm sm:text-base"
            >
              <div className="mb-2">
                <span className="font-semibold">Order ID:</span> {order._id}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Address:</span> {order.address}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </div>

              <div className="mb-2">
                <span className="font-semibold">Items:</span>
                <ul className="list-disc list-inside pl-4">
                  {order.items.map((item) => (
                    <li key={item.productId._id}>
                      {item.productId.name} × {item.quantity} — ₹
                      {item.productId.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between mt-2">
                <span className="font-bold">Total: ₹{order.totalAmount}</span>
                <span
                  className={`font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-400"
                      : order.status === "Shipped"
                      ? "text-yellow-400"
                      : "text-blue-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-right text-sm text-gray-400">
                Payment: {order.paymentStatus}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;