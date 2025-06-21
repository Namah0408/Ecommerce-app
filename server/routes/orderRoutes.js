import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.use(authMiddleware); // All order routes are protected

// User routes
router.post("/", placeOrder);
router.get("/", getUserOrders);
router.get("/:id", getOrderById);

// Admin routes
router.get("/admin/all",authMiddleware, adminMiddleware, getAllOrders);
router.put("/admin/status/:id",authMiddleware, adminMiddleware, updateOrderStatus);

export default router;