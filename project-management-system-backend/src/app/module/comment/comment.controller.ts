import { Request, Response } from "express";

import httpStatus from "http-status";

import { catchAsync } from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";

import { CommentService } from "./comment.service";

// CREATE
const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.createComment(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Comment created successfully",
    data: result,
  });
});

// GET ALL
const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getAllComments(
    req.query as Record<string, unknown>
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comments retrieved successfully",
    data: result,
  });
});

// GET SINGLE
const getSingleComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getSingleComment(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment retrieved successfully",
    data: result,
  });
});

// UPDATE
const updateComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.updateComment(
    req.params.id as string,
    req.body,
    req.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
});

// DELETE
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.deleteComment(
    req.params.id as string,
    req.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Comment deleted successfully",
    data: result,
  });
});

export const CommentController = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
};
