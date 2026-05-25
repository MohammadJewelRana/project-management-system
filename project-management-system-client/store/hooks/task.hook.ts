import toast from "react-hot-toast";

import {
  useAssignMemberToTaskMutation,
  useChangeTaskStatusMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useGetSingleTaskQuery,
  useRemoveMemberFromTaskMutation,
  useUpdateTaskMutation,
} from "../services/task.api";

// Create Task
export const useCreateTask = () => {
  const [createTask, { isLoading, error }] = useCreateTaskMutation();

  const create = async (data: any) => {
    try {
      await createTask(data).unwrap();

      toast.success("Task created successfully!");
    } catch (err) {
      toast.error("Failed to create task!");
      console.error(err);
    }
  };

  return {
    create,
    isLoading,
    error,
  };
};

// Get All Tasks
export const useGetAllTasks = (filters: any) => {
  const { data, error, isLoading } = useGetAllTasksQuery(filters);

  let tasks: any[] = [];
  let allTasks: any[] = [];

  if (data?.success) {
    tasks = data.data;
    allTasks = data.data?.result;
  }

  return {
    tasks,
    allTasks,
    isLoading,
    isError: !!error,
  };
};

// Get Single Task
export const useGetSingleTask = (id: string) => {
  const { data, error, isLoading } = useGetSingleTaskQuery(id, {
    skip: !id,
  });

  let task = null;

  if (data?.success) {
    task = data.data;
  }

  if (error) {
    toast.error("Failed to fetch task!");
  }

  return {
    task,
    isLoading,
    isError: !!error,
  };
};

// Update Task
export const useUpdateTask = () => {
  const [updateTask, { isLoading, error }] = useUpdateTaskMutation();

  const update = async (id: string, data: any) => {
    try {
      await updateTask({ id, data }).unwrap();

      toast.success("Task updated successfully!");
    } catch (err) {
      toast.error("Failed to update task!");
      console.error(err);
    }
  };

  return {
    update,
    isLoading,
    error,
  };
};

// Delete Task
export const useDeleteTask = () => {
  const [deleteTask, { isLoading, error }] = useDeleteTaskMutation();

  const remove = async (id: string) => {
    try {
      await deleteTask(id).unwrap();

      toast.success("Task deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete task!");
      console.error(err);
    }
  };

  return {
    remove,
    isLoading,
    error,
  };
};

// Change Task Status
export const useChangeTaskStatus = () => {
  const [changeTaskStatus, { isLoading, error }] =
    useChangeTaskStatusMutation();

  const changeStatus = async (id: string, status: string) => {
    try {
      await changeTaskStatus({
        id,
        status,
      }).unwrap();

      toast.success("Task status updated!");
    } catch (err) {
      toast.error("Failed to update task status!");
      console.error(err);
    }
  };

  return {
    changeStatus,
    isLoading,
    error,
  };
};

// Assign Member To Task
export const useAssignMemberToTask = () => {
  const [assignMemberToTask, { isLoading, error }] =
    useAssignMemberToTaskMutation();

  const assign = async (id: string, assignedTo: string) => {
    try {
      await assignMemberToTask({
        id,
        assignedTo,
      }).unwrap();

      toast.success("Member assigned successfully!");
    } catch (err) {
      toast.error("Failed to assign member!");
      console.error(err);
    }
  };

  return {
    assign,
    isLoading,
    error,
  };
};

// Remove Member From Task
export const useRemoveMemberFromTask = () => {
  const [removeMemberFromTask, { isLoading, error }] =
    useRemoveMemberFromTaskMutation();

  const remove = async (id: string) => {
    try {
      await removeMemberFromTask(id).unwrap();

      toast.success("Member removed successfully!");
    } catch (err) {
      toast.error("Failed to remove member!");
      console.error(err);
    }
  };

  return {
    remove,
    isLoading,
    error,
  };
};
