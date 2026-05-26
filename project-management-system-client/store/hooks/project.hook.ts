import toast from "react-hot-toast";
import {
  useAddMemberToProjectMutation,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useGetMyProjectsQuery,
  useGetProjectDetailsQuery,
  useGetSingleProjectQuery,
  useRemoveMemberFromProjectMutation,
  useUpdateProjectMutation,
} from "../services/project.api";
import { useRouter } from "next/navigation";

// Create Project
export const useCreateProject = () => {
  const [createProject, { isLoading, error }] = useCreateProjectMutation();

  const create = async (data: any) => {
    try {
      await createProject(data).unwrap();
      toast.success("Project created successfully!");
    } catch (err) {
      toast.error("Failed to create project!");
      console.error(err);
    }
  };

  return { create, isLoading, error };
};

// Get All Projects
export const useGetAllProjects = (filters: any) => {
  const { data, error, isLoading } = useGetAllProjectsQuery(filters);

  let projects: any[] = [];
  let allData: any[] = [];

  if (data?.success) {
    projects = data.data;
    allData = data.data?.result || [];
  }

  return {
    projects,
    allData,
    isLoading,
    isError: !!error,
  };
};

// Get Single Project
export const useGetSingleProject = (id: string) => {
  const { data, error, isLoading } = useGetSingleProjectQuery(id, {
    skip: !id,
  });

  let project = null;

  if (data?.success) {
    project = data.data;
  }

  if (error) {
    toast.error("Failed to fetch project!");
  }

  return {
    project,
    isLoading,
    isError: !!error,
  };
};

export const useGetProjectDetails = (id: string) => {
  const { data, error, isLoading } = useGetProjectDetailsQuery(id, {
    skip: !id,
  });

  let project = null;

  let analytics = null;

  let sprints: any[] = [];

  let tasks: any[] = [];

  let members: any[] = [];

  if (data?.success) {
    project = data.data?.project;

    analytics = data.data?.analytics;

    sprints = data.data?.sprints || [];

    tasks = data.data?.tasks || [];

    members = data.data?.members || [];
  }

  return {
    project,

    analytics,

    sprints,

    tasks,

    members,

    isLoading,

    isError: !!error,
  };
};

// Update Project
export const useUpdateProject = () => {
  const [updateProject, { isLoading, error }] = useUpdateProjectMutation();
  const router = useRouter();
  const update = async (id: string, data: any) => {
    try {
      await updateProject({ id, data }).unwrap();
      toast.success("Project updated successfully!");

      router.push("/dashboard/projects");
    } catch (err) {
      toast.error("Failed to update project!");
      console.error(err);
    }
  };

  return { update, isLoading, error };
};

// Delete Project
export const useDeleteProject = () => {
  const [deleteProject, { isLoading, error }] = useDeleteProjectMutation();

  const remove = async (id: string) => {
    try {
      await deleteProject(id).unwrap();
      toast.success("Project deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete project!");
      console.error(err);
    }
  };

  return { remove, isLoading, error };
};

// Add Member
export const useAddMemberToProject = () => {
  const [addMemberToProject, { isLoading, error }] =
    useAddMemberToProjectMutation();

  const add = async (id: string, memberId: string) => {
    try {
      await addMemberToProject({ id, memberId }).unwrap();
      toast.success("Member added successfully!");
    } catch (err) {
      toast.error("Failed to add member!");
      console.error(err);
    }
  };

  return { add, isLoading, error };
};

// Remove Member
export const useRemoveMemberFromProject = () => {
  const [removeMemberFromProject, { isLoading, error }] =
    useRemoveMemberFromProjectMutation();

  const remove = async (id: string, memberId: string) => {
    try {
      await removeMemberFromProject({ id, memberId }).unwrap();
      toast.success("Member removed successfully!");
    } catch (err) {
      toast.error("Failed to remove member!");
      console.error(err);
    }
  };

  return { remove, isLoading, error };
};

// Get My Projects
export const useGetMyProjects = () => {
  const { data, error, isLoading, refetch } = useGetMyProjectsQuery(undefined);

  // PROJECTS
  const myProjects = data?.data || [];

  // DEBUG
  console.log("My Projects Response:", data);

  // ERROR DEBUG
  if (error) {
    console.log("My Projects Error:", error);
  }

  return {
    myProjects,
    isLoading,
    isError: !!error,
    error,
    refetch,
  };
};
