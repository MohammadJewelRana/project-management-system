import { baseApi } from "../baseApi";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all feedback
    getAllFeedback: builder.query({
      query: (filters: {
        name?: string;
        category?: string;
        priority?: string;
      }) => {
        const params = new URLSearchParams();

        if (filters?.name) params.append("name", filters.name);
        if (filters?.category && filters.category !== "all") {
          params.append("category", filters.category);
        }
        if (filters?.priority && filters.priority !== "all") {
          params.append("priority", filters.priority);
        }

        return {
          url: "/feedback",
          params,
        };
      },

      providesTags: ["Feedback"],
    }),

    // Get single feedback
    getSingleFeedback: builder.query({
      query: (id: string) => `/feedback/${id}`,
      providesTags: ["Feedback"],
    }),

    // Create feedback
    createFeedback: builder.mutation({
      query: (data) => ({
        url: "/feedback/create-feedback",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Feedback"],
    }),

    // Update feedback
    updateFeedback: builder.mutation({
      query: ({ id, data }) => ({
        url: `/feedback/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Feedback"],
    }),

    // Delete feedback
    deleteFeedback: builder.mutation({
      query: (id: string) => ({
        url: `/feedback/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Feedback"],
    }),

    // Get feedback statistics
    getFeedbackCounts: builder.query({
      query: () => `/feedback/stats`,
      providesTags: ["Feedback"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllFeedbackQuery,
  useGetSingleFeedbackQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
  useGetFeedbackCountsQuery
} = feedbackApi;
