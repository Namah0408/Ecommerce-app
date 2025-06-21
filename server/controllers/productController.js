import Product from "../models/Product.js";

// @desc    Create a new product (Admin only)
export const createProduct = async (req, res) => {
  try {
    const { title, price, description, stock} = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = req.file && req.file.path ? req.file.path : "https://via.placeholder.com/150";

    const product = new Product({
      title,
      price,
      description,
      stock,
      image: imageUrl,
    });

    await product.save();

    console.log("✅ Product saved:", product);
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error("Message:", err.message);
  }
};

// @desc    Get all products (Public)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// @desc    Get product by ID (Public)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};

// @desc    Update product by ID (Admin only)
export const updateProduct = async (req, res) => {
  try {
    const { title, price, description, stock } = req.body;

    const updatedFields = {
      title,
      price,
      description,
      stock,
    };

    // If a new image was uploaded, add its path
    if (req.file) {
      updatedFields.image = req.file.path;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", product: updated });
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};


// @desc    Delete product by ID (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};