import express from "express";
import {
  createNewMessage,
  getAllMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/create-new-message", createNewMessage);
router.get("/get-all-message/:id", getAllMessages);

export default router;
