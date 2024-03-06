import express from "express";
import {
  acceptRefund,
  createOrder,
  getAllOrderUser,
  getSellerAllOrders,
  refundOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { isSeller } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/get-all-orders/:userId", getAllOrderUser);
router.get("/get-seller-all-orders/:shopId", getSellerAllOrders);
router.put("/update-order-status/:id", isSeller, updateOrderStatus);
router.put("/order-refund/:id", refundOrder);
router.put("/order-refund-success/:id", isSeller, acceptRefund);

export default router;
