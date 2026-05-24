import httpStatus from "http-status";

import mongoose from "mongoose";

import { JwtPayload } from "jsonwebtoken";

import QueryBuilder from "../../builders/QueryBuilder";

import { AppError } from "../../errors/AppError";

import { checkProjectAccess } from "../../helpers/checkProjectAccess";

import { ActivityLogService } from "../activityLog/activityLog.service";

import { Task } from "../task/task.model";

import { Comment } from "./comment.model";

import { IComment } from "./comment.interface";

// CREATE COMMENT
const createComment = async (
  payload: IComment,
  user: JwtPayload
) => {
  const session =
    await mongoose.startSession();

  try {
    session.startTransaction();

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

    // VALIDATE TASK PROJECT
    if (
      task.project.toString() !==
      payload.project.toString()
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Task does not belong to this project"
      );
    }

    // CHECK ACCESS
    await checkProjectAccess(
      payload.project.toString(),
      user
    );

    // CREATE COMMENT
    const createdComment =
      await Comment.create(
        [
          {
            ...payload,
            user:
              user.userId,
          },
        ],
        { session }
      );

    const result =
      createdComment[0];

    // CREATE ACTIVITY
    await ActivityLogService.createActivityLog(
      {
        user: user.userId,

        project:
          payload.project,

        task:
          payload.task,

        type:
          "task-updated",

        message: `New comment added`,
      }
    );

    await session.commitTransaction();

    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();

    await session.endSession();

    throw error;
  }
};

// GET ALL COMMENTS
const getAllComments =
  async (
    query: Record<
      string,
      unknown
    >
  ) => {
    const searchableFields =
      ["content"];

    const commentQuery =
      new QueryBuilder(
        Comment.find({
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
            "name email avatar role"
          )
          .populate(
            "parentComment",
            "content"
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
      await commentQuery.modelQuery;

    const meta =
      await commentQuery.countTotal();

    return {
      meta,
      result,
    };
  };

// GET SINGLE COMMENT
const getSingleComment =
  async (id: string) => {
    const result =
      await Comment.findOne({
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
          "name email avatar role"
        )
        .populate(
          "parentComment",
          "content"
        );

    if (!result) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Comment not found"
      );
    }

    return result;
  };

// UPDATE COMMENT
const updateComment = async (
  id: string,
  payload: Partial<IComment>,
  user: JwtPayload
) => {
  const comment =
    await Comment.findOne({
      _id: id,
      isDeleted: false,
    });

  if (!comment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Comment not found"
    );
  }

  // ONLY OWNER CAN UPDATE
  if (
    comment.user.toString() !==
    user.userId
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized"
    );
  }

  const result =
    await Comment.findByIdAndUpdate(
      id,
      {
        ...payload,
        isEdited: true,
      },
      {
        new: true,
        runValidators: true,
      }
    )
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
        "name email avatar role"
      );

  // CREATE ACTIVITY
  await ActivityLogService.createActivityLog(
    {
      user: user.userId,

      project:
        result!.project,

      task:
        result!.task,

      type:
        "task-updated",

      message: `Comment updated`,
    }
  );

  return result;
};

// DELETE COMMENT
const deleteComment =
  async (
    id: string,
    user: JwtPayload
  ) => {
    const comment =
      await Comment.findOne({
        _id: id,
        isDeleted: false,
      });

    if (!comment) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "Comment not found"
      );
    }

    // ONLY OWNER OR ADMIN
    const isOwner =
      comment.user.toString() ===
      user.userId;

    const isAdmin =
      user.role ===
        "admin" ||
      user.role ===
        "superAdmin";

    if (
      !isOwner &&
      !isAdmin
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You are not authorized"
      );
    }

    const result =
      await Comment.findByIdAndUpdate(
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

    // CREATE ACTIVITY
    await ActivityLogService.createActivityLog(
      {
        user: user.userId,

        project:
          comment.project,

        task:
          comment.task,

        type:
          "task-updated",

        message: `Comment deleted`,
      }
    );

    return result;
  };

export const CommentService =
  {
    createComment,
    getAllComments,
    getSingleComment,
    updateComment,
    deleteComment,
  };