import { Types } from "mongoose";

export interface IComment {
  task: Types.ObjectId;

  project: Types.ObjectId;

  user: Types.ObjectId;

  parentComment?: Types.ObjectId;

  content: string;

  isEdited?: boolean;

  isDeleted?: boolean;

  deletedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}
