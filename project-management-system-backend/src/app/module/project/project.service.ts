import httpStatus from "http-status";

import { JwtPayload } from "jsonwebtoken";

import { AppError } from "../../errors/AppError";

import { validateActiveUser } from "../../helpers/validateActiveUser";

import { IProject } from "./project.interface";

import { Project } from "./project.model";
import { generateSlug } from "./project.utils";
import QueryBuilder from "../../builders/QueryBuilder";

// CREATE PROJECT
const createProject = async (payload: IProject, user: JwtPayload) => {
  // VALIDATE PROJECT MANAGER
  if (payload.projectManager) {
    const manager = await validateActiveUser(payload.projectManager.toString());

    if (manager.role !== "manager") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Project manager must have manager role"
      );
    }
  }

  // GENERATE SLUG
  const slug = generateSlug(payload.title);

  // CHECK DUPLICATE
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
const getAllProjects = async (query: Record<string, unknown>) => {
  const searchableFields = ["title", "client", "description"];

  const projectQuery = new QueryBuilder(
    Project.find({
      isDeleted: false,
    })
      .populate("createdBy", "name email role")
      .populate("projectManager", "name email avatar role")
      .populate("members", "name email avatar role"),
    query
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await projectQuery.modelQuery;

  const meta = await projectQuery.countTotal();

  return {
    meta,
    result,
  };
};

// GET SINGLE PROJECT
const getSingleProject = async (id: string) => {
  const result = await Project.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("createdBy", "name email role")
    .populate("projectManager", "name email avatar role")
    .populate("members", "name email avatar role");

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

  // VALIDATE PROJECT MANAGER
  if (payload.projectManager) {
    const manager = await validateActiveUser(payload.projectManager.toString());

    if (manager.role !== "manager") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Project manager must have manager role"
      );
    }
  }

  // UPDATE SLUG
  if (payload.title) {
    payload.slug = generateSlug(payload.title);
  }

  // UPDATE PROJECT
  const result = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("createdBy", "name email role")
    .populate("projectManager", "name email avatar role")
    .populate("members", "name email avatar role");

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
  const project = await Project.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  // VALIDATE USER
  const member = await validateActiveUser(memberId);

  // ROLE VALIDATION
  if (member.role !== "member") {
    throw new AppError(httpStatus.BAD_REQUEST, "Only member role can be added");
  }

  // CHECK ALREADY EXISTS
  const isAlreadyMember = project.members.some(
    (item) => item.toString() === memberId
  );

  if (isAlreadyMember) {
    throw new AppError(httpStatus.BAD_REQUEST, "Member already exists");
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
    .populate("members", "name email avatar role")
    .populate("projectManager", "name email avatar role");

  return result;
};

// REMOVE MEMBER
const removeMemberFromProject = async (id: string, memberId: string) => {
  const project = await Project.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

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
  )
    .populate("members", "name email avatar role")
    .populate("projectManager", "name email avatar role");

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
