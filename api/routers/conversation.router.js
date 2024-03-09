import express from "express";
import {
  createNewConversation,
  getAllConversationSeller,
  getAllConversationUser,
  updateLastMessage,
} from "../controllers/conversation.controller.js";
import { isAuthenticated, isSeller } from "../middleware/auth.js";

const router = express.Router();

router.post("/create-new-conversation", createNewConversation);
router.get(
  "/get-all-conversation-seller/:id",
  isSeller,
  getAllConversationSeller
);
router.get(
  "/get-all-conversation-user/:id",
  isAuthenticated,
  getAllConversationUser
);
router.put("/update-last-message/:id", updateLastMessage);

export default router;
