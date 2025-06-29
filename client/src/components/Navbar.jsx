import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successful");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow">
      <Link to="/" className="text-2xl font-bold">
        🛍️ Namo-Shop
      </Link>

      <div className="space-x-4">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        {token && !isAdmin && <Link to="/cart" className="hover:text-yellow-400">Cart</Link>}
        {token && !isAdmin && <Link to="/orders" className="hover:text-yellow-400">My Orders</Link>}
        {isAdmin && <Link to="/admin/orders" className="hover:text-yellow-400">Admin</Link>}
        {isAdmin && <Link to="/admin/add-product" className="hover:text-yellow-400">Products</Link>}
        {!token && <Link to="/login" className="hover:text-yellow-400">Login</Link>}
        {!token && <Link to="/signup" className="hover:text-yellow-400">Signup</Link>}
        {token && (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
