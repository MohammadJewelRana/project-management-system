import { Types } from "mongoose";

export type SprintStatus = "planned" | "active" | "completed" | "cancelled";

export interface ISprint {
  name: string;

  goal?: string;

  project: Types.ObjectId;

  sprintManager?: Types.ObjectId;

  startDate: Date;

  endDate: Date;

  duration?: number;

  status: SprintStatus;

  progress?: number;

  totalTasks?: number;

  completedTasks?: number;

  isDeleted?: boolean;

  deletedAt?: Date;

  createdBy: Types.ObjectId;

  createdAt?: Date;

  updatedAt?: Date;
}
