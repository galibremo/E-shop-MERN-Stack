import express from "express";
import {
  adminAllSeller,
  createShop,
  deleteWithdrawMethod,
  shopLogin,
  updatePaymentMethodes,
  updateShopInfo,
} from "../controllers/shop.controller.js";
import { activation } from "../controllers/shop.controller.js";
import { getshop } from "../controllers/shop.controller.js";
import { isSeller } from "../middleware/auth.js";
import { logout } from "../controllers/shop.controller.js";
import { getShopInfo } from "../controllers/shop.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-shop", createShop);
router.post("/activation", activation);
router.post("/shop-login", shopLogin);
router.get("/getshop", isSeller, getshop);
router.put("/update-shop-info/:id", isSeller, updateShopInfo);
router.get("/shop-logout", isSeller, logout);
router.get("/get-shop-info/:id", getShopInfo);
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  adminAllSeller
);
router.put("/update-payment-methods", isSeller, updatePaymentMethodes);
router.delete("/delete-withdraw-method/", isSeller, deleteWithdrawMethod);

export default router;
