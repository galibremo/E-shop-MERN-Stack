import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import Event from "../models/event.model.js";
import Shop from "../models/shop.model.js";

export const createEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.body.shopId);
    if (!shop) {
      return next(errorHandler(400, "Shop not found!"));
    } else {
      const eventData = req.body;
      eventData.shop = shop;
      const event = await Event.create(eventData);
      res.status(201).json({
        success: true,
        event,
      });
    }
  } catch (error) {
    next(error);
  }
});

export const getAllEventsShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(errorHandler(400, error));
  }
});

export const deleteShopEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return next(errorHandler(404, "Event is not found with this id!"));
    }
    res.status(201).json({
      success: true,
      message: "Event Deleted successfully!",
    });
  } catch (error) {
    return next(errorHandler(400, error));
  }
});

export const getAllEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(errorHandler(400, error));
  }
});

export const adminGetAllEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
});
