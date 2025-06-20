import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">E-Shop</h2>
          <p className="text-sm">
            Your go-to platform for amazing products, smooth shopping, and quick delivery.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
            <li><a href="/orders" className="hover:text-white">My Orders</a></li>
            <li><a href="/admin/orders" className="hover:text-white">Admin</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
          <ul className="space-y-1">
            <li>Email: support@eshop.com</li>
            <li>Phone: +91 12345 67890</li>
            <li>Location: India</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} E-Shop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;