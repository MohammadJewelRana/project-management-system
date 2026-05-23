import httpStatus from "http-status";

import { JwtPayload } from "jsonwebtoken";

import { AppError } from "../../errors/AppError";

import { User } from "../user/user.model";

import { IProject } from "./project.interface";

import { Project } from "./project.model";

import { generateSlug } from "./project.utils";

// CREATE PROJECT
const createProject = async (payload: IProject, user: JwtPayload) => {
  // CHECK PROJECT MANAGER
  if (payload.projectManager) {
    const isManagerExists = await User.findById(payload.projectManager);

    if (!isManagerExists) {
      throw new AppError(httpStatus.NOT_FOUND, "Project manager not found");
    }
  }

  // GENERATE SLUG
  const slug = generateSlug(payload.title);

  // CHECK DUPLICATE SLUG
  const isProjectExists = await Project.findOne({
    slug,
    isDeleted: false,
  });

  if (isProjectExists) {
    throw new AppError(httpStatus.BAD_REQUEST, "Project already exists");
  }

  // CREATE PROJECT
  const result = await Project.create({
    ...payload,
    slug,
    createdBy: user.userId,
  });

  return result;
};

// GET ALL PROJECTS
const getAllProjects = async (query: Record<string, any>) => {
  const searchTerm = query.searchTerm || "";

  const status = query.status;

  const priority = query.priority;

  const filter: Record<string, any> = {
    isDeleted: false,
  };

  // SEARCH
  if (searchTerm) {
    filter.$or = [
      {
        title: {
          $regex: searchTerm,
          $options: "i",
        },
      },

      {
        client: {
          $regex: searchTerm,
          $options: "i",
        },
      },
    ];
  }

  // STATUS FILTER
  if (status) {
    filter.status = status;
  }

  // PRIORITY FILTER
  if (priority) {
    filter.priority = priority;
  }

  const result = await Project.find(filter)
    .populate("createdBy", "name email role")
    .populate("projectManager", "name email avatar")
    .populate("members", "name email avatar")
    .sort({
      createdAt: -1,
    });

  return result;
};

// GET SINGLE PROJECT
const getSingleProject = async (id: string) => {
  const result = await Project.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("createdBy", "name email role")
    .populate("projectManager", "name email avatar")
    .populate("members", "name email avatar");

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  return result;
};

// UPDATE PROJECT
const updateProject = async (id: string, payload: Partial<IProject>) => {
  const isProjectExists = await Project.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!isProjectExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  // UPDATE SLUG
  if (payload.title) {
    payload.slug = generateSlug(payload.title);
  }

  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("createdBy", "name email role")
    .populate("projectManager", "name email avatar")
    .populate("members", "name email avatar");

  return result;
};

// DELETE PROJECT
const deleteProject = async (id: string) => {
  const isProjectExists = await Project.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!isProjectExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
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

// ADD MEMBER
const addMemberToProject = async (id: string, memberId: string) => {
  // CHECK PROJECT
  const isProjectExists = await Project.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!isProjectExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  // CHECK USER
  const isUserExists = await User.findOne({
    _id: memberId,
    isDeleted: false,
  });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // CHECK STATUS
  if (isUserExists.status !== "active") {
    throw new AppError(httpStatus.BAD_REQUEST, "Inactive user cannot be added");
  }

  // CHECK ROLE
  if (isUserExists.role !== "member") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only member role can be added to project members"
    );
  }

  // CHECK ALREADY EXISTS
  const isAlreadyMember = isProjectExists.members.some(
    (member) => member.toString() === memberId
  );

  if (isAlreadyMember) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already added");
  }

  // ADD MEMBER
  const result = await Project.findByIdAndUpdate(
    id,
    {
      $addToSet: {
        members: memberId,
      },
    },
    {
      new: true,
    }
  )
    .populate("members", "name email role avatar")
    .populate("projectManager", "name email");

  return result;
};

// REMOVE MEMBER
const removeMemberFromProject = async (id: string, memberId: string) => {
  const result = await Project.findByIdAndUpdate(
    id,
    {
      $pull: {
        members: memberId,
      },
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
  addMemberToProject,
  removeMemberFromProject,
};
