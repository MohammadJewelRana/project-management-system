import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getAllUsers: builder.query({
      query: (filters: {
        searchTerm?: string;
        role?: string;
        status?: string;
        page?: number;
        limit?: number;
      }) => {
        const params = new URLSearchParams();

        if (filters?.searchTerm) {
          params.append("searchTerm", filters.searchTerm);
        }

        if (filters?.role && filters.role !== "all") {
          params.append("role", filters.role);
        }

        if (filters?.status && filters.status !== "all") {
          params.append("status", filters.status);
        }

        if (filters?.page) {
          params.append("page", String(filters.page));
        }

        if (filters?.limit) {
          params.append("limit", String(filters.limit));
        }

        return {
          url: "/users",
          params,
        };
      },

      providesTags: ["User"],
    }),

    // Get single user
    getSingleUser: builder.query({
      query: (id: string) => `/users/${id}`,
      providesTags: ["User"],
    }),

    // Create user
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["User"],
    }),

    // Update user
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: ["User"],
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["User"],
    }),

    // Change user status
    changeUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/change-status/${id}`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: ["User"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useChangeUserStatusMutation,
} = userApi;