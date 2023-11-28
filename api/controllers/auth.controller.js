import User from "../models/user.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtToken.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) return next(errorHandler(404, "User already exists"));

    const user = {
      name: name,
      email: email,
      password: password,
    };
    //verify email
    const activationToken = jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const activation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return next(errorHandler(400,"Invalid token"));
    }
    const { name, email, password } = newUser;

    let user = await User.findOne({ email });

    if (user) {
      return next(errorHandler(400,"User already exists"));
    }
    user = await User.create({
      name,
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(errorHandler(500,error.message));
  }
});
