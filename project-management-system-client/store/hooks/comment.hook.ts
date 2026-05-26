import toast from "react-hot-toast";

import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentsQuery,
  useGetSingleCommentQuery,
  useUpdateCommentMutation,
} from "../services/comment.api";

// Create Comment
export const useCreateComment = () => {
  const [createComment, { isLoading, error }] = useCreateCommentMutation();

  const create = async (data: any) => {
    try {
      await createComment(data).unwrap();

      toast.success("Comment created successfully!");
    } catch (err) {
      toast.error("Failed to create comment!");
      console.error(err);
    }
  };

  return {
    create,
    isLoading,
    error,
  };
};

// Get All Comments
export const useGetAllComments = (filters: any) => {
  const { data, error, isLoading } = useGetAllCommentsQuery(filters);

  let comments: any[] = [];

  if (data?.success) {
    comments = data.data;
  }

  return {
    comments,
    isLoading,
    isError: !!error,
  };
};

// Get Single Comment
export const useGetSingleComment = (id: string) => {
  const { data, error, isLoading } = useGetSingleCommentQuery(id, {
    skip: !id,
  });

  let comment = null;

  if (data?.success) {
    comment = data.data;
  }
console.log(error);

  if (error) {
    toast.error("Failed to fetch comment!");
  }

  return {
    comment,
    isLoading,
    isError: !!error,
  };
};

// Update Comment
export const useUpdateComment = () => {
  const [updateComment, { isLoading, error }] = useUpdateCommentMutation();

  const update = async (id: string, data: any) => {
    try {
      await updateComment({
        id,
        data,
      }).unwrap();

      toast.success("Comment updated successfully!");
    } catch (err) {
      toast.error("Failed to update comment!");
      console.error(err);
    }
  };

  return {
    update,
    isLoading,
    error,
  };
};

// Delete Comment
export const useDeleteComment = () => {
  const [deleteComment, { isLoading, error }] = useDeleteCommentMutation();

  const remove = async (id: string) => {
    try {
      await deleteComment(id).unwrap();

      toast.success("Comment deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete comment!");
      console.error(err);
    }
  };

  return {
    remove,
    isLoading,
    error,
  };
};
