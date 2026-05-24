// components/landing/workspace-card.tsx

"use client";

import { motion } from "framer-motion";

import {
  HiOutlineArrowRight,
  HiOutlineCheck,
} from "react-icons/hi";

interface WorkspaceCardProps {
  panel: {
    title: string;
    subtitle: string;
    icon: any;
    button: string;
    color: string;
  };
}

const WorkspaceCard = ({ panel }: WorkspaceCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/[0.12] sm:p-6 lg:p-8"
    >
      {/* BACKGROUND GLOW */}
      <div
        className={`absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br ${panel.color} blur-3xl`}
      />

      {/* HOVER GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-blue-500/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* CONTENT */}
      <div className="relative">
        {/* ICON */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.04] text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          <panel.icon className="text-[28px]" />
        </div>

        {/* TITLE */}
        <div className="mt-6">
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {panel.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-zinc-500 sm:text-base">
            {panel.subtitle}
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-8 space-y-4">
          {[
            "Project & sprint management",
            "Task tracking and updates",
            "Team collaboration workflow",
            "Real-time productivity insights",
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3"
            >
              {/* CHECK */}
              <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <HiOutlineCheck className="text-xs" />
              </div>

              {/* TEXT */}
              <p className="text-sm text-zinc-400">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button className="group/button mt-10 flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] text-sm font-semibold text-white transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06] sm:h-12 lg:h-14">
          {panel.button}

          <HiOutlineArrowRight className="text-lg transition-transform duration-300 group-hover/button:translate-x-1" />
        </button>
      </div>

      {/* BORDER EFFECT */}
      <div className="absolute inset-0 rounded-[28px] border border-transparent transition-all duration-500 group-hover:border-white/[0.04]" />
    </motion.div>
  );
}
export default WorkspaceCard;