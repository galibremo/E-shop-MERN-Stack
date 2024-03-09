import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import Message from "../models/message.model.js";

export const createNewMessage = catchAsyncErrors(async (req, res, next) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });

    res.status(201).json({
      success: true,
      messages,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
});
