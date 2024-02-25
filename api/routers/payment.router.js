import express from "express";
import { paymentProcess } from "../controllers/payment.controller.js";
import { stripeApiKey } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/process", paymentProcess);
router.get("/stripe-api-key", stripeApiKey);

export default router;
