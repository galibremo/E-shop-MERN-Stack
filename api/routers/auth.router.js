import express from "express";
import {
  activation,
  forgetpassword,
  getuser,
  resetpassword,
  signin,
  signup,
  logout,
  updateUserInfo,
  updateUserPassword,
  updateUserAddress,
  deleteUserAddress,
  getUserInfoWithId,
  adminGetAllUser,
  adminDeleteUser,
} from "../controllers/auth.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/activation", activation);
router.post("/forgetpassword", forgetpassword);
router.post("/resetpassword/:id/:token", resetpassword);
router.post("/signin", signin);
router.get("/getuser", isAuthenticated, getuser);
router.get("/logout", isAuthenticated, logout);
router.put("/update-user-info/:id", isAuthenticated, updateUserInfo);
router.put("/update-user-password/:id", isAuthenticated, updateUserPassword);
router.put("/update-user-address", isAuthenticated, updateUserAddress);
router.delete("/delete-user-address/:id", isAuthenticated, deleteUserAddress);
router.get("/user-info/:id", getUserInfoWithId);
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  adminGetAllUser
);
router.delete(
  "/admin-delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  adminDeleteUser
);

export default router;
