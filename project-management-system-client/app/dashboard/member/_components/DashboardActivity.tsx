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
        rounded-[24px]

        border
        border-white/[0.06]

        bg-[#101114]

        p-5

        sm:p-6
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-2xl

            bg-violet-500/10

            text-violet-400
          "
        >
          <HiOutlineLightningBolt className="text-2xl" />
        </div>

        <div>
          <h2
            className="
              text-xl
              font-black
              text-white
            "
          >
            Activity Timeline
          </h2>

          <p
            className="
              mt-1

              text-xs
              text-zinc-500
            "
          >
            Recent workflow updates
          </p>
        </div>
      </div>

      {/* ACTIVITIES */}
      <div className="mt-8 space-y-6">
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
                  gap-4
                "
              >
                {/* LINE */}
                {index !==
                  tasks.length -
                    1 && (
                  <div
                    className="
                      absolute
                      left-4
                      top-10

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
                    h-8
                    w-8
                    items-center
                    justify-center

                    rounded-full

                    bg-violet-500/10

                    text-violet-400
                  "
                >
                  <HiOutlineLightningBolt className="text-sm" />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
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
                          gap-1.5

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
                        mt-3

                        text-[11px]
                        leading-6
                        text-zinc-400
                      "
                    >
                      Task progress updated to{" "}
                      {task?.progress || 0}
                      % with current status{" "}
                      {task?.status}.
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