import express from "express";
import {
  createEvent,
  deleteShopEvent,
  getAllEvents,
} from "../controllers/event.controller.js";
import { isSeller } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-event", createEvent);
router.get("/get-all-evetns-shop/:id", getAllEvents);
router.delete("/delete-shop-event/:id", isSeller,deleteShopEvent);

export default router;
