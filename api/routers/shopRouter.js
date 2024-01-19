import express from "express";
import {createShop, shopLogin} from "../controllers/shop.controller.js";
import {activation} from "../controllers/shop.controller.js";
import { getshop } from "../controllers/shop.controller.js";
import {isSeller} from "../middleware/auth.js" ;

const router = express.Router();

router.post("/create-shop", createShop);
router.post("/activation", activation);
router.post("/shop-login", shopLogin);
router.get("/getshop",isSeller,getshop);


export default router;
