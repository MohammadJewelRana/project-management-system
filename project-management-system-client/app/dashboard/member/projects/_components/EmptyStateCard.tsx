// ======================================================
// app/components/shared/EmptyStateCard.tsx
// ======================================================

"use client";

import { motion } from "framer-motion";

interface Props {
  icon: React.ReactNode;

  title: string;

  description: string;

  action?: React.ReactNode;
}

export const EmptyStateCard = ({
  icon,

  title,

  description,

  action,
}: Props) => {
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
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.06]
        bg-[#111113]
        px-5
        py-14
        text-center
        sm:px-8
        sm:py-16
      "
    >
      {/* BG EFFECT */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_35%)]
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center">
        {/* ICON */}
        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-[28px]
            border
            border-white/[0.06]
            bg-white/[0.03]
            text-4xl
            text-blue-400
            shadow-[0_0_30px_rgba(59,130,246,0.15)]
            sm:h-24
            sm:w-24
          "
        >
          {icon}
        </div>

        {/* TITLE */}
        <h3
          className="
            mt-7
            text-xl
            font-black
            tracking-tight
            text-white
            sm:text-2xl
          "
        >
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className="
            mt-3
            max-w-md
            text-sm
            leading-7
            text-zinc-500
            sm:text-base
          "
        >
          {description}
        </p>

        {/* ACTION */}
        {action && <div className="mt-8">{action}</div>}
      </div>
    </motion.div>
  );
};
