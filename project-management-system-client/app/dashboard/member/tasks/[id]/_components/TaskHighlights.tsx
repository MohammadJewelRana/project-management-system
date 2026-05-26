"use client";

import { HiOutlineSparkles } from "react-icons/hi";

export const TaskHighlights = () => {
  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-[22px]

        border
        border-violet-500/20

        bg-gradient-to-br
        from-violet-500/10
        via-indigo-500/5
        to-blue-500/10

        p-4

        sm:p-5
        lg:p-6
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          -right-10
          -top-10

          h-40
          w-40

          rounded-full

          bg-violet-500/20

          blur-3xl
        "
      />

      <div className="relative z-10 flex gap-4">
        {/* ICON */}
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-2xl

            bg-violet-500

            text-white

            shadow-[0_0_30px_rgba(139,92,246,0.45)]
          "
        >
          <HiOutlineSparkles className="text-2xl" />
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <h2
            className="
              text-base
              font-black
              text-white

              sm:text-lg
            "
          >
            Task Workflow Enabled
          </h2>

          <p
            className="
              mt-2

              max-w-3xl

              text-[11px]
              leading-6
              text-zinc-300

              sm:text-sm
            "
          >
            This task supports workflow tracking,
            sprint collaboration,
            progress monitoring,
            and review-based completion process.

            Comment system and activity logs
            will be connected with backend soon.
          </p>
        </div>
      </div>
    </div>
  );
};