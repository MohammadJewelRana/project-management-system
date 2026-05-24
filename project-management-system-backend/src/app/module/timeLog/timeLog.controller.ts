import { Request, Response } from "express";

import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";

import { TimeLogService } from "./timeLog.service";

// CREATE LOG
const createTimeLog = catchAsync(async (req: Request, res: Response) => {
  const result = await TimeLogService.createTimeLog(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Time log created successfully",
    data: result,
  });
});

// GET ALL LOGS
const getAllTimeLogs = catchAsync(async (req: Request, res: Response) => {
  const result = await TimeLogService.getAllTimeLogs(
    req.query as Record<string, unknown>
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Time logs retrieved successfully",
    data: result,
  });
});

// GET SINGLE LOG
const getSingleTimeLog = catchAsync(async (req: Request, res: Response) => {
  const result = await TimeLogService.getSingleTimeLog(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Time log retrieved successfully",
    data: result,
  });
});

// UPDATE LOG
const updateTimeLog = catchAsync(async (req: Request, res: Response) => {
  const result = await TimeLogService.updateTimeLog(
    req.params.id as string,
    req.body,
    req.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Time log updated successfully",
    data: result,
  });
});

// DELETE LOG
const deleteTimeLog = catchAsync(async (req: Request, res: Response) => {
  const result = await TimeLogService.deleteTimeLog(
    req.params.id as string,
    req.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Time log deleted successfully",
    data: result,
  });
});

export const TimeLogController = {
  createTimeLog,
  getAllTimeLogs,
  getSingleTimeLog,
  updateTimeLog,
  deleteTimeLog,
};
