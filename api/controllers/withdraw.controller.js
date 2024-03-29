import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import sendMail from "../utils/sendMail.js";
import Withdraw from "../models/withdraw.model.js";
import Shop from "../models/shop.model.js";

export const createWithdrawRequest = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { amount } = req.body;

      const data = {
        seller: req.shop,
        amount,
      };

      try {
        await sendMail({
          email: req.shop.email,
          subject: "Withdraw Request",
          message: `Hello ${req.shop.name}, Your withdraw request of ${amount}$ is processing. It will take 3days to 7days to processing! `,
        });
      } catch (error) {
        return next(errorHandler(500, error.message));
      }

      const withdraw = await Withdraw.create(data);

      const shop = await Shop.findById(req.shop._id);

      shop.availableBalance -= amount;

      await shop.save();

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  }
);

export const getAllWithdraw = catchAsyncErrors(async (req, res, next) => {
  try {
    const withdraws = await Withdraw.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      withdraws,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
});

export const updateWithdrawRequest = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { sellerId } = req.body;

      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "succeed",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      const seller = await Shop.findById(sellerId);

      const transection = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transections = [...seller.transections, transection];

      await seller.save();

      try {
        await sendMail({
          email: seller.email,
          subject: "Payment confirmation",
          message: `Hello ${seller.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules it usually takes 3days to 7days.`,
        });
      } catch (error) {
        return next(errorHandler(500, error.message));
      }
      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(errorHandler(500, error.message));
    }
  }
);
