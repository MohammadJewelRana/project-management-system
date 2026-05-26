import { baseApi } from "../baseApi";

export const sprintApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all sprints
    getAllSprints: builder.query({
      query: (filters: {
        searchTerm?: string;
        status?: string;
        project?: string;
        page?: number;
        limit?: number;
      }) => {
        const params = new URLSearchParams();

        if (filters?.searchTerm) {
          params.append("searchTerm", filters.searchTerm);
        }

        if (
          filters?.status &&
          filters.status !== "all"
        ) {
          params.append("status", filters.status);
        }

        if (
          filters?.project &&
          filters.project !== "all"
        ) {
          params.append("project", filters.project);
        }

        if (filters?.page) {
          params.append("page", String(filters.page));
        }

        if (filters?.limit) {
          params.append("limit", String(filters.limit));
        }

        return {
          url: "/sprints",
          params,
        };
      },

      providesTags: ["Sprint"],
    }),

        getMySprints: builder.query({
      query: () => ({
        url: "/sprints/my-sprints",
        method: "GET",
      }),

      providesTags: ["Sprint"],
    }),


    // Get single sprint
    getSingleSprint: builder.query({
      query: (id: string) => `/sprints/${id}`,
      providesTags: ["Sprint"],
    }),

    // Create sprint
    createSprint: builder.mutation({
      query: (data) => ({
        url: "/sprints/create-sprint",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Sprint"],
    }),

    // Update sprint
    updateSprint: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sprints/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Sprint"],
    }),

    // Delete sprint
    deleteSprint: builder.mutation({
      query: (id: string) => ({
        url: `/sprints/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Sprint"],
    }),

    // Change sprint status
    changeSprintStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/sprints/change-status/${id}`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: ["Sprint"],
    }),

    // Add task to sprint
    addTaskToSprint: builder.mutation({
      query: ({ id, taskId }) => ({
        url: `/sprints/add-task/${id}`,
        method: "PATCH",
        body: { taskId },
      }),

      invalidatesTags: ["Sprint"],
    }),

    // Remove task from sprint
    removeTaskFromSprint: builder.mutation({
      query: ({ id, taskId }) => ({
        url: `/sprints/remove-task/${id}`,
        method: "PATCH",
        body: { taskId },
      }),

      invalidatesTags: ["Sprint"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllSprintsQuery,
  useGetSingleSprintQuery,
  useCreateSprintMutation,
  useUpdateSprintMutation,
  useDeleteSprintMutation,
  useChangeSprintStatusMutation,
  useAddTaskToSprintMutation,
  useRemoveTaskFromSprintMutation,
  useGetMySprintsQuery,
} = sprintApi;