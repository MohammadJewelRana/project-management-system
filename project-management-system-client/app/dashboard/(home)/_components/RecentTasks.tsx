"use client";

import Link from "next/link";

import {
  HiOutlineArrowRight,
  HiOutlineClipboardCheck,
} from "react-icons/hi";

export const RecentTasks = ({
  tasks,
}: any) => {
  return (
    <div
      className="
        rounded-[20px]
        sm:rounded-[24px]

        border
        border-white/[0.06]

        bg-[#101114]

        p-4
        sm:p-5
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
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-2xl

              bg-emerald-500/10

              text-emerald-400
            "
          >
            <HiOutlineClipboardCheck className="text-xl" />
          </div>

          <div>
            <h2
              className="
                text-base
                font-black
                text-white

                sm:text-lg
              "
            >
              Recent Tasks
            </h2>

            <p
              className="
                text-[10px]
                text-zinc-500
              "
            >
              Latest assigned tasks
            </p>
          </div>
        </div>

        <button
          className="
            flex
            items-center
            gap-2

            rounded-xl

            border
            border-white/[0.06]

            bg-white/[0.03]

            px-3
            py-2

            text-xs
            font-semibold
            text-white
          "
        >
          View All

          <HiOutlineArrowRight />
        </button>
      </div>

      {/* TASKS */}
      <div className="mt-6 space-y-3">
        {tasks
          ?.slice(0, 5)
          ?.map((task: any) => (
            <Link
              href={`/dashboard/member/tasks/${task?._id}`}
              key={task?._id}
            >
              <div
                className="
                  group

                  rounded-[18px]

                  border
                  border-white/[0.06]

                  bg-white/[0.03]

                  p-4

                  transition-all
                  duration-300

                  hover:border-violet-500/20
                  hover:bg-white/[0.05]
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <h3
                      className="
                        text-sm
                        font-bold
                        text-white
                      "
                    >
                      {task?.title}
                    </h3>

                    <p
                      className="
                        mt-2

                        line-clamp-2

                        text-[11px]
                        leading-5
                        text-zinc-500
                      "
                    >
                      {
                        task?.description
                      }
                    </p>
                  </div>

                  <div
                    className="
                      rounded-xl

                      bg-violet-500/10

                      px-3
                      py-1.5

                      text-[10px]
                      font-bold
                      uppercase

                      text-violet-300
                    "
                  >
                    {task?.status}
                  </div>
                </div>

                {/* PROGRESS */}
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
                        uppercase
                        tracking-wider
                        text-zinc-500
                      "
                    >
                      Progress
                    </span>

                    <span
                      className="
                        text-xs
                        font-bold
                        text-white
                      "
                    >
                      {task?.progress ||
                        0}
                      %
                    </span>
                  </div>

                  <div
                    className="
                      h-2.5
                      overflow-hidden

                      rounded-full

                      bg-white/[0.06]
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
            </Link>
          ))}
      </div>
    </div>
  );
};