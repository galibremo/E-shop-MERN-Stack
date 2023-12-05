 import {errorHandler} from "../utils/ErrorHandler.js";

export default (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  
  //wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    err = errorHandler(400,message);
  }

  //Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = errorHandler(400,message);
  }

  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your url is invalid please try again letter`;
    err = errorHandler(400,message);
  }

  //jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Your Url is expired please try again letter!`;
    err = errorHandler(400,message);
  }

  //jwt expired
  if (err.name === "jwt expired") {
    const message = `Your Url is expired please request another link!`;
    err = errorHandler(400,message);
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
