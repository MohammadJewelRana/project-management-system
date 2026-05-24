"use client";

import { motion } from "framer-motion";

import {
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineUser,
} from "react-icons/hi";

interface Props {
  sprint: any;
}

export const SprintCard = ({
  sprint,
}: Props) => {
  const statusColors: any = {
    planned:
      "bg-zinc-500/10 text-zinc-300",
    active:
      "bg-blue-500/10 text-blue-400",
    completed:
      "bg-emerald-500/10 text-emerald-400",
    cancelled:
      "bg-red-500/10 text-red-400",
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="
        rounded-[32px]
        border
        border-white/[0.06]
        bg-[#111113]
        p-6
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-white">
            {sprint.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
            {sprint.goal ||
              "No sprint goal added."}
          </p>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColors[sprint.status]}`}
        >
          {sprint.status}
        </div>
      </div>

      <div className="my-5 border-t border-white/[0.06]" />

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <HiOutlineClipboardList className="text-lg text-blue-400" />

          {sprint?.project?.title ||
            "No Project"}
        </div>

        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <HiOutlineUser className="text-lg text-emerald-400" />

          {sprint?.sprintManager
            ?.name || "No Manager"}
        </div>

        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <HiOutlineCalendar className="text-lg text-orange-400" />

          {new Date(
            sprint.startDate
          ).toLocaleDateString()}{" "}
          -
          {" "}
          {new Date(
            sprint.endDate
          ).toLocaleDateString()}
        </div>
      </div>

      {/* PROGRESS */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-zinc-400">
            Progress
          </span>

          <span className="text-sm font-medium text-white">
            {sprint.progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${sprint.progress}%`,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-indigo-500
            "
          />
        </div>
      </div>

      {/* TASKS */}
      <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/[0.06] bg-[#18181B] px-4 py-3">
        <span className="text-sm text-zinc-400">
          Tasks
        </span>

        <span className="text-sm font-semibold text-white">
          {sprint.completedTasks}/
          {sprint.totalTasks}
        </span>
      </div>
    </motion.div>
  );
};