import express from "express";
import {
  createOrder,
  getAllOrderUser,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/get-all-orders/:userId", getAllOrderUser);

export default router;
