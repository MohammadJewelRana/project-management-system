"use client";

import Link from "next/link";

import {
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from "react-icons/hi";

export const RecentTasks = ({
  tasks,
}: any) => {
  return (
    <div
      className="
        rounded-[24px]

        border
        border-white/[0.06]

        bg-[#101114]

        p-5

        sm:p-6
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-xl
              font-black
              text-white
            "
          >
            Recent Tasks
          </h2>

          <p
            className="
              mt-1

              text-xs
              text-zinc-500
            "
          >
            Latest assigned workflow
          </p>
        </div>
      </div>

      {/* EMPTY */}
      {tasks?.length === 0 && (
        <div
          className="
            mt-6

            rounded-[20px]

            border
            border-dashed
            border-white/[0.08]

            bg-white/[0.02]

            p-10

            text-center
          "
        >
          <h3
            className="
              text-lg
              font-bold
              text-white
            "
          >
            No Tasks Assigned
          </h3>

          <p
            className="
              mt-2

              text-sm
              text-zinc-500
            "
          >
            Your assigned tasks will
            appear here.
          </p>
        </div>
      )}

      {/* TASKS */}
      <div className="mt-6 space-y-4">
        {tasks
          ?.slice(0, 5)
          ?.map((task: any) => (
            <Link
              key={task?._id}
              href={`/dashboard/member/tasks/${task?._id}`}
              className="
                block
              "
            >
              <div
                className="
                  rounded-[20px]

                  border
                  border-white/[0.06]

                  bg-white/[0.03]

                  p-4

                  transition-all
                  duration-300

                  hover:border-violet-500/20
                  hover:bg-violet-500/[0.04]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
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
                        <HiOutlineCheckCircle className="text-xl" />
                      </div>

                      <div>
                        <h3
                          className="
                            text-sm
                            font-bold
                            text-white

                            sm:text-base
                          "
                        >
                          {task?.title}
                        </h3>

                        <p
                          className="
                            mt-1

                            text-[10px]
                            uppercase
                            tracking-wider
                            text-zinc-500
                          "
                        >
                          {task?.status}
                        </p>
                      </div>
                    </div>

                    {/* BAR */}
                    <div className="mt-4">
                      <div
                        className="
                          mb-2

                          flex
                          items-center
                          justify-between
                        "
                      >
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
                            font-bold
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
                              task?.progress ||
                              0
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
                  </div>

                  <HiOutlineArrowRight className="text-xl text-zinc-500" />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};