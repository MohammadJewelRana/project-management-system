import { baseApi } from "../baseApi";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all tasks
    getAllTasks: builder.query({
      query: (filters: {
        searchTerm?: string;
        status?: string;
        priority?: string;
        project?: string;
        sprint?: string;
        assignedTo?: string;
        page?: number;
        limit?: number;
      }) => {
        const params = new URLSearchParams();

        if (filters?.searchTerm) {
          params.append("searchTerm", filters.searchTerm);
        }

        if (filters?.status && filters.status !== "all") {
          params.append("status", filters.status);
        }

        if (filters?.priority && filters.priority !== "all") {
          params.append("priority", filters.priority);
        }

        if (filters?.project && filters.project !== "all") {
          params.append("project", filters.project);
        }

        if (filters?.sprint && filters.sprint !== "all") {
          params.append("sprint", filters.sprint);
        }

        if (filters?.assignedTo && filters.assignedTo !== "all") {
          params.append("assignedTo", filters.assignedTo);
        }

        if (filters?.page) {
          params.append("page", String(filters.page));
        }

        if (filters?.limit) {
          params.append("limit", String(filters.limit));
        }

        return {
          url: "/tasks",
          params,
        };
      },

      providesTags: ["Task"],
    }),

    // Get single task
    getSingleTask: builder.query({
      query: (id: string) => `/tasks/${id}`,
      providesTags: ["Task"],
    }),

    getMyTasks: builder.query({
      query: () => ({
        url: "/tasks/my-tasks",
        method: "GET",
      }),

      providesTags: ["Task"],
    }),

    // Create task
    createTask: builder.mutation({
      query: (data) => ({
        url: "/tasks/create-task",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Task"],
    }),

    // Update task
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["Task"],
    }),

    // Delete task
    deleteTask: builder.mutation({
      query: (id: string) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Task"],
    }),

    // Change task status
    changeTaskStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/change-status/${id}`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: ["Task"],
    }),

    // Assign member to task
    assignMemberToTask: builder.mutation({
      query: ({ id, assignedTo }) => ({
        url: `/tasks/assign-member/${id}`,
        method: "PATCH",
        body: { assignedTo },
      }),

      invalidatesTags: ["Task"],
    }),

    // Remove member from task
    removeMemberFromTask: builder.mutation({
      query: ({ id }) => ({
        url: `/tasks/remove-member/${id}`,
        method: "PATCH",
      }),

      invalidatesTags: ["Task"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllTasksQuery,
  useGetSingleTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useChangeTaskStatusMutation,
  useAssignMemberToTaskMutation,
  useRemoveMemberFromTaskMutation,
  useGetMyTasksQuery,
} = taskApi;
