import express from "express";
import authRouter from "./routers/auth.router.js";
import shopRouter from "./routers/shop.router.js";
import productRouter from "./routers/product.router.js";
import eventRouter from "./routers/event.router.js";
import errorHandler from "./middleware/error.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import couponRouter from "./routers/coupon.router.js";
import paymentRouter from "./routers/payment.router.js";
import orderRouter from "./routers/order.router.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/shop", shopRouter);
app.use("/api/product", productRouter);
app.use("/api/event", eventRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/order", orderRouter);
app.use(errorHandler);

export default app;
