import express from "express";
import { createShop, shopLogin } from "../controllers/shop.controller.js";
import { activation } from "../controllers/shop.controller.js";
import { getshop } from "../controllers/shop.controller.js";
import { isSeller } from "../middleware/auth.js";
import { logout } from "../controllers/shop.controller.js";
import { getShopInfo } from "../controllers/shop.controller.js";

const router = express.Router();

router.post("/create-shop", createShop);
router.post("/activation", activation);
router.post("/shop-login", shopLogin);
router.get("/getshop", isSeller, getshop);
router.get("/shop-logout", isSeller, logout);
router.get("/get-shop-info/:id", getShopInfo);

export default router;
