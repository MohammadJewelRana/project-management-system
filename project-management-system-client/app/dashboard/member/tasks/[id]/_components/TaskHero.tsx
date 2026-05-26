"use client";

import {
  HiOutlineCalendar,
  HiOutlineClipboardCheck,
  HiOutlineClock,
  HiOutlineSparkles,
} from "react-icons/hi";

interface TaskHeroProps {
  task: any;
}

export const TaskHero = ({
  task,
}: TaskHeroProps) => {
  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-[22px]

        sm:rounded-[26px]
        lg:rounded-[32px]

        border
        border-white/[0.06]

        bg-[#101114]

        p-4

        sm:p-5
        lg:p-7
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          -right-16
          -top-16

          h-60
          w-60

          rounded-full

          bg-violet-500/10

          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0

          h-40
          w-40

          rounded-full

          bg-blue-500/10

          blur-3xl
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* TOP */}
        <div
          className="
            flex
            flex-col
            gap-4

            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          {/* LEFT */}
          <div className="flex-1">
            {/* BADGES */}
            <div className="flex flex-wrap gap-2">
              {/* PRIORITY */}
              <div
                className={`
                  inline-flex
                  items-center

                  rounded-full

                  px-3
                  py-1.5

                  text-[10px]
                  font-semibold
                  uppercase

                  ${
                    task?.priority ===
                    "urgent"
                      ? "bg-red-500/10 text-red-400"
                      : task?.priority ===
                          "high"
                        ? "bg-orange-500/10 text-orange-400"
                        : task?.priority ===
                            "medium"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-zinc-500/10 text-zinc-400"
                  }
                `}
              >
                {task?.priority}
              </div>

              {/* STATUS */}
              <div
                className={`
                  inline-flex
                  items-center

                  rounded-full

                  px-3
                  py-1.5

                  text-[10px]
                  font-semibold
                  uppercase

                  ${
                    task?.status ===
                    "done"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : task?.status ===
                          "review"
                        ? "bg-orange-500/10 text-orange-400"
                        : task?.status ===
                            "in-progress"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-zinc-500/10 text-zinc-400"
                  }
                `}
              >
                {task?.status}
              </div>
            </div>

            {/* TITLE */}
            <h1
              className="
                mt-5

                text-2xl
                font-black
                leading-tight
                text-white

                sm:text-3xl
                lg:text-4xl
              "
            >
              {task?.title}
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-4

                max-w-4xl

                text-[11px]
                leading-6
                text-zinc-400

                sm:text-sm
                sm:leading-7
              "
            >
              {task?.description ||
                "No description available for this task."}
            </p>
          </div>

          {/* RIGHT PROGRESS */}
          <div
            className="
              flex
              min-w-[120px]
              flex-col
              items-center
              justify-center

              rounded-[22px]

              border
              border-white/[0.06]

              bg-white/[0.03]

              px-5
              py-4

              lg:min-w-[150px]
            "
          >
            <div
              className="
                text-3xl
                font-black
                text-white

                sm:text-4xl
              "
            >
              {task?.progress || 0}%
            </div>

            <p
              className="
                mt-2

                text-[10px]
                uppercase
                tracking-wider
                text-zinc-500
              "
            >
              Progress
            </p>
          </div>
        </div>

        {/* INFO CARDS */}
        <div
          className="
            mt-7

            grid
            gap-3

            grid-cols-2

            lg:grid-cols-4
          "
        >
          {/* PROJECT */}
          <div
            className="
              rounded-[18px]

              border
              border-white/[0.06]

              bg-white/[0.03]

              p-4
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-2xl

                bg-violet-500/10

                text-violet-400
              "
            >
              <HiOutlineClipboardCheck className="text-xl" />
            </div>

            <p
              className="
                mt-4

                text-[10px]
                uppercase
                tracking-wider
                text-zinc-500
              "
            >
              Project
            </p>

            <h3
              className="
                mt-1

                line-clamp-1

                text-sm
                font-bold
                text-white
              "
            >
              {task?.project?.title ||
                "No Project"}
            </h3>
          </div>

          {/* SPRINT */}
          <div
            className="
              rounded-[18px]

              border
              border-white/[0.06]

              bg-white/[0.03]

              p-4
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-2xl

                bg-blue-500/10

                text-blue-400
              "
            >
              <HiOutlineSparkles className="text-xl" />
            </div>

            <p
              className="
                mt-4

                text-[10px]
                uppercase
                tracking-wider
                text-zinc-500
              "
            >
              Sprint
            </p>

            <h3
              className="
                mt-1

                line-clamp-1

                text-sm
                font-bold
                text-white
              "
            >
              {task?.sprint?.name ||
                "No Sprint"}
            </h3>
          </div>

          {/* DUE DATE */}
          <div
            className="
              rounded-[18px]

              border
              border-white/[0.06]

              bg-white/[0.03]

              p-4
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-2xl

                bg-orange-500/10

                text-orange-400
              "
            >
              <HiOutlineCalendar className="text-xl" />
            </div>

            <p
              className="
                mt-4

                text-[10px]
                uppercase
                tracking-wider
                text-zinc-500
              "
            >
              Due Date
            </p>

            <h3
              className="
                mt-1

                text-sm
                font-bold
                text-white
              "
            >
              {task?.dueDate
                ? new Date(
                    task?.dueDate,
                  ).toLocaleDateString()
                : "No Date"}
            </h3>
          </div>

          {/* HOURS */}
          <div
            className="
              rounded-[18px]

              border
              border-white/[0.06]

              bg-white/[0.03]

              p-4
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-2xl

                bg-emerald-500/10

                text-emerald-400
              "
            >
              <HiOutlineClock className="text-xl" />
            </div>

            <p
              className="
                mt-4

                text-[10px]
                uppercase
                tracking-wider
                text-zinc-500
              "
            >
              Estimated
            </p>

            <h3
              className="
                mt-1

                text-sm
                font-bold
                text-white
              "
            >
              {task?.estimatedHours || 0}h
            </h3>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mt-7">
          <div className="mb-2 flex items-center justify-between">
            <span
              className="
                text-xs
                font-medium
                text-zinc-400
              "
            >
              Completion Progress
            </span>

            <span
              className="
                text-xs
                font-semibold
                text-white
              "
            >
              {task?.progress || 0}%
            </span>
          </div>

          <div
            className="
              h-3
              overflow-hidden

              rounded-full

              bg-white/[0.05]
            "
          >
            <div
              style={{
                width: `${
                  task?.progress || 0
                }%`,
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
    </div>
  );
};