import express from "express";
import {
  createCoupon,
  getAllCoupons,
  deleteShopCoupon,
} from "../controllers/coupon.controller.js";
import { isSeller } from "../middleware/auth.js";
import { getCouponValue } from "../controllers/coupon.controller.js";

const router = express.Router();

router.post("/create-coupon-code", isSeller, createCoupon);
router.get("/get-all-coupon-shop/:id", isSeller, getAllCoupons);
router.get("/get-coupon-value/:name", getCouponValue);
router.delete("/delete-shop-coupon/:id", isSeller, deleteShopCoupon);

export default router;
