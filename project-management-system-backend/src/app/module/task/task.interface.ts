import { Types } from "mongoose";

export type TaskStatus = "todo" | "in-progress" | "review" | "done" | "blocked";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface ITask {
  title: string;

  description?: string;

  project: Types.ObjectId;

  sprint?: Types.ObjectId;

  assignee?: Types.ObjectId;

  createdBy: Types.ObjectId;

  status: TaskStatus;

  priority: TaskPriority;

  dueDate?: Date;

  estimatedHours?: number;

  loggedHours?: number;

  tags?: string[];

  progress?: number;

  isDeleted?: boolean;

  deletedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}
