import QueryBuilder from "../../builders/QueryBuilder";

import { IActivityLog } from "./activityLog.interface";

import { ActivityLog } from "./activityLog.model";

// CREATE ACTIVITY
const createActivityLog = async (payload: IActivityLog) => {
  const result = await ActivityLog.create(payload);

  return result;
};

// GET ALL ACTIVITIES
const getAllActivities = async (query: Record<string, unknown>) => {
  const searchableFields = ["message", "type"];

  const activityQuery = new QueryBuilder(
    ActivityLog.find()
      .populate("user", "name email avatar")
      .populate("project", "title")
      .populate("sprint", "name")
      .populate("task", "title"),
    query
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await activityQuery.modelQuery;

  const meta = await activityQuery.countTotal();

  return {
    meta,
    result,
  };
};

// GET SINGLE ACTIVITY
const getSingleActivity = async (id: string) => {
  const result = await ActivityLog.findById(id)
    .populate("user", "name email avatar")
    .populate("project", "title")
    .populate("sprint", "name")
    .populate("task", "title");

  return result;
};

export const ActivityLogService = {
  createActivityLog,
  getAllActivities,
  getSingleActivity,
};
