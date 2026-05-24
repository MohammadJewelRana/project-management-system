import { Request, Response } from "express";

import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";

import { ActivityLogService } from "./activityLog.service";

// GET ALL
const getAllActivities = catchAsync(async (req: Request, res: Response) => {
  const result = await ActivityLogService.getAllActivities(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Activities retrieved successfully",
    data: result,
  });
});

// GET SINGLE
const getSingleActivity = catchAsync(async (req: Request, res: Response) => {
  const result = await ActivityLogService.getSingleActivity(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Activity retrieved successfully",
    data: result,
  });
});

export const ActivityLogController = {
  getAllActivities,
  getSingleActivity,
};
