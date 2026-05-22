import { Request, Response } from "express";
import httpStatus from "http-status";

import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

import { ProjectService } from "./project.service";

// CREATE PROJECT
const createProject = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProjectService.createProject(
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Project created successfully",
      data: result,
    });
  }
);

// GET ALL PROJECTS
const getAllProjects = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await ProjectService.getAllProjects();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Projects retrieved successfully",
      data: result,
    });
  }
);

// GET SINGLE PROJECT
const getSingleProject = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ProjectService.getSingleProject(
      id as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project retrieved successfully",
      data: result,
    });
  }
);

// UPDATE PROJECT
const updateProject = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ProjectService.updateProject(
      id as string,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project updated successfully",
      data: result,
    });
  }
);

// DELETE PROJECT
const deleteProject = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ProjectService.deleteProject(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Project deleted successfully",
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
};