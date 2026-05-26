"use client";

import { useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

interface Props {
  initialData: any;

  onSubmit: (data: any) => Promise<void>;

  isLoading?: boolean;

  projects: any[];

  sprints: any[];

  users: any[];
}

export const EditTaskForm = ({
  initialData,

  onSubmit,

  isLoading,

  projects,

  sprints,

  users,
}: Props) => {
  const {
    register,

    handleSubmit,

    watch,

    reset,
  } = useForm();

  /* ======================================================
     SET INITIAL VALUES
  ====================================================== */

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData?.title || "",

        description: initialData?.description || "",

        project: initialData?.project?._id || "",

        sprint: initialData?.sprint?._id || "",

        assignee: initialData?.assignee?._id || "",

        priority: initialData?.priority || "medium",

        status: initialData?.status || "todo",

        dueDate: initialData?.dueDate
          ? new Date(initialData.dueDate).toISOString().split("T")[0]
          : "",

        estimatedHours: initialData?.estimatedHours || 0,
      });
    }
  }, [initialData, reset]);

  /* ======================================================
     WATCH PROJECT
  ====================================================== */

  const selectedProject = watch("project");

  /* ======================================================
     FILTER SPRINTS
  ====================================================== */

  const filteredSprints = useMemo(() => {
    if (!selectedProject) {
      return sprints;
    }

    return (
      sprints?.filter(
        (sprint: any) =>
          sprint?.project?._id === selectedProject ||
          sprint?.project === selectedProject,
      ) || []
    );
  }, [selectedProject, sprints]);

  /* ======================================================
     FILTER MEMBERS
  ====================================================== */

  const memberUsers = useMemo(() => {
    return users?.filter((user: any) => user?.role === "member") || [];
  }, [users]);

  /* ======================================================
     SUBMIT
  ====================================================== */

  const handleUpdate = async (data: any) => {
    try {
      const payload = {
        ...data,

        assignee: data.assignee || undefined,

        sprint: data.sprint || undefined,

        estimatedHours: Number(data.estimatedHours) || 0,
      };

      await onSubmit(payload);
    } catch (error) {
      console.error(error);

      toast.error("Failed to update task!");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      {/* HEADER */}
      <div className="border-b border-white/[0.06] p-6">
        <h2 className="text-2xl font-bold text-white">Edit Task</h2>

        <p className="mt-2 text-sm text-zinc-500">
          Update task workflow and information
        </p>
      </div>

      {/* BODY */}
      <div className="grid gap-5 p-6 md:grid-cols-2">
        {/* TITLE */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">Task Title</label>

          <input
            {...register("title")}
            placeholder="Design Dashboard UI"
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#18181B]
              px-4
              text-white
              outline-none
            "
          />
        </div>

        {/* DESCRIPTION */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-zinc-400">
            Description
          </label>

          <textarea
            rows={5}
            {...register("description")}
            placeholder="Task description..."
            className="
              w-full
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#18181B]
              p-4
              text-white
              outline-none
            "
          />
        </div>

        {/* PROJECT */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">Project</label>

          <select
            {...register("project")}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#18181B]
              px-4
              text-white
              outline-none
            "
          >
            <option value="">Select Project</option>

            {projects?.map((project: any) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        {/* SPRINT */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">Sprint</label>

          <select
            {...register("sprint")}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#18181B]
              px-4
              text-white
              outline-none
            "
          >
            <option value="">Select Sprint</option>

            {filteredSprints?.map((sprint: any) => (
              <option key={sprint._id} value={sprint._id}>
                {sprint.name}
              </option>
            ))}
          </select>
        </div>

        {/* ASSIGNEE */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">Assignee</label>

          <select
            {...register("assignee")}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#18181B]
              px-4
              text-white
              outline-none
            "
          >
            <option value="">Select Assignee</option>

            {memberUsers?.map((user: any) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* PRIORITY */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">Priority</label>

          <select
            {...register("priority")}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#18181B]
              px-4
              text-white
              outline-none
            "
          >
            <option value="low">Low</option>

            <option value="medium">Medium</option>

            <option value="high">High</option>

            <option value="urgent">Urgent</option>
          </select>
        </div>

        {/* STATUS */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">Status</label>

          <select
            {...register("status")}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#18181B]
              px-4
              text-white
              outline-none
            "
          >
            <option value="todo">Todo</option>

            <option value="in-progress">In Progress</option>

            <option value="review">Review</option>

            <option value="done">Done</option>

            <option value="blocked">Blocked</option>
          </select>
        </div>

        {/* ESTIMATED HOURS */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Estimated Hours
          </label>

          <input
            type="number"
            {...register("estimatedHours")}
            placeholder="10"
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#18181B]
              px-4
              text-white
              outline-none
            "
          />
        </div>

        {/* DUE DATE */}
        <div>
          <label className="mb-2 block text-sm text-zinc-400">Due Date</label>

          <input
            type="date"
            {...register("dueDate")}
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#18181B]
              px-4
              text-white
              outline-none
            "
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-white/[0.06] p-6">
        <button
          type="submit"
          disabled={isLoading}
          className="
            flex
            h-12
            w-full
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-indigo-500
            text-sm
            font-medium
            text-white
            shadow-[0_0_30px_rgba(59,130,246,0.35)]
            transition-all
            duration-300
            hover:scale-[1.01]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isLoading ? "Updating..." : "Update Task"}
        </button>
      </div>
    </form>
  );
};
