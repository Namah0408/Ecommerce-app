import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  const { items, totalAmount, address } = req.body;

  try {
    const newOrder = new Order({
      userId: req.user.id,
      items,
      totalAmount,
      address,
      paymentStatus: "Paid",  // Simulating payment success
      paymentMethod,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Error fetching order", error: err.message });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "title price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all orders", error: err.message });
  }
};

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};
