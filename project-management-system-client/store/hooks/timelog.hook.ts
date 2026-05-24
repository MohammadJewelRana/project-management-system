import toast from "react-hot-toast";
import {
  useCreateTimeLogMutation,
  useDeleteTimeLogMutation,
  useGetAllTimeLogsQuery,
  useGetSingleTimeLogQuery,
  useUpdateTimeLogMutation,
} from "../services/timelog.api";

// Create Time Log
export const useCreateTimeLog = () => {
  const [createTimeLog, { isLoading, error }] = useCreateTimeLogMutation();

  const create = async (data: any) => {
    try {
      await createTimeLog(data).unwrap();

      toast.success("Time log created successfully!");
    } catch (err) {
      toast.error("Failed to create time log!");
      console.error(err);
    }
  };

  return {
    create,
    isLoading,
    error,
  };
};

// Get All Time Logs
export const useGetAllTimeLogs = (filters: any) => {
  const { data, error, isLoading } = useGetAllTimeLogsQuery(filters);

  let timeLogs: any[] = [];

  if (data?.success) {
    timeLogs = data.data;
  }

  return {
    timeLogs,
    isLoading,
    isError: !!error,
  };
};

// Get Single Time Log
export const useGetSingleTimeLog = (id: string) => {
  const { data, error, isLoading } = useGetSingleTimeLogQuery(id, {
    skip: !id,
  });

  let timeLog = null;

  if (data?.success) {
    timeLog = data.data;
  }

  if (error) {
    toast.error("Failed to fetch time log!");
  }

  return {
    timeLog,
    isLoading,
    isError: !!error,
  };
};

// Update Time Log
export const useUpdateTimeLog = () => {
  const [updateTimeLog, { isLoading, error }] = useUpdateTimeLogMutation();

  const update = async (id: string, data: any) => {
    try {
      await updateTimeLog({
        id,
        data,
      }).unwrap();

      toast.success("Time log updated successfully!");
    } catch (err) {
      toast.error("Failed to update time log!");
      console.error(err);
    }
  };

  return {
    update,
    isLoading,
    error,
  };
};

// Delete Time Log
export const useDeleteTimeLog = () => {
  const [deleteTimeLog, { isLoading, error }] = useDeleteTimeLogMutation();

  const remove = async (id: string) => {
    try {
      await deleteTimeLog(id).unwrap();

      toast.success("Time log deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete time log!");
      console.error(err);
    }
  };

  return {
    remove,
    isLoading,
    error,
  };
};
