"use client";

import { motion } from "framer-motion";

import {
  HiOutlineFolderOpen,
  HiOutlineSparkles,
  HiOutlinePlusCircle,
} from "react-icons/hi";

interface Props {
  onCreate?: () => void;
}

export const NoProjectsFound = ({ onCreate }: Props) => {
  return (
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
        duration: 0.3,
      }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/[0.06]
        bg-[#111113]
        p-6
        md:p-10
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[260px]
          w-[260px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* ICON */}
        <div
          className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-[28px]
            border
            border-blue-500/20
            bg-blue-500/10
            text-blue-400
            shadow-[0_0_40px_rgba(59,130,246,0.18)]
          "
        >
          <HiOutlineFolderOpen className="text-5xl" />
        </div>

        {/* BADGE */}
        <div
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-emerald-500/20
            bg-emerald-500/10
            px-4
            py-2
            text-sm
            font-medium
            text-emerald-400
          "
        >
          <HiOutlineSparkles className="text-lg" />
          Workspace Ready
        </div>

        {/* TITLE */}
        <h2
          className="
            mt-6
            text-3xl
            font-bold
            tracking-tight
            text-white
          "
        >
          No Projects Available
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
            mt-4
            max-w-2xl
            text-sm
            leading-7
            text-zinc-400
            md:text-base
          "
        >
          Your workspace does not contain any projects yet. Start by creating
          your first project to manage tasks, sprints, teams, analytics, and
          collaboration workflows.
        </p>

        {/* ACTION BUTTON */}
        <button
          onClick={onCreate}
          className="
            mt-8
            inline-flex
            h-12
            items-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-indigo-500
            px-5
            text-sm
            font-medium
            text-white
            shadow-[0_0_30px_rgba(59,130,246,0.35)]
            transition-all
            duration-300
            hover:scale-[1.02]
          "
        >
          <HiOutlinePlusCircle className="text-lg" />
          Create First Project
        </button>
      </div>
    </motion.div>
  );
};
