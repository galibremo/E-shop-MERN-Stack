import express from "express";
import {
  createNewReview,
  createProduct,
} from "../controllers/product.controller.js";
import { getAllProductsShop } from "../controllers/product.controller.js";
import { getAllProducts } from "../controllers/product.controller.js";
import { deleteShopProduct } from "../controllers/product.controller.js";
import { isAuthenticated, isSeller } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-product", createProduct);
router.get("/get-all-products-shop/:id", getAllProductsShop);
router.delete("/delete-shop-product/:id", isSeller, deleteShopProduct);
router.get("/get-all-products", getAllProducts);
router.put("/create-new-review", isAuthenticated, createNewReview);

export default router;
