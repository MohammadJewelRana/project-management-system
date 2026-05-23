import mongoose, { Schema } from "mongoose";

import { ISprint } from "./sprint.interface";

const sprintSchema = new Schema<ISprint>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    goal: {
      type: String,
      default: null,
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    sprintManager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,

      validate: {
        validator: function (this: any, value: Date) {
          return value > this.startDate;
        },

        message: "End date must be greater than start date",
      },
    },

    duration: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,

      enum: ["planned", "active", "completed", "cancelled"],

      default: "planned",
    },

    progress: {
      type: Number,

      min: 0,

      max: 100,

      default: 0,
    },

    totalTasks: {
      type: Number,

      default: 0,
    },

    completedTasks: {
      type: Number,

      default: 0,
    },

    isDeleted: {
      type: Boolean,

      default: false,
    },

    deletedAt: {
      type: Date,

      default: null,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",

      required: true,
    },
  },
  {
    timestamps: true,

    versionKey: false,
  }
);

export const Sprint =
  mongoose.models.Sprint || mongoose.model<ISprint>("Sprint", sprintSchema);
