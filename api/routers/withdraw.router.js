import express from "express";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";
import {
  createWithdrawRequest,
  getAllWithdraw,
  updateWithdrawRequest,
} from "../controllers/withdraw.controller.js";

const router = express.Router();

router.post("/create-withdraw-request", isSeller, createWithdrawRequest);
router.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin("Admin"),
  getAllWithdraw
);
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  updateWithdrawRequest
);

export default router;
