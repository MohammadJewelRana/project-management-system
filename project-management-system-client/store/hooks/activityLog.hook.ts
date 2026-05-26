import toast from "react-hot-toast";

import {
  useGetAllActivityLogsQuery,
  useGetSingleActivityLogQuery,
} from "../services/activityLog.api";

// Get All Activity Logs
export const useGetAllActivityLogs = (
  filters: any
) => {
  const { data, error, isLoading } =
    useGetAllActivityLogsQuery(filters);

  let activityLogs: any[] = [];

  if (data?.success) {
    activityLogs = data.data;
  }

  return {
    activityLogs,
    isLoading,
    isError: !!error,
  };
};

// Get Single Activity Log
export const useGetSingleActivityLog = (
  id: string
) => {
  const { data, error, isLoading } =
    useGetSingleActivityLogQuery(id, {
      skip: !id,
    });

  let activityLog = null;

  if (data?.success) {
    activityLog = data.data;
  }

  if (error) {
    toast.error(
      "Failed to fetch activity log!"
    );
  }

  return {
    activityLog,
    isLoading,
    isError: !!error,
  };
};