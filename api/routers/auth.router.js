import express from "express";
import { activation, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/activation",activation);

export default router;