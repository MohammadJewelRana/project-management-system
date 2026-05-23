import { Request, Response } from "express";

import httpStatus from "http-status";

import sendResponse from "../../utils/sendResponse";

import { catchAsync } from "../../utils/catchAsync";

import { ProjectService } from "./project.service";

// CREATE PROJECT
const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.createProject(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

// GET ALL PROJECTS
const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProjects(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects retrieved successfully",
    data: result,
  });
});

// GET SINGLE PROJECT
const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getSingleProject(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});

// UPDATE PROJECT
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.updateProject(req.params.id as string, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

// DELETE PROJECT
const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.deleteProject(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

// ADD MEMBER
const addMemberToProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.addMemberToProject(
    req.params.id as string,
    req.body.memberId as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member added successfully",
    data: result,
  });
});

// REMOVE MEMBER
const removeMemberFromProject = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProjectService.removeMemberFromProject(
      req.params.id as string,
      req.body.memberId as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Member removed successfully",
      data: result,
    });
  }
);

export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  addMemberToProject,
  removeMemberFromProject,
};
