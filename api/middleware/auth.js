import { errorHandler } from "../utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Shop from "../models/shop.model.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return errorHandler(401, "Please login to continue");
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
  } catch (err) {
    next(err);
  }
  next();
});
export const isSeller = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return errorHandler(401, "Please login to continue");
  }

  try {
    const decoded = await jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    req.shop = await Shop.findById(decoded.id);
  } catch (err) {
    next(err);
  }
  next();
});
