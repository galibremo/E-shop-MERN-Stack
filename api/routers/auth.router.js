import express from "express";
import { activation, forgetpassword, getuser, resetpassword, signin, signup, logout } from "../controllers/auth.controller.js";
import {isAuthenticated} from "../middleware/auth.js" ;

const router = express.Router();

router.post("/signup",signup);
router.post("/activation",activation);
router.post("/forgetpassword",forgetpassword);
router.post("/resetpassword/:id/:token",resetpassword);
router.post("/signin",signin);
router.get("/getuser",isAuthenticated,getuser);
router.get("/logout",isAuthenticated,logout);

export default router;