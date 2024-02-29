import express from "express";
import {
  createOrder,
  getAllOrderUser,
  getSellerAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { isSeller } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/get-all-orders/:userId", getAllOrderUser);
router.get("/get-seller-all-orders/:shopId", getSellerAllOrders);
router.put("/update-order-status/:id", isSeller, updateOrderStatus);

export default router;
