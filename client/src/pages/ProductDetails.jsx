import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
      }
    };

    fetchProduct();

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsAdmin(decoded.isAdmin || false);
      } catch (err) {
        console.error("Failed to decode token:", err.message);
      }
    }
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/add`,
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Successfully added to Cart");
      // navigate("/cart");
    } catch (err) {
      console.error("❌ Failed to add to cart:", err.response?.data || err.message);
    }
  };

  if (!product) return <p className="text-center text-white mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-10">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.title}
          className="w-full h-auto object-cover rounded-lg shadow"
        />

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-yellow-400 text-xl font-semibold mb-3">₹{product.price}</p>
          <p className="text-gray-300 mb-6">{product.description}</p>

          {!isAdmin && (
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 cursor-pointer transition"
            >
              Add to Cart 🛒
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;