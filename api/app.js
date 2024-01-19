import express from "express";
import userRouter from "./routers/user.router.js";
import authRouter from "./routers/auth.router.js";
import shopRouter from "./routers/shopRouter.js";
import errorHandler from "./middleware/error.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/shop",shopRouter);
app.use(errorHandler);

export default app;
