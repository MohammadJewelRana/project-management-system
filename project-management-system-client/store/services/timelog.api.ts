import { baseApi } from "../baseApi";

export const timeLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all time logs
    getAllTimeLogs: builder.query({
      query: (filters: {
        searchTerm?: string;
        task?: string;
        project?: string;
        user?: string;
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
          filters?.user &&
          filters.user !== "all"
        ) {
          params.append("user", filters.user);
        }

        if (filters?.page) {
          params.append("page", String(filters.page));
        }

        if (filters?.limit) {
          params.append("limit", String(filters.limit));
        }

        return {
          url: "/time-logs",
          params,
        };
      },

      providesTags: ["TimeLog"],
    }),

    // Get single time log
    getSingleTimeLog: builder.query({
      query: (id: string) =>
        `/time-logs/${id}`,

      providesTags: ["TimeLog"],
    }),

    // Create time log
    createTimeLog: builder.mutation({
      query: (data) => ({
        url: "/time-logs/create-log",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["TimeLog"],
    }),

    // Update time log
    updateTimeLog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/time-logs/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["TimeLog"],
    }),

    // Delete time log
    deleteTimeLog: builder.mutation({
      query: (id: string) => ({
        url: `/time-logs/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["TimeLog"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllTimeLogsQuery,
  useGetSingleTimeLogQuery,
  useCreateTimeLogMutation,
  useUpdateTimeLogMutation,
  useDeleteTimeLogMutation,
} = timeLogApi;