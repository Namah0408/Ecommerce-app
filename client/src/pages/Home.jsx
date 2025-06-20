import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">🛍️ Explore Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className="bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-yellow-400 font-bold">₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;