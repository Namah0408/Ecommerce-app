import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  address: { type: String, required: true },
  status: { type: String, default: "Processing" }, // e.g., Processing, Shipped, Delivered
  paymentStatus: { type: String, default: "Pending" }, // Pending, Paid
  paymentMethod: { type: String, default: "COD" },     // COD, UPI, Card, etc.
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;