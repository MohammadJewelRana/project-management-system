import httpStatus from "http-status";

import { JwtPayload } from "jsonwebtoken";

import QueryBuilder from "../../builders/QueryBuilder";

import { AppError } from "../../errors/AppError";

import { checkProjectAccess } from "../../helpers/checkProjectAccess";

import { Task } from "../task/task.model";

import { ITimeLog } from "./timeLog.interface";

import { TimeLog } from "./timeLog.model";

// CREATE TIME LOG
const createTimeLog =
  async (
    payload: ITimeLog,
    user: JwtPayload
  ) => {
    // CHECK TASK
    const task =
      await Task.findOne({
        _id: payload.task,
        isDeleted: false,
      });

    if (!task) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Task not found"
      );
    }

    // CHECK ACCESS
    await checkProjectAccess(
      payload.project.toString(),
      user
    );

    // CREATE LOG
    const result =
      await TimeLog.create({
        ...payload,
        user: user.userId,
      });

    // UPDATE TASK HOURS
    await Task.findByIdAndUpdate(
      payload.task,
      {
        $inc: {
          loggedHours:
            payload.hours,
        },
      }
    );

    return result;
  };

// GET ALL LOGS
const getAllTimeLogs =
  async (
    query: Record<
      string,
      unknown
    >
  ) => {
    const searchableFields =
      ["description"];

    const logQuery =
      new QueryBuilder(
        TimeLog.find({
          isDeleted: false,
        })
          .populate(
            "task",
            "title"
          )
          .populate(
            "project",
            "title"
          )
          .populate(
            "user",
            "name email"
          ),
        query
      )
        .search(
          searchableFields
        )
        .filter()
        .sort()
        .paginate()
        .fields();

    const result =
      await logQuery.modelQuery;

    const meta =
      await logQuery.countTotal();

    return {
      meta,
      result,
    };
  };

// GET SINGLE LOG
const getSingleTimeLog =
  async (id: string) => {
    const result =
      await TimeLog.findOne({
        _id: id,
        isDeleted: false,
      })
        .populate(
          "task",
          "title"
        )
        .populate(
          "project",
          "title"
        )
        .populate(
          "user",
          "name email"
        );

    if (!result) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Time log not found"
      );
    }

    return result;
  };

// UPDATE LOG
const updateTimeLog = async (
  id: string,
  payload: Partial<ITimeLog>
) => {
  const log =
    await TimeLog.findOne({
      _id: id,
      isDeleted: false,
    });

  if (!log) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Time log not found"
    );
  }

  const result =
    await TimeLog.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

  return result;
};

// DELETE LOG
const deleteTimeLog =
  async (id: string) => {
    const log =
      await TimeLog.findOne({
        _id: id,
        isDeleted: false,
      });

    if (!log) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Time log not found"
      );
    }

    const result =
      await TimeLog.findByIdAndUpdate(
        id,
        {
          isDeleted: true,
          deletedAt:
            new Date(),
        },
        {
          new: true,
        }
      );

    return result;
  };

export const TimeLogService =
  {
    createTimeLog,
    getAllTimeLogs,
    getSingleTimeLog,
    updateTimeLog,
    deleteTimeLog,
  };