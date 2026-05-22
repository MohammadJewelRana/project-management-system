import httpStatus from "http-status";

 

import { IProject } from "./project.interface";
import { Project } from "./project.model";
import { AppError } from "../../errors/AppError";

// CREATE PROJECT
const createProject = async (payload: IProject) => {
  const result = await Project.create(payload);

  return result;
};

// GET ALL PROJECTS
const getAllProjects = async () => {
  const result = await Project.find({})
    .populate("createdBy", "name email")
    .populate("projectManager", "name email")
    .populate("members", "name email avatar")
    .sort({ createdAt: -1 });

  return result;
};

// GET SINGLE PROJECT
const getSingleProject = async (id: string) => {
  const result = await Project.findById(id)
    .populate("createdBy", "name email")
    .populate("projectManager", "name email")
    .populate("members", "name email avatar");

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Project not found"
    );
  }

  return result;
};

// UPDATE PROJECT
const updateProject = async (
  id: string,
  payload: Partial<IProject>
) => {
  const isProjectExists = await Project.findById(id);

  if (!isProjectExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Project not found"
    );
  }

  const result = await Project.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("createdBy", "name email")
    .populate("projectManager", "name email")
    .populate("members", "name email avatar");

  return result;
};

// DELETE PROJECT (SOFT DELETE)
const deleteProject = async (id: string) => {
  const isProjectExists = await Project.findById(id);

  if (!isProjectExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Project not found"
    );
  }

  const result = await Project.findByIdAndUpdate(
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

export const ProjectService = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};