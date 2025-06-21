import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    _id: null,
    title: "",
    price: "",
    description: "",
    stock: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("stock", form.stock);
      if (form.image) {
        formData.append("image", form.image);
      }

      let res;

      if (isEditing && form._id) {
        // Updating an existing product
        res = await axios.put(
          `${import.meta.env.VITE_API_URL}/products/${form._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setMessage("✅ Product updated successfully!");
      } else {
        // Creating a new product
        res = await axios.post(
          `${import.meta.env.VITE_API_URL}/products`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setMessage("✅ Product added successfully!");
      }

      // Reset form and refresh
      setForm({
        _id: null,
        title: "",
        price: "",
        description: "",
        stock: "",
        image: "",
      });
      setIsEditing(false);
      fetchProducts();
    } catch (err) {
      console.error("Save failed:", err.message);
      setMessage("❌ Error saving product.");
    }
  };


  // Edit product
  const handleEdit = (product) => {
    setForm({
      _id: product._id || null,
      title: product.title || "",
      price: product.price || "",
      description: product.description || "",
      stock: product.stock || "",
      image: "", // Leave file input blank, we don't re-load images in file inputs
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  // Delete product
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err.message);
      setMessage("❌ Failed to delete product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-4">
        {isEditing ? "Edit Product" : "Add New Product"}
      </h2>

      {message && <p className="mb-4 text-yellow-400">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow max-w-lg mb-10"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          required
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-4">All Products</h3>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-800 p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h4 className="text-xl font-bold">{product.title}</h4>
              <p className="text-green-400 font-semibold">₹{product.price}</p>
              <p className="text-gray-400 text-sm mb-2">{product.stock} in stock</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;