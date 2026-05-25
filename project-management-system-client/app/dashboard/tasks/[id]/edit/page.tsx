"use client";

import { useParams } from "next/navigation";

import { EditTaskForm } from "../../_components/EditTaskForm";

import { useGetAllProjects } from "@/store/hooks/project.hook";

import { useGetAllSprints } from "@/store/hooks/sprint.hook";

import { useGetAllUsers } from "@/store/hooks/user.hook";

import {
  useGetSingleTask,
  useUpdateTask,
} from "@/store/hooks/task.hook";

export default function EditTaskPage() {
  const params = useParams();

  const id = params?.id as string;

  /* ======================================================
     GET SINGLE TASK
  ====================================================== */

  const {
    task,
    isLoading: taskLoading,
  } = useGetSingleTask(id);

  /* ======================================================
     UPDATE TASK
  ====================================================== */

  const {
    update,
    isLoading,
  } = useUpdateTask();

  /* ======================================================
     GET PROJECTS
  ====================================================== */

  const { allData: projects } =
    useGetAllProjects({
      page: 1,
      limit: 100,
    });

  /* ======================================================
     GET SPRINTS
  ====================================================== */

  const { sprints } =
    useGetAllSprints({
      page: 1,
      limit: 100,
    });

  /* ======================================================
     GET USERS
  ====================================================== */

  const { users } =
    useGetAllUsers({
      page: 1,
      limit: 100,
    });

  /* ======================================================
     HANDLE UPDATE
  ====================================================== */

  const handleUpdate =
    async (data: any) => {
      const payload = {
        ...data,

        assignee:
          data.assignee ||
          undefined,

        sprint:
          data.sprint ||
          undefined,

        estimatedHours:
          Number(
            data.estimatedHours
          ) || 0,

        tags: data.tags
          ? data.tags
              .split(",")
              .map(
                (
                  item: string
                ) =>
                  item.trim()
              )
              .filter(Boolean)
          : [],
      };

      await update(id, payload);
    };

  /* ======================================================
     LOADING
  ====================================================== */

  if (taskLoading) {
    return (
      <div
        className="
          flex
          min-h-[400px]
          items-center
          justify-center
          rounded-[32px]
          border
          border-white/[0.06]
          bg-[#111113]
        "
      >
        <div className="space-y-4 text-center">
          <div
            className="
              mx-auto
              h-12
              w-12
              animate-spin
              rounded-full
              border-2
              border-blue-500
              border-t-transparent
            "
          />

          <p className="text-sm text-zinc-500">
            Loading Task...
          </p>
        </div>
      </div>
    );
  }

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className="space-y-6">
      {/* TOPBAR */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Edit Task
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Update task information
          and workflow
        </p>
      </div>

      {/* FORM */}
      <div
        className="
          overflow-hidden
          rounded-[32px]
          border
          border-white/[0.06]
          bg-[#111113]
        "
      >
        <EditTaskForm
          initialData={task}
          onSubmit={
            handleUpdate
          }
          isLoading={isLoading}
          projects={projects || []}
          sprints={sprints || []}
          users={users || []}
        />
      </div>
    </div>
  );
}