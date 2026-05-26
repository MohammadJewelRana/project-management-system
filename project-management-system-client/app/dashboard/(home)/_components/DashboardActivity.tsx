"use client";

import {
  HiOutlineClock,
  HiOutlineLightningBolt,
} from "react-icons/hi";

export const DashboardActivity = ({
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
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-2xl

            bg-violet-500/10

            text-violet-400
          "
        >
          <HiOutlineLightningBolt className="text-xl" />
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
            Activity
          </h2>

          <p
            className="
              text-[10px]
              text-zinc-500
            "
          >
            Recent workflow updates
          </p>
        </div>
      </div>

      {/* ACTIVITIES */}
      <div className="mt-6 space-y-5">
        {tasks
          ?.slice(0, 5)
          ?.map(
            (
              task: any,
              index: number,
            ) => (
              <div
                key={task?._id}
                className="
                  relative

                  flex
                  gap-3
                "
              >
                {/* LINE */}
                {index !==
                  tasks.length -
                    1 && (
                  <div
                    className="
                      absolute
                      left-3.5
                      top-8

                      h-full
                      w-[1px]

                      bg-white/[0.08]
                    "
                  />
                )}

                {/* DOT */}
                <div
                  className="
                    relative
                    z-10

                    mt-1

                    flex
                    h-7
                    w-7
                    items-center
                    justify-center

                    rounded-full

                    bg-violet-500/10

                    text-violet-400
                  "
                >
                  <HiOutlineLightningBolt className="text-xs" />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <div
                    className="
                      rounded-[18px]

                      border
                      border-white/[0.06]

                      bg-white/[0.03]

                      p-3
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
                      <h3
                        className="
                          text-sm
                          font-bold
                          text-white
                        "
                      >
                        {task?.title}
                      </h3>

                      <div
                        className="
                          inline-flex
                          items-center
                          gap-1

                          text-[10px]
                          text-zinc-500
                        "
                      >
                        <HiOutlineClock />

                        {task?.status}
                      </div>
                    </div>

                    <p
                      className="
                        mt-2

                        text-[11px]
                        leading-5
                        text-zinc-400
                      "
                    >
                      Task updated to{" "}
                      {
                        task?.progress
                      }
                      % progress.
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
      </div>
    </div>
  );
};