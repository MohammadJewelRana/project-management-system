import { Request, Response } from "express";

import httpStatus from "http-status";

import sendResponse from "../../utils/sendResponse";

import { catchAsync } from "../../utils/catchAsync";

import { UserServices } from "./user.service";

// CREATE USER
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.registerUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

// GET ALL USERS
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

// GET SINGLE USER
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getSingleUser(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

// UPDATE USER
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateUser(
    req.params.id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

// UPDATE STATUS
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateUserStatus(
    req.params.id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});

// UPDATE ROLE
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateUserRole(
    req.params.id as string,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully",
    data: result,
  });
});

// DELETE USER
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.deleteUser(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});

export const UserControllers = {
  registerUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserStatus,
  updateUserRole,
  deleteUser,
};
