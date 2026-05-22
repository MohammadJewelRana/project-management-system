/* ======================================================
   TYPES
====================================================== */

import { Types } from "mongoose";

export type ProjectStatus =
  | "planned"
  | "active"
  | "on-hold"
  | "completed"
  | "archived";

export type ProjectPriority =
  | "low"
  | "medium"
  | "high"
  | "urgent";

/* ======================================================
   INTERFACE
====================================================== */

export interface IProject {
  title: string;

  slug?: string;

  client: string;

  description: string;

  thumbnail?: string;

  coverImage?: string;

  startDate: Date;

  endDate: Date;

  estimatedHours?: number;

  budget?: number;

  currency?: string;

  status: ProjectStatus;

  priority: ProjectPriority;

  tags?: string[];

  technologies?: string[];

  progress?: number;

  completedTaskCount?: number;

  totalTaskCount?: number;

  createdBy: Types.ObjectId;

  projectManager?: Types.ObjectId;

  members: Types.ObjectId[];

  isPublic?: boolean;

  isDeleted?: boolean;

  deletedAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}