import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your product name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter your product description!"],
    },
    category: {
      type: String,
      required: [true, "Please enter your product category!"],
    },
    tags: {
      type: String,
    },
    originalPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
      required: [true, "Please enter your product price!"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter your product stock!"],
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    reviews: [
      {
        user: {
          type: Object,
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
        productId: {
          type: String,
        },
        createdAt:{
          type: Date,
          default: Date.now(),
        }
      },
    ],
    ratings: {
      type: Number,
    },
    shopId: {
      type: String,
      required: true,
    },
    shop: {
      type: Object,
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
