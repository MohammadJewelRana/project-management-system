"use client";

import Link from "next/link";

import {
  HiOutlineArrowRight,
  HiOutlineCalendar,
  HiOutlineClipboardCheck,
  HiOutlineClock,
} from "react-icons/hi";

import LoadingSpinner from "@/app/loading";

import { useGetMyTasks } from "@/store/hooks/task.hook";

export default function MemberTasksPage() {
  const { myTasks, isLoading } =
    useGetMyTasks();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="
        space-y-4

        sm:space-y-5
        lg:space-y-6
      "
    >
      {/* ======================================================
          HERO
      ====================================================== */}

      <div
        className="
          rounded-[18px]

          sm:rounded-[24px]
          lg:rounded-[30px]

          border
          border-white/[0.06]

          bg-[#101114]

          p-4

          sm:p-5
          lg:p-6
        "
      >
        <div
          className="
            inline-flex
            items-center
            gap-2

            rounded-full

            bg-violet-500/10

            px-3
            py-1.5

            text-[10px]
            font-semibold
            uppercase
            tracking-wide
            text-violet-400
          "
        >
          <HiOutlineClipboardCheck />

          Task Workspace
        </div>

        <h1
          className="
            mt-4

            text-2xl
            font-black
            text-white

            sm:text-3xl
            lg:text-4xl
          "
        >
          My Tasks
        </h1>

        <p
          className="
            mt-3

            max-w-2xl

            text-[11px]
            leading-6
            text-zinc-400

            sm:text-sm
            sm:leading-7
          "
        >
          Manage assigned tasks,
          update workflow progress,
          and complete sprint work.
        </p>
      </div>

      {/* ======================================================
          EMPTY
      ====================================================== */}

      {myTasks?.length === 0 && (
        <div
          className="
            flex
            min-h-[240px]
            flex-col
            items-center
            justify-center

            rounded-[18px]

            border
            border-dashed
            border-white/[0.08]

            bg-white/[0.02]

            p-6

            text-center
          "
        >
          <h3
            className="
              text-xl
              font-black
              text-white
            "
          >
            No Tasks Found
          </h3>

          <p
            className="
              mt-2

              text-xs
              leading-6
              text-zinc-500

              sm:text-sm
            "
          >
            No task assigned yet.
          </p>
        </div>
      )}

      {/* ======================================================
          TASK GRID
      ====================================================== */}

      <div
        className="
          grid
          gap-4

          md:grid-cols-2

          2xl:grid-cols-3
        "
      >
        {myTasks?.map((task: any) => (
          <div
            key={task?._id}
            className="
              rounded-[18px]

              border
              border-white/[0.06]

              bg-[#101114]

              p-4

              transition-all
              duration-300

              hover:border-violet-500/20
              hover:bg-[#13151A]
            "
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div
                  className={`
                    inline-flex
                    rounded-full

                    px-2.5
                    py-1

                    text-[9px]
                    font-semibold
                    uppercase

                    ${
                      task?.priority ===
                      "urgent"
                        ? "bg-red-500/10 text-red-400"
                        : task?.priority ===
                            "high"
                          ? "bg-orange-500/10 text-orange-400"
                          : "bg-blue-500/10 text-blue-400"
                    }
                  `}
                >
                  {task?.priority}
                </div>

                <h2
                  className="
                    mt-3

                    line-clamp-2

                    text-lg
                    font-black
                    text-white
                  "
                >
                  {task?.title}
                </h2>

                <p
                  className="
                    mt-2

                    line-clamp-3

                    text-[11px]
                    leading-6
                    text-zinc-500
                  "
                >
                  {task?.description}
                </p>
              </div>

              {/* STATUS */}
              <div
                className={`
                  rounded-full

                  px-2.5
                  py-1

                  text-[9px]
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

            {/* PROGRESS */}
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <span
                  className="
                    text-[10px]
                    text-zinc-500
                  "
                >
                  Progress
                </span>

                <span
                  className="
                    text-[10px]
                    font-semibold
                    text-white
                  "
                >
                  {task?.progress || 0}%
                </span>
              </div>

              <div
                className="
                  h-2
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
                    to-blue-500
                  "
                />
              </div>
            </div>

            {/* INFO */}
            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-3
              "
            >
              {/* PROJECT */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-1.5

                  text-[10px]
                  text-zinc-400
                "
              >
                <HiOutlineClipboardCheck />

                {task?.project?.title}
              </div>

              {/* DUE DATE */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-1.5

                  text-[10px]
                  text-zinc-400
                "
              >
                <HiOutlineCalendar />

                {task?.dueDate
                  ? new Date(
                      task?.dueDate,
                    ).toLocaleDateString()
                  : "No date"}
              </div>

              {/* HOURS */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-1.5

                  text-[10px]
                  text-zinc-400
                "
              >
                <HiOutlineClock />

                {task?.estimatedHours}h
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-5">
              <Link
                href={`/dashboard/member/tasks/${task?._id}`}
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-2

                  rounded-2xl

                  bg-gradient-to-r
                  from-violet-500
                  to-blue-500

                  px-4
                  py-3

                  text-xs
                  font-semibold
                  text-white

                  transition-all
                  duration-300

                  hover:scale-[1.02]
                "
              >
                View Details

                <HiOutlineArrowRight
                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}