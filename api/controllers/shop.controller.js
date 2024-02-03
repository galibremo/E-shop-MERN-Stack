import Shop from "../models/shop.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendShopToken from "../utils/shopToken.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import bcryptjs from "bcryptjs";

export const createShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const seller = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = jwt.sign(seller, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;
    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        message: `Hello ${seller.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your account!`,
      });
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
});

export const activation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newSeller = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET
    );

    if (!newSeller) {
      return next(errorHandler(400, "Invalid token"));
    }

    const { name, email, password, phoneNumber, address, zipCode } = newSeller;

    let shop = await Shop.findOne({ email });

    if (shop) {
      return next(errorHandler(400, "Shop already exists"));
    }
    shop = await Shop.create({
      name,
      email,
      password,
      phoneNumber,
      address,
      zipCode,
    });
    sendShopToken(shop, 201, res);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
});
export const shopLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await Shop.findOne({ email }).select("+password");
    if (!validUser) return next(errorHandler(404, "Shop not found!"));
    const validPassword = await validUser.comparePassword(password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    sendShopToken(validUser, 200, res);
  } catch (error) {
    next(error);
  }
};
export const getshop = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.shop.id);
    if (!shop) return next(errorHandler(404, "Shop doesn't exists"));
    res.status(200).json({
      success: true,
      shop: shop,
    });
  } catch (error) {
    next(error.message);
  }
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  try {
    res.clearCookie("seller_token");
    res.status(200).json("shop has been logged out!");
  } catch (error) {
    next(error);
  }
});