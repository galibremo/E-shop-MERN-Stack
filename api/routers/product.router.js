import express from "express";
import { createProduct } from "../controllers/product.controller.js";
import { getAllProducts } from "../controllers/product.controller.js";
import { deleteShopProduct } from "../controllers/product.controller.js";
import { isSeller } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-product", createProduct);
router.get("/get-all-products-shop/:id", getAllProducts);
router.delete("/delete-shop-product/:id", isSeller, deleteShopProduct);

export default router;
