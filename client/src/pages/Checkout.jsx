import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data.items);
      } catch (err) {
        console.error("Error fetching cart:", err.message);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    try {
      const items = cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        { items, totalAmount: total, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Order failed:", err.message);
      alert("Order placement failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold">Shipping Address</label>
        <textarea
          rows="3"
          className="w-full p-3 text-black rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
      </div>

      <div className="bg-gray-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.productId._id} className="flex justify-between mb-2">
            <span>{item.productId.name} × {item.quantity}</span>
            <span>₹{item.productId.price * item.quantity}</span>
          </div>
        ))}
        <hr className="my-2 border-gray-600" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded text-black font-bold"
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;