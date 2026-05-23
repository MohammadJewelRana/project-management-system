import toast from "react-hot-toast";
import {
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetAllFeedbackQuery,
  useGetFeedbackCountsQuery,
  useGetSingleFeedbackQuery,
  useUpdateFeedbackMutation,
} from "../services/feedback.api";

// Create Feedback
export const useCreateFeedback = () => {
  const [createFeedback, { isLoading, error }] = useCreateFeedbackMutation();

  const create = async (data: any) => {
    try {
      await createFeedback(data).unwrap();
      toast.success("Feedback created successfully!");
    } catch (err: any) {
      toast.error("Failed to create feedback!");
      console.error(err);
    }
  };

  return { create, isLoading, error };
};

// Get All Feedback
export const useGetAllFeedback = (filters: any) => {
  const { data, error, isLoading } = useGetAllFeedbackQuery(filters);

  let feedbacks: any[] = [];

  if (data?.success) {
    feedbacks = data.data;
  }

  return {
    feedbacks,
    isLoading,
    isError: !!error,
  };
};

// Get Single Feedback
export const useGetSingleFeedback = (id: string) => {
  const { data, error, isLoading } = useGetSingleFeedbackQuery(id, {
    skip: !id,
  });

  let feedback = null;

  if (data?.success) {
    feedback = data.data;
  }

  if (error) {
    toast.error("Failed to fetch feedback!");
  }

  return {
    feedback,
    isLoading,
    isError: !!error,
  };
};

// Update Feedback
export const useUpdateFeedback = () => {
  const [updateFeedback, { isLoading, error }] = useUpdateFeedbackMutation();

  const update = async (id: string, data: any) => {
    try {
      await updateFeedback({ id, data }).unwrap();
      toast.success("Feedback updated successfully!");
    } catch (err) {
      toast.error("Failed to update feedback!");
    }
  };

  return { update, isLoading, error };
};

// Delete Feedback
export const useDeleteFeedback = () => {
  const [deleteFeedback, { isLoading, error }] = useDeleteFeedbackMutation();

  const remove = async (id: string) => {
    try {
      await deleteFeedback(id).unwrap();
      toast.success("Feedback deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete feedback!");
    }
  };

  return { remove, isLoading, error };
};

// Get Feedback Counts
export const useGetFeedbackCounts = () => {
  const { data, error, isLoading } = useGetFeedbackCountsQuery(undefined);
  // console.log(data);
  

  let stats = {
    totalFeedback: 0,
    highPriority: 0,
    negativeSentiment: 0,
  };

  if (data?.success) {
    stats = data.data;
  }

  return {
    stats,
    isLoading,
    isError: !!error,
  };
};
