import express from "express";
import userRouter from "./routers/user.router.js";
import authRouter from "./routers/auth.router.js";
import errorHandler from "./middleware/error.js";

const app = express();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);
  
export default app;