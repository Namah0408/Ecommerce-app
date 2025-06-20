import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error loading orders:", err.message);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, currentStatus) => {
    const nextStatus =
      currentStatus === "Processing"
        ? "Shipped"
        : currentStatus === "Shipped"
        ? "Delivered"
        : null;

    if (!nextStatus) return alert("Order is already delivered.");

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/orders/${orderId}`,
        { status: nextStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: nextStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err.message);
      alert("Error updating order status.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">All Orders (Admin)</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-400">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-gray-800 p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                  <p><span className="font-semibold">User ID:</span> {order.userId}</p>
                  <p><span className="font-semibold">Address:</span> {order.address}</p>
                  <p><span className="font-semibold">Total:</span> ₹{order.totalAmount}</p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="text-yellow-400">{order.status}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleStatusUpdate(order._id, order.status)}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                >
                  Next Status
                </button>
              </div>

              <div>
                <span className="font-semibold">Items:</span>
                <ul className="list-disc ml-6 mt-1 text-sm">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.productId.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;