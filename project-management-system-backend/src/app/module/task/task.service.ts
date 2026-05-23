import httpStatus from "http-status";

import { JwtPayload } from "jsonwebtoken";

import QueryBuilder from "../../builders/QueryBuilder";

import { AppError } from "../../errors/AppError";

import { checkProjectAccess } from "../../helpers/checkProjectAccess";

import { validateActiveUser } from "../../helpers/validateActiveUser";

import { Project } from "../project/project.model";

import { Sprint } from "../sprint/sprint.model";

import { ITask } from "./task.interface";

import { Task } from "./task.model";

// CREATE TASK
const createTask = async (payload: ITask, user: JwtPayload) => {
  // CHECK PROJECT ACCESS
  await checkProjectAccess(payload.project.toString(), user);

  // VALIDATE PROJECT
  const project = await Project.findOne({
    _id: payload.project,
    isDeleted: false,
  });

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }

  // VALIDATE SPRINT
  if (payload.sprint) {
    const sprint = await Sprint.findOne({
      _id: payload.sprint,
      isDeleted: false,
    });

    if (!sprint) {
      throw new AppError(httpStatus.NOT_FOUND, "Sprint not found");
    }
  }

  // VALIDATE ASSIGNEE
  if (payload.assignee) {
    const assignee = await validateActiveUser(payload.assignee.toString());

    if (assignee.role !== "member") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Task can only assign to member"
      );
    }
  }

  // CREATE TASK
  const result = await Task.create({
    ...payload,
    createdBy: user.userId,
  });

  return result;
};

// GET ALL TASKS
const getAllTasks = async (query: Record<string, unknown>) => {
  const searchableFields = ["title", "description"];

  const taskQuery = new QueryBuilder(
    Task.find({
      isDeleted: false,
    })
      .populate("project", "title")
      .populate("sprint", "name")
      .populate("assignee", "name email avatar")
      .populate("createdBy", "name email"),
    query
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await taskQuery.modelQuery;

  const meta = await taskQuery.countTotal();

  return {
    meta,
    result,
  };
};

// GET SINGLE TASK
const getSingleTask = async (id: string) => {
  const result = await Task.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("project", "title")
    .populate("sprint", "name")
    .populate("assignee", "name email avatar")
    .populate("createdBy", "name email");

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  }

  return result;
};

// UPDATE TASK
const updateTask = async (id: string, payload: Partial<ITask>) => {
  const task = await Task.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!task) {
    throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  }

  // VALIDATE ASSIGNEE
  if (payload.assignee) {
    const assignee = await validateActiveUser(payload.assignee.toString());

    if (assignee.role !== "member") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Task can only assign to member"
      );
    }
  }

  // AUTO PROGRESS
  if (payload.status === "done") {
    payload.progress = 100;
  }

  const result = await Task.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("project", "title")
    .populate("sprint", "name")
    .populate("assignee", "name email avatar");

  return result;
};

// DELETE TASK
const deleteTask = async (id: string) => {
  const task = await Task.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!task) {
    throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  }

  const result = await Task.findByIdAndUpdate(
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

export const TaskService = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
