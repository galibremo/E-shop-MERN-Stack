import express from "express";
import { activation, forgetpassword, resetpassword, signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/activation",activation);
router.post("/forgetpassword",forgetpassword);
router.post("/resetpassword/:id/:token",resetpassword);
router.post("/signin",signin);

export default router;