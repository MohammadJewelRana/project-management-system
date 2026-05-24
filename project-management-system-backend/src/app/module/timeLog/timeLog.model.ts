import mongoose, {
  Schema,
} from "mongoose";

import { ITimeLog } from "./timeLog.interface";

const timeLogSchema =
  new Schema<ITimeLog>(
    {
      task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true,
      },

      project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },

      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      description: {
        type: String,
        default: null,
      },

      hours: {
        type: Number,
        required: true,
        min: 1,
      },

      logDate: {
        type: Date,
        default: Date.now,
      },

      isDeleted: {
        type: Boolean,
        default: false,
      },

      deletedAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

export const TimeLog =
  mongoose.models.TimeLog ||
  mongoose.model<ITimeLog>(
    "TimeLog",
    timeLogSchema
  );