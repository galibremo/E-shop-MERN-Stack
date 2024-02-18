import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Shop from "../models/shop.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import Coupon from "../models/coupons.model.js";

export const createCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    const isCoupounCodeExists = await Coupon.find({
      name: req.body.name,
    });

    if (isCoupounCodeExists.length !== 0) {
      return next(errorHandler(400, "Coupoun code already exists!"));
    }

    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      coupon,
    });
  } catch (error) {
    return next(errorHandler(400, error));
  }
});

export const getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  try {
    const coupons = await Coupon.find({ shopId: req.shop.id });
    res.status(201).json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.log(error);
    return next(errorHandler(400, error));

  }
});

export const deleteShopCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCode = await Coupon.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      return next(errorHandler(400, "Coupon code dosen't exists!"));
    }
    res.status(201).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  } catch (error) {
    return next(errorHandler(400, error));
  }
});
