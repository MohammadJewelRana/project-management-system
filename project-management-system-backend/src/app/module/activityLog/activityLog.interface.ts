import { Types } from "mongoose";

export type ActivityType =
  | "project-created"
  | "project-updated"
  | "project-deleted"
  | "sprint-created"
  | "sprint-updated"
  | "task-created"
  | "task-updated"
  | "task-deleted"
  | "task-assigned"
  | "task-status-changed"
  | "time-logged";

export interface IActivityLog {
  user: Types.ObjectId;

  project?: Types.ObjectId;

  sprint?: Types.ObjectId;

  task?: Types.ObjectId;

  type: ActivityType;

  message: string;

  metadata?: Record<
    string,
    unknown
  >;

  createdAt?: Date;

  updatedAt?: Date;
}