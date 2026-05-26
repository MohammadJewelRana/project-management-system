"use client";

import {
  HiOutlineTrendingUp,
} from "react-icons/hi";

export const WeeklyPerformance = ({
  completedTasks,
  totalTasks,
}: any) => {
  const percentage =
    totalTasks > 0
      ? Math.round(
          (completedTasks /
            totalTasks) *
            100,
        )
      : 0;

  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-[24px]

        border
        border-white/[0.06]

        bg-gradient-to-br
        from-violet-500/10
        via-indigo-500/5
        to-blue-500/10

        p-6
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          -right-10
          -top-10

          h-52
          w-52

          rounded-full

          bg-violet-500/10

          blur-3xl
        "
      />

      <div className="relative z-10">
        {/* ICON */}
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            bg-gradient-to-r
            from-violet-500
            to-blue-500

            text-white
          "
        >
          <HiOutlineTrendingUp className="text-2xl" />
        </div>

        <p
          className="
            mt-5

            text-[10px]
            uppercase
            tracking-widest
            text-violet-300
          "
        >
          Weekly Summary
        </p>

        <h2
          className="
            mt-3

            text-3xl
            font-black
            text-white
          "
        >
          {percentage}% Productivity
        </h2>

        <p
          className="
            mt-4

            text-sm
            leading-7
            text-zinc-300
          "
        >
          You completed{" "}
          {completedTasks} out of{" "}
          {totalTasks} assigned tasks.
          Keep improving your sprint
          workflow and collaboration 🚀
        </p>

        {/* BAR */}
        <div
          className="
            mt-6

            h-3
            overflow-hidden

            rounded-full

            bg-white/[0.08]
          "
        >
          <div
            style={{
              width: `${percentage}%`,
            }}
            className="
              h-full

              rounded-full

              bg-gradient-to-r
              from-violet-500
              via-indigo-500
              to-blue-500
            "
          />
        </div>
      </div>
    </div>
  );
};