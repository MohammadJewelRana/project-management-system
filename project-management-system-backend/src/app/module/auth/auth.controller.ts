import { Request, Response } from "express";

import httpStatus from "http-status";

import sendResponse from "../../utils/sendResponse";

import { AuthServices } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";

// REGISTER USER
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

// LOGIN USER
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successful",
    data: result,
  });
});

// CURRENT USER
const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await AuthServices.getMe(user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  getMe,
};
