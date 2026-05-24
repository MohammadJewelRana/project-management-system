import httpStatus from "http-status";

import mongoose from "mongoose";

import { JwtPayload } from "jsonwebtoken";

import QueryBuilder from "../../builders/QueryBuilder";

import { AppError } from "../../errors/AppError";

import { checkProjectAccess } from "../../helpers/checkProjectAccess";

import { ActivityLogService } from "../activityLog/activityLog.service";

import { Task } from "../task/task.model";

import { ITimeLog } from "./timeLog.interface";

import { TimeLog } from "./timeLog.model";

// CREATE TIME LOG
const createTimeLog = async (payload: ITimeLog, user: JwtPayload) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // CHECK TASK
    const task = await Task.findOne({
      _id: payload.task,
      isDeleted: false,
    });

    if (!task) {
      throw new AppError(httpStatus.NOT_FOUND, "Task not found");
    }

    // VALIDATE TASK PROJECT
    if (task.project.toString() !== payload.project.toString()) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Task does not belong to this project"
      );
    }

    // CHECK ACCESS
    await checkProjectAccess(payload.project.toString(), user);

    // VALIDATE HOURS
    if (payload.hours <= 0) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Hours must be greater than 0"
      );
    }

    // CREATE LOG
    const createdLog = await TimeLog.create(
      [
        {
          ...payload,
          user: user.userId,
        },
      ],
      { session }
    );

    const result = createdLog[0];

    // UPDATE TASK HOURS
    await Task.findByIdAndUpdate(
      payload.task,
      {
        $inc: {
          loggedHours: payload.hours,
        },
      },
      { session }
    );

    // CREATE ACTIVITY LOG
    await ActivityLogService.createActivityLog({
      user: user.userId,

      project: payload.project,

      task: payload.task,

      type: "time-logged",

      message: `${payload.hours} hours logged`,
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

// GET ALL LOGS
const getAllTimeLogs = async (query: Record<string, unknown>) => {
  const searchableFields = ["description"];

  const logQuery = new QueryBuilder(
    TimeLog.find({
      isDeleted: false,
    })
      .populate("task", "title status")
      .populate("project", "title slug")
      .populate("user", "name email avatar role"),
    query
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await logQuery.modelQuery;

  const meta = await logQuery.countTotal();

  return {
    meta,
    result,
  };
};

// GET SINGLE LOG
const getSingleTimeLog = async (id: string) => {
  const result = await TimeLog.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("task", "title status")
    .populate("project", "title slug")
    .populate("user", "name email avatar role");

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Time log not found");
  }

  return result;
};

// UPDATE LOG
const updateTimeLog = async (
  id: string,
  payload: Partial<ITimeLog>,
  user: JwtPayload
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const log = await TimeLog.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!log) {
      throw new AppError(httpStatus.NOT_FOUND, "Time log not found");
    }

    // CALCULATE HOURS DIFFERENCE
    const previousHours = log.hours;

    const updatedHours = payload.hours || previousHours;

    const hoursDifference = updatedHours - previousHours;

    // UPDATE LOG
    const result = await TimeLog.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      session,
    })
      .populate("task", "title status")
      .populate("project", "title slug")
      .populate("user", "name email avatar role");

    // UPDATE TASK HOURS
    if (hoursDifference !== 0) {
      await Task.findByIdAndUpdate(
        log.task,
        {
          $inc: {
            loggedHours: hoursDifference,
          },
        },
        { session }
      );
    }

    // CREATE ACTIVITY LOG
    await ActivityLogService.createActivityLog({
      user: user.userId,

      project: log.project,

      task: log.task,

      type: "time-logged",

      message: `Time log updated`,
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

// DELETE LOG
const deleteTimeLog = async (id: string, user: JwtPayload) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const log = await TimeLog.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!log) {
      throw new AppError(httpStatus.NOT_FOUND, "Time log not found");
    }

    // SOFT DELETE
    const result = await TimeLog.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      {
        new: true,
        session,
      }
    );

    // DECREASE TASK HOURS
    await Task.findByIdAndUpdate(
      log.task,
      {
        $inc: {
          loggedHours: -log.hours,
        },
      },
      { session }
    );

    // CREATE ACTIVITY LOG
    await ActivityLogService.createActivityLog({
      user: user.userId,

      project: log.project,

      task: log.task,

      type: "time-logged",

      message: `Time log deleted`,
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

export const TimeLogService = {
  createTimeLog,
  getAllTimeLogs,
  getSingleTimeLog,
  updateTimeLog,
  deleteTimeLog,
};
