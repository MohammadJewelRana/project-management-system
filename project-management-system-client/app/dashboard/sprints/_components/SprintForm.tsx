"use client";

import { useForm } from "react-hook-form";

interface Props {
  onSubmit: (data: any) => void;

  isLoading?: boolean;

  projects: any[];

  managers: any[];
}

export const SprintForm = ({
  onSubmit,
  isLoading,
  projects,
  managers,
}: Props) => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 p-6 md:grid-cols-2"
    >
      {/* NAME */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-zinc-400">Sprint Name</label>

        <input
          {...register("name")}
          placeholder="Sprint 01"
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

      {/* GOAL */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm text-zinc-400">Goal</label>

        <textarea
          {...register("goal")}
          rows={4}
          placeholder="Sprint goal..."
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

      {/* MANAGER */}
      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Sprint Manager
        </label>

        <select
          {...register("sprintManager")}
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
          <option value="">Select Manager</option>

          {managers?.map((manager: any) => (
            <option key={manager._id} value={manager._id}>
              {manager.name}
            </option>
          ))}
        </select>
      </div>

      {/* START DATE */}
      <div>
        <label className="mb-2 block text-sm text-zinc-400">Start Date</label>

        <input
          type="date"
          {...register("startDate")}
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

      {/* END DATE */}
      <div>
        <label className="mb-2 block text-sm text-zinc-400">End Date</label>

        <input
          type="date"
          {...register("endDate")}
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

      {/* STATUS */}
      <div className="md:col-span-2">
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
          <option value="planned">Planned</option>

          <option value="active">Active</option>

          <option value="completed">Completed</option>

          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* BUTTON */}
      <div className="md:col-span-2">
        <button
          disabled={isLoading}
          className="
            h-12
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-indigo-500
            text-sm
            font-medium
            text-white
          "
        >
          {isLoading ? "Creating..." : "Create Sprint"}
        </button>
      </div>
    </form>
  );
};
