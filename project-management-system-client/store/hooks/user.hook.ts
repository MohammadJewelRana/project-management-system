import toast from "react-hot-toast";

import {
  useChangeUserStatusMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../services/user.api";

// Create User
export const useCreateUser = () => {
  const [createUser, { isLoading, error }] =
    useCreateUserMutation();

  const create = async (data: any) => {
    try {
      await createUser(data).unwrap();

      toast.success("User created successfully!");
    } catch (err) {
      toast.error("Failed to create user!");
      console.error(err);
    }
  };

  return {
    create,
    isLoading,
    error,
  };
};

// Get All Users
export const useGetAllUsers = (filters: any) => {
  const { data, error, isLoading } =
    useGetAllUsersQuery(filters);

  let users: any[] = [];

  if (data?.success) {
    users = data.data;
  }

  return {
    users,
    isLoading,
    isError: !!error,
  };
};

// Get Single User
export const useGetSingleUser = (id: string) => {
  const { data, error, isLoading } =
    useGetSingleUserQuery(id, {
      skip: !id,
    });

  let user = null;

  if (data?.success) {
    user = data.data;
  }

  if (error) {
    toast.error("Failed to fetch user!");
  }

  return {
    user,
    isLoading,
    isError: !!error,
  };
};

// Update User
export const useUpdateUser = () => {
  const [updateUser, { isLoading, error }] =
    useUpdateUserMutation();

  const update = async (id: string, data: any) => {
    try {
      await updateUser({ id, data }).unwrap();

      toast.success("User updated successfully!");
    } catch (err) {
      toast.error("Failed to update user!");
      console.error(err);
    }
  };

  return {
    update,
    isLoading,
    error,
  };
};

// Delete User
export const useDeleteUser = () => {
  const [deleteUser, { isLoading, error }] =
    useDeleteUserMutation();

  const remove = async (id: string) => {
    try {
      await deleteUser(id).unwrap();

      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete user!");
      console.error(err);
    }
  };

  return {
    remove,
    isLoading,
    error,
  };
};

// Change User Status
export const useChangeUserStatus = () => {
  const [changeUserStatus, { isLoading, error }] =
    useChangeUserStatusMutation();

  const changeStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await changeUserStatus({
        id,
        status,
      }).unwrap();

      toast.success("User status updated!");
    } catch (err) {
      toast.error("Failed to update status!");
      console.error(err);
    }
  };

  return {
    changeStatus,
    isLoading,
    error,
  };
};