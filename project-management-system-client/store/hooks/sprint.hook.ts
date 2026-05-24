import toast from "react-hot-toast";

import {
  useAddTaskToSprintMutation,
  useChangeSprintStatusMutation,
  useCreateSprintMutation,
  useDeleteSprintMutation,
  useGetAllSprintsQuery,
  useGetSingleSprintQuery,
  useRemoveTaskFromSprintMutation,
  useUpdateSprintMutation,
} from "../services/sprint.api";

// Create Sprint
export const useCreateSprint = () => {
  const [createSprint, { isLoading, error }] = useCreateSprintMutation();

  const create = async (data: any) => {
    try {
      await createSprint(data).unwrap();

      toast.success("Sprint created successfully!");
    } catch (err) {
      toast.error("Failed to create sprint!");
      console.error(err);
    }
  };

  return {
    create,
    isLoading,
    error,
  };
};

// Get All Sprints
export const useGetAllSprints = (filters: any) => {
  const { data, error, isLoading } = useGetAllSprintsQuery(filters);

  let sprints: any[] = [];

  let meta = null;

  if (data?.success) {
    sprints = data.data?.result || [];

    meta = data.data?.meta || null;
  }

  return {
    sprints,
    meta,
    isLoading,
    isError: !!error,
  };
};

// Get Single Sprint
export const useGetSingleSprint = (id: string) => {
  const { data, error, isLoading } = useGetSingleSprintQuery(id, {
    skip: !id,
  });

  let sprint = null;

  if (data?.success) {
    sprint = data.data;
  }

  if (error) {
    toast.error("Failed to fetch sprint!");
  }

  return {
    sprint,
    isLoading,
    isError: !!error,
  };
};

// Update Sprint
export const useUpdateSprint = () => {
  const [updateSprint, { isLoading, error }] = useUpdateSprintMutation();

  const update = async (id: string, data: any) => {
    try {
      await updateSprint({ id, data }).unwrap();

      toast.success("Sprint updated successfully!");
    } catch (err) {
      toast.error("Failed to update sprint!");
      console.error(err);
    }
  };

  return {
    update,
    isLoading,
    error,
  };
};

// Delete Sprint
export const useDeleteSprint = () => {
  const [deleteSprint, { isLoading, error }] = useDeleteSprintMutation();

  const remove = async (id: string) => {
    try {
      await deleteSprint(id).unwrap();

      toast.success("Sprint deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete sprint!");
      console.error(err);
    }
  };

  return {
    remove,
    isLoading,
    error,
  };
};

// Change Sprint Status
export const useChangeSprintStatus = () => {
  const [changeSprintStatus, { isLoading, error }] =
    useChangeSprintStatusMutation();

  const changeStatus = async (id: string, status: string) => {
    try {
      await changeSprintStatus({
        id,
        status,
      }).unwrap();

      toast.success("Sprint status updated!");
    } catch (err) {
      toast.error("Failed to update sprint status!");
      console.error(err);
    }
  };

  return {
    changeStatus,
    isLoading,
    error,
  };
};

// Add Task To Sprint
export const useAddTaskToSprint = () => {
  const [addTaskToSprint, { isLoading, error }] = useAddTaskToSprintMutation();

  const add = async (id: string, taskId: string) => {
    try {
      await addTaskToSprint({
        id,
        taskId,
      }).unwrap();

      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task!");
      console.error(err);
    }
  };

  return {
    add,
    isLoading,
    error,
  };
};

// Remove Task From Sprint
export const useRemoveTaskFromSprint = () => {
  const [removeTaskFromSprint, { isLoading, error }] =
    useRemoveTaskFromSprintMutation();

  const remove = async (id: string, taskId: string) => {
    try {
      await removeTaskFromSprint({
        id,
        taskId,
      }).unwrap();

      toast.success("Task removed successfully!");
    } catch (err) {
      toast.error("Failed to remove task!");
      console.error(err);
    }
  };

  return {
    remove,
    isLoading,
    error,
  };
};
