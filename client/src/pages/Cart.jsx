import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Cart response:", res.data);
        setCartItems(res.data.items);
      } catch (err) {
        console.error("Failed to load cart:", err.message);
        setCartItems([]);
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

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(cartItems.filter((item) => item.productId._id !== productId));
    } catch (err) {
      console.error("Remove failed:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-300">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded shadow"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.productId.name}</h2>
                  <p className="text-gray-400">
                    ₹{item.productId.price} × {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(item.productId._id)}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xl font-bold text-right">
            Total: ₹{total}
          </div>

          <div className="mt-4 text-right">
            <button
              onClick={() => (window.location.href = "/checkout")}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded font-bold"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;