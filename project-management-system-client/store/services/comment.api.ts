import { baseApi } from "../baseApi";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all comments
    getAllComments: builder.query({
      query: (filters: {
        searchTerm?: string;
        task?: string;
        project?: string;
        parentComment?: string;
        page?: number;
        limit?: number;
      }) => {
        const params = new URLSearchParams();

        if (filters?.searchTerm) {
          params.append(
            "searchTerm",
            filters.searchTerm
          );
        }

        if (
          filters?.task &&
          filters.task !== "all"
        ) {
          params.append("task", filters.task);
        }

        if (
          filters?.project &&
          filters.project !== "all"
        ) {
          params.append("project", filters.project);
        }

        if (
          filters?.parentComment &&
          filters.parentComment !== "all"
        ) {
          params.append(
            "parentComment",
            filters.parentComment
          );
        }

        if (filters?.page) {
          params.append("page", String(filters.page));
        }

        if (filters?.limit) {
          params.append("limit", String(filters.limit));
        }

        return {
          url: "/comments",
          params,
        };
      },

      providesTags: ["Comment"],
    }),

    // Get single comment
    getSingleComment: builder.query({
      query: (id: string) => `/comments/${id}`,

      providesTags: ["Comment"],
    }),

    // Create comment
    createComment: builder.mutation({
      query: (data) => ({
        url: "/comments/create-comment",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Comment"],
    }),

    // Update comment
    updateComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comments/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Comment"],
    }),

    // Delete comment
    deleteComment: builder.mutation({
      query: (id: string) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Comment"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllCommentsQuery,
  useGetSingleCommentQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;