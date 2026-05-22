import mongoose, { Schema } from "mongoose";
import { IProject } from "./project.interface";

// Project Schema
const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },

    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },

    client: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },

    thumbnail: {
      type: String,
      default: null,
    },

    coverImage: {
      type: String,
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

    estimatedHours: {
      type: Number,
      min: 0,
      default: 0,
    },

    budget: {
      type: Number,
      min: 0,
      default: 0,
    },

    currency: {
      type: String,
      trim: true,
      uppercase: true,
      default: "USD",
    },

    status: {
      type: String,
      enum: ["planned", "active", "on-hold", "completed", "archived"],
      default: "planned",
      index: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
      index: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    completedTaskCount: {
      type: Number,
      min: 0,
      default: 0,
    },

    totalTaskCount: {
      type: Number,
      min: 0,
      default: 0,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    projectManager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isPublic: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
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

// TEXT SEARCH INDEX
projectSchema.index({
  title: "text",
  description: "text",
  client: "text",
  tags: "text",
  technologies: "text",
});

// COMPOUND INDEXES
projectSchema.index({
  status: 1,
  priority: 1,
});

projectSchema.index({
  createdBy: 1,
  status: 1,
});

// EXPORT MODEL
export const Project = mongoose.model<IProject>("Project", projectSchema);
