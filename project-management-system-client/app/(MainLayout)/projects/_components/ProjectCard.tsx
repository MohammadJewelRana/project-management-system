// components/projects/project-card.tsx

"use client";

import {
  HiOutlineFolder,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineDotsVertical,
} from "react-icons/hi";

import { motion } from "framer-motion";

interface ProjectCardProps {
  project: any;
}

const statusColors: Record<string, string> = {
  planned: "bg-zinc-700/20 text-zinc-300",
  active: "bg-blue-500/15 text-blue-400",
  completed: "bg-emerald-500/15 text-emerald-400",
  archived: "bg-zinc-800 text-zinc-500",
  "on-hold": "bg-amber-500/15 text-amber-400",
};

const priorityColors: Record<string, string> = {
  low: "bg-zinc-700/20 text-zinc-300",
  medium: "bg-blue-500/15 text-blue-400",
  high: "bg-orange-500/15 text-orange-400",
  urgent: "bg-red-500/15 text-red-400",
};

export function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#111113] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-white/[0.1]"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-violet-500/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* TOP */}
      <div className="relative flex items-start justify-between">
        {/* LEFT */}
        <div className="flex gap-4">
          {/* ICON */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl" />

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <HiOutlineFolder className="text-[22px]" />
            </div>
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              {project.title}
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              {project.client}
            </p>
          </div>
        </div>

        {/* ACTION */}
        <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-zinc-500 opacity-0 transition-all duration-300 hover:bg-white/[0.05] hover:text-white group-hover:opacity-100">
          <HiOutlineDotsVertical className="text-lg" />
        </button>
      </div>

      {/* DESCRIPTION */}
      <p className="relative mt-5 line-clamp-2 text-sm leading-relaxed text-zinc-500">
        {project.description}
      </p>

      {/* TAGS */}
      <div className="relative mt-5 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[project.status]}`}
        >
          {project.status}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${priorityColors[project.priority]}`}
        >
          {project.priority}
        </span>
      </div>

      {/* PROGRESS */}
      <div className="relative mt-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm text-zinc-400">
            Progress
          </p>

          <p className="text-sm font-semibold text-white">
            {project.progress}%
          </p>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            style={{
              width: `${project.progress}%`,
            }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400"
          />
        </div>

        <div className="mt-2 flex justify-between text-xs text-zinc-500">
          <span>
            {project.completedTaskCount}/
            {project.totalTaskCount} tasks
          </span>

          <span>
            {project.estimatedHours}h est.
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
        {/* MEMBERS */}
        <div className="flex items-center gap-2 text-zinc-500">
          <HiOutlineUsers className="text-lg" />

          <span className="text-sm">
            {project.members.length} members
          </span>
        </div>

        {/* DATE */}
        <div className="flex items-center gap-2 text-zinc-500">
          <HiOutlineCalendar className="text-lg" />

          <span className="text-sm">
            {new Date(
              project.endDate
            ).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}