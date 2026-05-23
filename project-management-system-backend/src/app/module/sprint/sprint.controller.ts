import { Request, Response } from "express";

import httpStatus from "http-status";

import sendResponse from "../../utils/sendResponse";

import { catchAsync } from "../../utils/catchAsync";

import { SprintService } from "./sprint.service";

// CREATE SPRINT
const createSprint = catchAsync(async (req: Request, res: Response) => {
  const result = await SprintService.createSprint(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Sprint created successfully",
    data: result,
  });
});

// GET ALL SPRINTS
const getAllSprints = catchAsync(async (req: Request, res: Response) => {
  const result = await SprintService.getAllSprints(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sprints retrieved successfully",
    data: result,
  });
});

// GET SINGLE SPRINT
const getSingleSprint = catchAsync(async (req: Request, res: Response) => {
  const result = await SprintService.getSingleSprint(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sprint retrieved successfully",
    data: result,
  });
});

// UPDATE SPRINT
const updateSprint = catchAsync(async (req: Request, res: Response) => {
  const result = await SprintService.updateSprint(req.params.id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sprint updated successfully",
    data: result,
  });
});

// DELETE SPRINT
const deleteSprint = catchAsync(async (req: Request, res: Response) => {
  const result = await SprintService.deleteSprint(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sprint deleted successfully",
    data: result,
  });
});

export const SprintController = {
  createSprint,
  getAllSprints,
  getSingleSprint,
  updateSprint,
  deleteSprint,
};
