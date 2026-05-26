import { baseApi } from "../baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all projects
    getAllProjects: builder.query({
      query: (filters: {
        searchTerm?: string;
        status?: string;
        priority?: string;
        page?: number;
        limit?: number;
      }) => {
        const params = new URLSearchParams();

        if (filters?.searchTerm)
          params.append("searchTerm", filters.searchTerm);
        if (filters?.status && filters.status !== "all") {
          params.append("status", filters.status);
        }
        if (filters?.priority && filters.priority !== "all") {
          params.append("priority", filters.priority);
        }
        if (filters?.page) params.append("page", String(filters.page));
        if (filters?.limit) params.append("limit", String(filters.limit));

        return {
          url: "/projects",
          params,
        };
      },
      providesTags: ["Project"],
    }),

    // Get single project
    getSingleProject: builder.query({
      query: (id: string) => `/projects/${id}`,
      providesTags: ["Project"],
    }),

    // Create project
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects/create-project",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    getProjectDetails: builder.query({
      query: (id: string) => `/projects/${id}/details`,

      providesTags: ["Project"],
    }),

    // Update project
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Project"],
    }),

    // Delete project
    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),

    // Add member to project
    addMemberToProject: builder.mutation({
      query: ({ id, memberId }) => ({
        url: `/projects/add-member/${id}`,
        method: "PATCH",
        body: { memberId },
      }),
      invalidatesTags: ["Project"],
    }),

    // Remove member from project
    removeMemberFromProject: builder.mutation({
      query: ({ id, memberId }) => ({
        url: `/projects/remove-member/${id}`,
        method: "PATCH",
        body: { memberId },
      }),
      invalidatesTags: ["Project"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllProjectsQuery,
  useGetSingleProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAddMemberToProjectMutation,
  useRemoveMemberFromProjectMutation,
  useGetProjectDetailsQuery,
} = projectApi;
