import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export const paymentProcess = catchAsyncErrors(async (req, res, next) => {
  const customer = await stripe.customers.create({
    email: req.body.email,
    name: req.body.name,
    address: req.body.address,
  });

  const myPayment = await stripe.paymentIntents.create({
    customer: customer.id,
    description: process.env.STRIPE_API_KEY,
    shipping: {
      name: req.body.name,
      address: req.body.address,
    },
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "galib's farm",
    },
  });
  console.log(myPayment);
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

export const stripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
