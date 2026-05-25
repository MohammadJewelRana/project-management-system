"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi";

interface Props {
  task: any;
}

export const TaskCard = ({ task }: Props) => {
  const [showActions, setShowActions] = useState(false);

  const actionRef = useRef<HTMLDivElement>(null);

  /* ======================================================
     CLOSE ACTION ON OUTSIDE CLICK
  ====================================================== */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ======================================================
     PRIORITY COLORS
  ====================================================== */

  const priorityColors: any = {
    low: "bg-zinc-500/10 text-zinc-300",

    medium: "bg-blue-500/10 text-blue-400",

    high: "bg-orange-500/10 text-orange-400",

    urgent: "bg-red-500/10 text-red-400",
  };

  /* ======================================================
     STATUS COLORS
  ====================================================== */

  const statusColors: any = {
    todo: "bg-zinc-500/10 text-zinc-300",

    "in-progress": "bg-blue-500/10 text-blue-400",

    review: "bg-pink-500/10 text-pink-400",

    done: "bg-emerald-500/10 text-emerald-400",

    blocked: "bg-red-500/10 text-red-400",
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="
        relative
        overflow-visible
        rounded-[28px]
        border
        border-white/[0.06]
        bg-[#111113]
        p-5
      "
    >
      {/* ======================================================
          TOP
      ====================================================== */}

      <div className="flex items-start justify-between gap-3">
        {/* LEFT */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-white">
            {task.title}
          </h3>

          <p
            className="
              mt-2
              line-clamp-2
              text-sm
              leading-6
              text-zinc-500
            "
          >
            {task.description || "No description added."}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* PRIORITY */}
          <div
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </div>

          {/* ACTION */}
          <div ref={actionRef} className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-2xl
                border
                border-white/[0.06]
                bg-[#18181B]
                text-zinc-400
                transition-all
                hover:text-white
              "
            >
              <HiOutlineDotsVertical className="text-lg" />
            </button>

            {/* DROPDOWN */}
            {showActions && (
              <div
                className="
                  absolute
                  right-0
                  top-12
                  z-50
                  w-52
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-[#18181B]
                  shadow-2xl
                "
              >
                {/* VIEW DETAILS */}
                <Link
                  href={`/dashboard/tasks/${task._id}`}
                  onClick={() => setShowActions(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-white
                    transition-all
                    hover:bg-white/[0.05]
                  "
                >
                  <HiOutlineEye className="text-lg" />
                  View Details
                </Link>

                {/* EDIT */}
                <Link
                  href={`/dashboard/tasks/edit/${task._id}`}
                  onClick={() => setShowActions(false)}
                  className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-white
                    transition-all
                    hover:bg-white/[0.05]
                  "
                >
                  <HiOutlinePencil className="text-lg" />
                  Edit Task
                </Link>

                {/* DELETE */}
                <button
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-red-400
                    transition-all
                    hover:bg-red-500/10
                  "
                >
                  <HiOutlineTrash className="text-lg" />
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="my-5 border-t border-white/[0.06]" />

      {/* INFO */}
      <div className="space-y-4">
        {/* ASSIGNEE */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              bg-blue-500/10
            "
          >
            <HiOutlineUser className="text-lg text-blue-400" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-zinc-500">Assignee</p>

            <h4 className="truncate text-sm font-medium text-white">
              {task?.assignee?.name || "Unassigned"}
            </h4>
          </div>
        </div>

        {/* DUE DATE */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              bg-pink-500/10
            "
          >
            <HiOutlineCalendar className="text-lg text-pink-400" />
          </div>

          <div>
            <p className="text-xs text-zinc-500">Due Date</p>

            <h4 className="text-sm font-medium text-white">
              {task?.dueDate
                ? new Date(task.dueDate).toLocaleDateString("en-GB")
                : "No Deadline"}
            </h4>
          </div>
        </div>

        {/* HOURS */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              bg-orange-500/10
            "
          >
            <HiOutlineClock className="text-lg text-orange-400" />
          </div>

          <div>
            <p className="text-xs text-zinc-500">Estimated Hours</p>

            <h4 className="text-sm font-medium text-white">
              {task.estimatedHours} Hours
            </h4>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-between gap-3">
        {/* STATUS */}
        <div
          className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColors[task.status]}`}
        >
          {task.status}
        </div>

        {/* PROGRESS */}
        <div className="text-sm font-semibold text-white">{task.progress}%</div>
      </div>
    </motion.div>
  );
};
