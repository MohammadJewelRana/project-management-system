import httpStatus from "http-status";

import { JwtPayload } from "jsonwebtoken";

import { AppError } from "../../errors/AppError";

import { Project } from "../project/project.model";

import { User } from "../user/user.model";

import { ISprint } from "./sprint.interface";

import { Sprint } from "./sprint.model";

// CREATE SPRINT
const createSprint = async (payload: ISprint, user: JwtPayload) => {
  // CHECK PROJECT
  const isProjectExists = await Project.findOne({
    _id: payload.project,
    isDeleted: false,
  });

  if (!isProjectExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  // CHECK MANAGER
  if (payload.sprintManager) {
    const isManagerExists = await User.findById(payload.sprintManager);

    if (!isManagerExists) {
      throw new AppError(httpStatus.NOT_FOUND, "Sprint manager not found");
    }

    if (isManagerExists.role !== "manager") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Sprint manager must have manager role"
      );
    }
  }

  // CALCULATE DURATION
  const duration = Math.ceil(
    (new Date(payload.endDate).getTime() -
      new Date(payload.startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // CREATE SPRINT
  const result = await Sprint.create({
    ...payload,
    duration,
    createdBy: user.userId,
  });

  return result;
};

// GET ALL SPRINTS
const getAllSprints = async (query: Record<string, any>) => {
  const filter: Record<string, any> = {
    isDeleted: false,
  };

  // SEARCH
  if (query.searchTerm) {
    filter.name = {
      $regex: query.searchTerm,
      $options: "i",
    };
  }

  // STATUS FILTER
  if (query.status) {
    filter.status = query.status;
  }

  // PROJECT FILTER
  if (query.project) {
    filter.project = query.project;
  }

  const result = await Sprint.find(filter)
    .populate("project", "title slug")
    .populate("sprintManager", "name email role")
    .populate("createdBy", "name email")
    .sort({
      createdAt: -1,
    });

  return result;
};

// GET SINGLE SPRINT
const getSingleSprint = async (id: string) => {
  const result = await Sprint.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("project", "title slug")
    .populate("sprintManager", "name email role")
    .populate("createdBy", "name email");

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Sprint not found");
  }

  return result;
};

// UPDATE SPRINT
const updateSprint = async (id: string, payload: Partial<ISprint>) => {
  const isSprintExists = await Sprint.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!isSprintExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Sprint not found");
  }

  const result = await Sprint.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("project", "title slug")
    .populate("sprintManager", "name email role");

  return result;
};

// DELETE SPRINT
const deleteSprint = async (id: string) => {
  const isSprintExists = await Sprint.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!isSprintExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Sprint not found");
  }

  const result = await Sprint.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
      deletedAt: new Date(),
    },
    {
      new: true,
    }
  );

  return result;
};

export const SprintService = {
  createSprint,
  getAllSprints,
  getSingleSprint,
  updateSprint,
  deleteSprint,
};
