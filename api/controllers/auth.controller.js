import User from "../models/user.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtToken.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) return next(errorHandler(404, "User already exists"));

    const user = {
      name: name,
      email: email,
      password: password,
    };
    const activationToken = jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      next(errorHandler(500, error.message));
    }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const activation = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!newUser) {
      return next(errorHandler(400, "Invalid token"));
    }
    const { name, email, password } = newUser;

    let user = await User.findOne({ email });

    if (user) {
      return next(errorHandler(400, "User already exists"));
    }
    user = await User.create({
      name,
      email,
      password,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
});

export const forgetpassword = async (req, res, next) => {
  const { email } = req.body;
  const validUser = await User.findOne({ email });
  if (!validUser) return next(errorHandler(404, "User not found!"));
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5m",
  });
  const resetPasswordUrl = `http://localhost:5173/resetpassword/${validUser._id}/${token}`;
  try {
    await sendMail({
      email: email,
      subject: "Reset Password",
      message: `please click on the link to reset your account password: ${resetPasswordUrl}`,
    });
    res.status(201).json({
      success: true,
      message: `please check your email:- ${email} to activate your account!`,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const resetpassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verifyUser) return next(errorHandler(404, "User not found!"));

    const hashedPassword = bcryptjs.hashSync(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
    res.status(201).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email }).select("+password");
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = await validUser.comparePassword(password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    sendToken(validUser, 200, res);
  } catch (error) {
    next(error);
  }
};

export const getuser = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(errorHandler(404, "User doesn't exists"));
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error.message);
  }
});
export const logout = catchAsyncErrors(async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json("user has been logged out!");
  } catch (error) {
    next(error);
  }
});
export const updateUserInfo = catchAsyncErrors(async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// export const updateUserInfo = catchAsyncErrors(async (req, res, next) => {
//   if (req.user.id !== req.params.id) {
//     return next(errorHandler(401, "You can only update your own account!"));
//   }

//   try {
//     const user = await User.findById(req.params.id);

//     if (user.addresses.length === 0) {
//       // If addresses array is empty, use $push to add a new element
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: {
//             name: req.body.name,
//             email: req.body.email,
//             phoneNumber: req.body.phoneNumber,
//             avatar: req.body.avatar,
//           },
//           $push: {
//             addresses: {
//               address1: req.body.address1,
//               address2: req.body.address2,
//               zipCode: req.body.zipCode,
//             },
//           },
//         },
//         { new: true, upsert: true }
//       );

//       res.status(200).json(updatedUser);
//     } else {
//       // If addresses array is not empty, use $set to update the existing element
//       const user = await User.findById(req.params.id);
//       const {
//         addresses: [{ _id: addressId }],
//       } = user;

//       const updatedUser = await User.findOneAndUpdate(
//         {
//           _id: req.params.id,
//           "addresses._id": addressId.toString(),
//         },
//         {
//           $set: {
//             "addresses.$.address1": req.body.address1,
//             "addresses.$.address2": req.body.address2,
//             "addresses.$.zipCode": req.body.zipCode,
//             name: req.body.name,
//             email: req.body.email,
//             phoneNumber: req.body.phoneNumber,
//             avatar: req.body.avatar,
//           },
//         },
//         { new: true }
//       );

//       res.status(200).json(updatedUser);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

export const updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, "You can only update your own account!"));
    }
    const user = await User.findById(req.params.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(errorHandler(400, "Old password is incorrect!"));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        errorHandler(400, "Password doesn't matched with each other!")
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          password: bcryptjs.hashSync(req.body.newPassword, 10),
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    next(error);
  }
});

export const updateUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const getUser = await User.findById(req.user.id);

    const sameTypeAddress = getUser.addresses.find(
      (address) => address.addressType === req.body.addressType
    );
    if (sameTypeAddress) {
      return next(
        errorHandler(500, `${req.body.addressType} address already exists!`)
      );
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          addresses: req.body,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
});

export const deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
});

export const getUserInfoWithId = catchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(errorHandler(500, error.message));
  }
});
