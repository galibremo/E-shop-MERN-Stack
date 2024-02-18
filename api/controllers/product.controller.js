import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Product from "../models/product.model.js";
import Shop from "../models/shop.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";

export const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.body.shopId);
    if (!shop) {
      return next(errorHandler(400, "Shop not found!"));
    } else {
      const productData = req.body;
      productData.shop = shop;
      const product = await Product.create(productData);
      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    next(error);
  }
});

export const getAllProductsShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(errorHandler(400, error));
  }
});

export const deleteShopProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(errorHandler(404, "Product is not found with this id!"));
    }
    res.status(201).json({
      success: true,
      message: "Product Deleted successfully!",
    });
  } catch (error) {
    return next(errorHandler(400, error));
  }
});

export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(errorHandler(400, error));
  }
});
