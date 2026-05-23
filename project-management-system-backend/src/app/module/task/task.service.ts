import httpStatus from "http-status";

import mongoose from "mongoose";

import { JwtPayload } from "jsonwebtoken";

import QueryBuilder from "../../builders/QueryBuilder";

import { AppError } from "../../errors/AppError";

import { checkProjectAccess } from "../../helpers/checkProjectAccess";

import { validateActiveUser } from "../../helpers/validateActiveUser";

import { ActivityLogService } from "../activityLog/activityLog.service";

import { Project } from "../project/project.model";

import { Sprint } from "../sprint/sprint.model";

import { ITask } from "./task.interface";

import { Task } from "./task.model";

// TASK STATUS PROGRESS MAP
const taskProgressMap: Record<string, number> = {
  todo: 0,
  "in-progress": 50,
  review: 80,
  done: 100,
  blocked: 0,
};

// CREATE TASK
const createTask = async (payload: ITask, user: JwtPayload) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

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

      // CHECK SPRINT PROJECT MATCH
      if (sprint.project.toString() !== payload.project.toString()) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Sprint does not belong to this project"
        );
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

    // AUTO PROGRESS
    payload.progress = taskProgressMap[payload.status] || 0;

    // CREATE TASK
    const createdTask = await Task.create(
      [
        {
          ...payload,
          createdBy: user.userId,
        },
      ],
      { session }
    );

    const result = createdTask[0];

    // CREATE ACTIVITY LOG
    await ActivityLogService.createActivityLog({
      user: user.userId,

      project: payload.project,

      sprint: payload.sprint,

      task: result._id,

      type: "task-created",

      message: `Task "${result.title}" created`,
    });

    await session.commitTransaction();

    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();

    await session.endSession();

    throw error;
  }
};

// GET ALL TASKS
const getAllTasks = async (query: Record<string, unknown>) => {
  const searchableFields = ["title", "description"];

  const taskQuery = new QueryBuilder(
    Task.find({
      isDeleted: false,
    })
      .populate("project", "title slug")
      .populate("sprint", "name")
      .populate("assignee", "name email avatar role")
      .populate("createdBy", "name email role"),
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
    .populate("project", "title slug")
    .populate("sprint", "name")
    .populate("assignee", "name email avatar role")
    .populate("createdBy", "name email role");

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  }

  return result;
};

// UPDATE TASK
const updateTask = async (
  id: string,
  payload: Partial<ITask>,
  user: JwtPayload
) => {
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

  // VALIDATE STATUS FLOW
  if (task.status === "done" && payload.status && payload.status !== "done") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Completed task status cannot be changed"
    );
  }

  // AUTO PROGRESS
  if (payload.status) {
    payload.progress = taskProgressMap[payload.status];
  }

  // UPDATE TASK
  const result = await Task.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("project", "title slug")
    .populate("sprint", "name")
    .populate("assignee", "name email avatar role")
    .populate("createdBy", "name email role");

  // TASK STATUS ACTIVITY
  if (payload.status) {
    await ActivityLogService.createActivityLog({
      user: user.userId,

      task: result!._id,

      project: result!.project,

      sprint: result!.sprint,

      type: "task-status-changed",

      message: `Task status changed to ${payload.status}`,
    });
  }

  // TASK UPDATE ACTIVITY
  await ActivityLogService.createActivityLog({
    user: user.userId,

    task: result!._id,

    project: result!.project,

    sprint: result!.sprint,

    type: "task-updated",

    message: `Task "${result!.title}" updated`,
  });

  return result;
};

// DELETE TASK
const deleteTask = async (id: string, user: JwtPayload) => {
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

  // CREATE ACTIVITY LOG
  await ActivityLogService.createActivityLog({
    user: user.userId,

    task: result!._id,

    project: result!.project,

    sprint: result!.sprint,

    type: "task-deleted",

    message: `Task "${result!.title}" deleted`,
  });

  return result;
};

export const TaskService = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
