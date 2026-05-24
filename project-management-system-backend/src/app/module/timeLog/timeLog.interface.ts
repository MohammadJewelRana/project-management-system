import { Types } from "mongoose";

export interface ITimeLog {
  task: Types.ObjectId;

  project: Types.ObjectId;

  user: Types.ObjectId;

  description?: string;

  hours: number;

  logDate: Date;

  isDeleted?: boolean;

  deletedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}