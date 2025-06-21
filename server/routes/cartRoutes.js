import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.use(authMiddleware); // Protect all cart routes

router.post("/add", addToCart);
router.get("/", getCart);
router.delete("/:productId", removeFromCart);

export default router;