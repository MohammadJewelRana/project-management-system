"use client";

import {
  HiOutlineChartSquareBar,
  HiOutlineFolder,
  HiOutlineClipboardCheck,
} from "react-icons/hi";

interface Props {
  completedTasks: number;

  totalTasks: number;

  projects: any[];
}

export const ProductivityOverview =
  ({
    completedTasks,
    totalTasks,
    projects,
  }: Props) => {
    const productivity =
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

          rounded-[20px]
          sm:rounded-[24px]

          border
          border-white/[0.06]

          bg-[#101114]

          p-4
          sm:p-5
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

            bg-violet-500/10

            blur-3xl
          "
        />

        <div className="relative z-10">
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
              <HiOutlineChartSquareBar className="text-2xl" />
            </div>

            <div>
              <h2
                className="
                  text-base
                  font-black
                  text-white
                "
              >
                Overview
              </h2>

              <p
                className="
                  mt-1

                  text-[10px]
                  text-zinc-500
                "
              >
                Workspace insights
              </p>
            </div>
          </div>

          {/* PERCENT */}
          <div className="mt-6">
            <h2
              className="
                text-4xl
                font-black
                text-white
              "
            >
              {productivity}%
            </h2>

            <p
              className="
                mt-1

                text-sm
                text-zinc-500
              "
            >
              Overall Productivity
            </p>
          </div>

          {/* BAR */}
          <div
            className="
              mt-5

              h-3
              overflow-hidden

              rounded-full

              bg-white/[0.06]
            "
          >
            <div
              style={{
                width: `${productivity}%`,
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

          {/* INFO */}
          <div
            className="
              mt-6

              space-y-4
            "
          >
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
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-xl

                    bg-blue-500/10

                    text-blue-400
                  "
                >
                  <HiOutlineFolder />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-zinc-500
                    "
                  >
                    Projects
                  </p>

                  <h3
                    className="
                      text-sm
                      font-bold
                      text-white
                    "
                  >
                    {projects?.length ||
                      0}
                  </h3>
                </div>
              </div>
            </div>

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
                    h-10
                    w-10
                    items-center
                    justify-center

                    rounded-xl

                    bg-emerald-500/10

                    text-emerald-400
                  "
                >
                  <HiOutlineClipboardCheck />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      text-zinc-500
                    "
                  >
                    Completed
                  </p>

                  <h3
                    className="
                      text-sm
                      font-bold
                      text-white
                    "
                  >
                    {completedTasks}/
                    {totalTasks}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };