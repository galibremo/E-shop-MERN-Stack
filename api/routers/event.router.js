import express from "express";
import {
  createEvent,
  deleteShopEvent,
  getAllEventsShop,
  getAllEvents,
  adminGetAllEvents,
} from "../controllers/event.controller.js";
import { isAdmin, isAuthenticated, isSeller } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-event", createEvent);
router.get("/get-all-evetns-shop/:id", getAllEventsShop);
router.get("/get-all-evetns", getAllEvents);
router.get(
  "/admin-all-evetns",
  isAuthenticated,
  isAdmin("Admin"),
  adminGetAllEvents
);
router.delete("/delete-shop-event/:id", isSeller, deleteShopEvent);

export default router;
