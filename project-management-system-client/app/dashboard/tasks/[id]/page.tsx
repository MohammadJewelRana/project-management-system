"use client";

import Link from "next/link";

import { useParams } from "next/navigation";

import { motion } from "framer-motion";

import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineClipboardCheck,
  HiOutlineCollection,
  HiOutlineFlag,
  HiOutlinePencil,
  HiOutlineSparkles,
  HiOutlineUser,
} from "react-icons/hi";

import { useGetSingleTask } from "@/store/hooks/task.hook";

export default function TaskDetailsPage() {
  const params = useParams();

  const id = params?.id as string;

  const { task, isLoading } = useGetSingleTask(id);

  /* ======================================================
     COLORS
  ====================================================== */

  const priorityColors: any = {
    low: "bg-zinc-500/10 text-zinc-300",

    medium: "bg-blue-500/10 text-blue-400",

    high: "bg-orange-500/10 text-orange-400",

    urgent: "bg-red-500/10 text-red-400",
  };

  const statusColors: any = {
    todo: "bg-zinc-500/10 text-zinc-300",

    "in-progress": "bg-blue-500/10 text-blue-400",

    review: "bg-pink-500/10 text-pink-400",

    done: "bg-emerald-500/10 text-emerald-400",

    blocked: "bg-red-500/10 text-red-400",
  };

  /* ======================================================
     LOADING
  ====================================================== */

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="space-y-5 text-center">
          <div
            className="
              mx-auto
              h-14
              w-14
              animate-spin
              rounded-full
              border-[3px]
              border-blue-500/30
              border-t-blue-500
              md:h-16
              md:w-16
            "
          />

          <div>
            <h3 className="text-lg font-semibold text-white md:text-xl">
              Loading Task
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Preparing task details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 md:space-y-8">
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
        {/* BACKGROUND */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.18),transparent_35%)]
          "
        />

        <div
          className="
            absolute
            -top-24
            right-0
            h-80
            w-80
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
            p-4
            md:p-8
            lg:p-10
          "
        >
          {/* TOPBAR */}
          <div
            className="
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* LEFT */}
            <div className="flex items-start gap-3 md:gap-4">
              <Link
                href="/dashboard/tasks"
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.04]
                  text-zinc-300
                  backdrop-blur-xl
                  transition-all
                  hover:bg-white/[0.08]
                  hover:text-white
                  md:h-14
                  md:w-14
                "
              >
                <HiOutlineArrowLeft className="text-xl md:text-2xl" />
              </Link>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <HiOutlineSparkles className="text-base text-blue-400 md:text-lg" />

                  <span className="text-xs font-medium text-blue-400 md:text-sm">
                    Task Overview
                  </span>
                </div>

                <h1
                  className="
                    mt-2
                    break-words
                    text-2xl
                    font-black
                    tracking-tight
                    text-white
                    sm:text-3xl
                    md:mt-3
                    md:text-5xl
                  "
                >
                  {task?.title}
                </h1>

                <p
                  className="
                    mt-3
                    max-w-3xl
                    text-sm
                    leading-7
                    text-zinc-400
                    md:mt-4
                    md:text-base
                    md:leading-8
                  "
                >
                  {task?.description || "No task description added."}
                </p>
              </div>
            </div>

            {/* EDIT BUTTON */}
            <Link
              href={`/dashboard/tasks/edit/${task?._id}`}
              className="
                flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-blue-500
                to-indigo-500
                px-5
                text-sm
                font-medium
                text-white
                shadow-[0_0_40px_rgba(59,130,246,0.35)]
                transition-all
                hover:scale-[1.01]
                sm:w-fit
                md:h-14
                md:gap-3
                md:px-6
              "
            >
              <HiOutlinePencil className="text-lg md:text-xl" />
              Edit Task
            </Link>
          </div>

          {/* BADGES */}
          <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-8 md:gap-3">
            <div
              className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize md:px-4 md:py-2 md:text-sm ${priorityColors[task?.priority]}`}
            >
              {task?.priority}
            </div>

            <div
              className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize md:px-4 md:py-2 md:text-sm ${statusColors[task?.status]}`}
            >
              {task?.status}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ======================================================
          STATS GRID
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
          md:gap-5
        "
      >
        {/* PROJECT */}
        <motion.div
          whileHover={{
            y: -4,
          }}
          className="
            rounded-[24px]
            border
            border-white/[0.06]
            bg-[#111113]
            p-4
            md:rounded-[32px]
            md:p-5
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
              md:h-14
              md:w-14
            "
          >
            <HiOutlineCollection className="text-2xl text-blue-400 md:text-3xl" />
          </div>

          <p
            className="
              mt-4
              text-[11px]
              uppercase
              tracking-wider
              text-zinc-500
              md:mt-5
              md:text-xs
            "
          >
            Project
          </p>

          <h3
            className="
              mt-2
              break-words
              text-lg
              font-bold
              text-white
              md:text-xl
            "
          >
            {task?.project?.title || "No Project"}
          </h3>
        </motion.div>

        {/* ASSIGNEE */}
        <motion.div
          whileHover={{
            y: -4,
          }}
          className="
            rounded-[24px]
            border
            border-white/[0.06]
            bg-[#111113]
            p-4
            md:rounded-[32px]
            md:p-5
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
              bg-emerald-500/10
              md:h-14
              md:w-14
            "
          >
            <HiOutlineUser className="text-2xl text-emerald-400 md:text-3xl" />
          </div>

          <p
            className="
              mt-4
              text-[11px]
              uppercase
              tracking-wider
              text-zinc-500
              md:mt-5
              md:text-xs
            "
          >
            Assignee
          </p>

          <h3
            className="
              mt-2
              break-words
              text-lg
              font-bold
              text-white
              md:text-xl
            "
          >
            {task?.assignee?.name || "Unassigned"}
          </h3>
        </motion.div>

        {/* HOURS */}
        <motion.div
          whileHover={{
            y: -4,
          }}
          className="
            rounded-[24px]
            border
            border-white/[0.06]
            bg-[#111113]
            p-4
            md:rounded-[32px]
            md:p-5
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
              bg-orange-500/10
              md:h-14
              md:w-14
            "
          >
            <HiOutlineClock className="text-2xl text-orange-400 md:text-3xl" />
          </div>

          <p
            className="
              mt-4
              text-[11px]
              uppercase
              tracking-wider
              text-zinc-500
              md:mt-5
              md:text-xs
            "
          >
            Estimated Hours
          </p>

          <h3
            className="
              mt-2
              text-lg
              font-bold
              text-white
              md:text-xl
            "
          >
            {task?.estimatedHours} Hours
          </h3>
        </motion.div>

        {/* DUE DATE */}
        <motion.div
          whileHover={{
            y: -4,
          }}
          className="
            rounded-[24px]
            border
            border-white/[0.06]
            bg-[#111113]
            p-4
            md:rounded-[32px]
            md:p-5
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
              bg-pink-500/10
              md:h-14
              md:w-14
            "
          >
            <HiOutlineCalendar className="text-2xl text-pink-400 md:text-3xl" />
          </div>

          <p
            className="
              mt-4
              text-[11px]
              uppercase
              tracking-wider
              text-zinc-500
              md:mt-5
              md:text-xs
            "
          >
            Due Date
          </p>

          <h3
            className="
              mt-2
              break-words
              text-lg
              font-bold
              text-white
              md:text-xl
            "
          >
            {task?.dueDate
              ? new Date(task.dueDate).toLocaleDateString("en-GB")
              : "No Deadline"}
          </h3>
        </motion.div>
      </div>

      {/* ======================================================
          DETAILS SECTION
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-white/[0.06]
          bg-[#111113]
          md:rounded-[40px]
        "
      >
        {/* HEADER */}
        <div
          className="
            border-b
            border-white/[0.06]
            p-4
            md:p-6
          "
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-indigo-500/10
                md:h-12
                md:w-12
              "
            >
              <HiOutlineClipboardCheck className="text-xl text-indigo-400 md:text-2xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl">
                Task Information
              </h2>

              <p className="mt-1 text-xs leading-6 text-zinc-500 md:text-sm">
                Complete overview of task workflow and planning
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            p-4
            md:grid-cols-2
            md:gap-6
            md:p-6
          "
        >
          {/* STATUS */}
          <div
            className="
              rounded-3xl
              border
              border-white/[0.06]
              bg-[#18181B]
              p-4
              md:p-5
            "
          >
            <p className="text-xs text-zinc-500 md:text-sm">Current Status</p>

            <h3 className="mt-3 text-lg font-bold capitalize text-white md:text-xl">
              {task?.status}
            </h3>
          </div>

          {/* PRIORITY */}
          <div
            className="
              rounded-3xl
              border
              border-white/[0.06]
              bg-[#18181B]
              p-4
              md:p-5
            "
          >
            <p className="text-xs text-zinc-500 md:text-sm">Priority Level</p>

            <h3 className="mt-3 text-lg font-bold capitalize text-white md:text-xl">
              {task?.priority}
            </h3>
          </div>

          {/* SPRINT */}
          <div
            className="
              rounded-3xl
              border
              border-white/[0.06]
              bg-[#18181B]
              p-4
              md:p-5
            "
          >
            <p className="text-xs text-zinc-500 md:text-sm">Sprint</p>

            <h3 className="mt-3 break-words text-lg font-bold text-white md:text-xl">
              {task?.sprint?.name || "No Sprint"}
            </h3>
          </div>

          {/* PROGRESS */}
          <div
            className="
              rounded-3xl
              border
              border-white/[0.06]
              bg-[#18181B]
              p-4
              md:p-5
            "
          >
            <p className="text-xs text-zinc-500 md:text-sm">Progress</p>

            <h3 className="mt-3 text-lg font-bold text-white md:text-xl">
              {task?.progress || 0}%
            </h3>
          </div>
        </div>
      </motion.div>

      {/* ======================================================
          TAGS
      ====================================================== */}

      {task?.tags?.length > 0 && (
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
            overflow-hidden
            rounded-[28px]
            border
            border-white/[0.06]
            bg-[#111113]
            p-4
            md:rounded-[40px]
            md:p-6
          "
        >
          {/* HEADER */}
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-blue-500/10
                md:h-12
                md:w-12
              "
            >
              <HiOutlineFlag className="text-xl text-blue-400 md:text-2xl" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl">
                Task Tags
              </h2>

              <p className="mt-1 text-xs text-zinc-500 md:text-sm">
                Labels and related keywords
              </p>
            </div>
          </div>

          {/* TAGS */}
          <div className="mt-5 flex flex-wrap gap-2 md:mt-6 md:gap-3">
            {task?.tags?.map((tag: string, index: number) => (
              <div
                key={index}
                className="
                    rounded-full
                    border
                    border-white/[0.06]
                    bg-white/[0.04]
                    px-4
                    py-2
                    text-xs
                    font-medium
                    text-zinc-300
                    md:px-5
                    md:py-2.5
                    md:text-sm
                  "
              >
                #{tag}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
