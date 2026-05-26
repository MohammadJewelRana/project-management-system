import { baseApi } from "../baseApi";

export const activityLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all activity logs
    getAllActivityLogs: builder.query({
      query: (filters: {
        searchTerm?: string;
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

        if (filters?.page) {
          params.append("page", String(filters.page));
        }

        if (filters?.limit) {
          params.append("limit", String(filters.limit));
        }

        return {
          url: "/activity-logs",
          params,
        };
      },

      providesTags: ["ActivityLog"],
    }),

    // Get single activity log
    getSingleActivityLog: builder.query({
      query: (id: string) =>
        `/activity-logs/${id}`,

      providesTags: ["ActivityLog"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllActivityLogsQuery,
  useGetSingleActivityLogQuery,
} = activityLogApi;