"use client";

import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";

import { motion } from "framer-motion";

import {
  HiOutlineArrowLeft,
  HiOutlinePencilAlt,
  HiOutlineSparkles,
} from "react-icons/hi";

import { EditTaskForm } from "../_components/EditTaskForm";

import LoadingSpinner from "@/app/loading";

import { useGetAllProjects } from "@/store/hooks/project.hook";

import { useGetAllSprints } from "@/store/hooks/sprint.hook";

import { useGetAllUsers } from "@/store/hooks/user.hook";

import { useGetSingleTask, useUpdateTask } from "@/store/hooks/task.hook";

export default function EditTaskPage() {
  /* ======================================================
     ROUTER & QUERY
  ====================================================== */

  const router = useRouter();

  const searchParams = useSearchParams();

  const taskId = searchParams.get("id") || "";

  /* ======================================================
     GET SINGLE TASK
  ====================================================== */

  const { task, isLoading: taskLoading } = useGetSingleTask(taskId);

  /* ======================================================
     UPDATE TASK
  ====================================================== */

  const { update, isLoading } = useUpdateTask();

  /* ======================================================
     GET PROJECTS
  ====================================================== */

  const { allData: projects } = useGetAllProjects({
    page: 1,
    limit: 100,
  });

  /* ======================================================
     GET SPRINTS
  ====================================================== */

  const { sprints } = useGetAllSprints({
    page: 1,
    limit: 100,
  });

  /* ======================================================
     GET USERS
  ====================================================== */

  const { users } = useGetAllUsers({
    page: 1,
    limit: 100,
  });

  /* ======================================================
     FILTER MEMBERS
  ====================================================== */

  const members = users?.filter((user: any) => user.role === "member") || [];

  /* ======================================================
     HANDLE UPDATE
  ====================================================== */

  const handleUpdate = async (data: any) => {
    const payload = {
      ...data,

      assignee: data.assignee || undefined,

      sprint: data.sprint || undefined,

      estimatedHours: Number(data.estimatedHours) || 0,
    };
    const res = await update(taskId, payload);

    if (res?.success) {
      router.push(`/dashboard/tasks`);
    }
  };

  /* ======================================================
     LOADING
  ====================================================== */

  if (taskLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* ======================================================
          HERO SECTION
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/[0.06]
          bg-[#0F0F12]
          md:rounded-[40px]
        "
      >
        {/* BG EFFECT */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.15),transparent_35%)]
          "
        />

        <div
          className="
            absolute
            -right-10
            -top-10
            h-52
            w-52
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-6
            p-5
            md:p-8
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* LEFT */}
          <div className="flex items-start gap-4">
            {/* BACK BUTTON */}
            <Link
              href={`/dashboard/tasks/${taskId}`}
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.04]
                text-zinc-300
                transition-all
                hover:bg-white/[0.08]
                hover:text-white
              "
            >
              <HiOutlineArrowLeft className="text-2xl" />
            </Link>

            {/* TEXT */}
            <div>
              <div className="flex items-center gap-2">
                <HiOutlineSparkles className="text-blue-400" />

                <span className="text-xs font-medium uppercase tracking-wider text-blue-400 md:text-sm">
                  Task Workflow
                </span>
              </div>

              <h1
                className="
                  mt-3
                  text-2xl
                  font-black
                  tracking-tight
                  text-white
                  md:text-4xl
                "
              >
                Edit Task
              </h1>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-7
                  text-zinc-400
                  md:text-base
                "
              >
                Update task details, workflow, assignee, sprint and project
                information.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="
              flex
              items-center
              gap-3
              self-start
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.03]
              px-5
              py-4
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-blue-500/10
              "
            >
              <HiOutlinePencilAlt className="text-2xl text-blue-400" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500">
                Editing
              </p>

              <h3 className="mt-1 text-sm font-semibold text-white md:text-base">
                {task?.title}
              </h3>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ======================================================
          FORM SECTION
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
        }}
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-white/[0.06]
          bg-[#111113]
          shadow-[0_0_50px_rgba(0,0,0,0.25)]
          md:rounded-[32px]
        "
      >
        <EditTaskForm
          initialData={task}
          onSubmit={handleUpdate}
          isLoading={isLoading}
          projects={projects || []}
          sprints={sprints || []}
          users={members}
        />
      </motion.div>
    </div>
  );
}
