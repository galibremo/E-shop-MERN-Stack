import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export const paymentProcess = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    description: "Software development services",
    shipping: {
      name: "Jenny Rosen",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "galib's farm",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

export const stripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
