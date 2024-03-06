import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Product from "../models/product.model.js";
import Shop from "../models/shop.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import Order from "../models/order.model.js";

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

export const createNewReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { currentUser, rating, comment, productId, orderId } = req.body;

    const product = await Product.findById(productId);

    const review = {
      user: currentUser,
      rating,
      comment,
      productId,
    };

    const isReviewed = product.reviews.find(
      (rev) => rev.currentUser._id === req.user._id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.currentUser._id === req.user._id) {
          (rev.rating = rating),
            (rev.comment = comment),
            (rev.user = currentUser);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          "cart.$[elem].isReviewed": true,
          "cart.$[elem].reviews": review,
        },
      },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: "Reviwed succesfully!",
    });
  } catch (error) {
    return next(errorHandler(400, error));
  }
});
