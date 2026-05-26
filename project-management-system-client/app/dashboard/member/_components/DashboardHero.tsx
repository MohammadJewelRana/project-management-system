"use client";

import {
  HiOutlineSparkles,
  HiOutlineLightningBolt,
} from "react-icons/hi";

interface Props {
  projects: any[];
  tasks: any[];
}

export const DashboardHero = ({
  projects,
  tasks,
}: Props) => {
  const completed =
    tasks?.filter(
      (task) =>
        task?.status === "done",
    )?.length || 0;

  const progress =
    tasks?.length > 0
      ? Math.round(
          (completed /
            tasks.length) *
            100,
        )
      : 0;

  return (
    <div
      className="
        relative
        overflow-hidden

        rounded-[22px]
        sm:rounded-[26px]

        border
        border-white/[0.06]

        bg-[#101114]

        p-4
        sm:p-6
        lg:p-7
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          -right-20
          -top-20

          h-72
          w-72

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

          h-52
          w-52

          rounded-full

          bg-blue-500/10

          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10

          flex
          flex-col
          gap-6

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* LEFT */}
        <div className="max-w-3xl">
          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-violet-500/20

              bg-violet-500/10

              px-4
              py-2

              text-[10px]
              font-semibold
              uppercase
              tracking-wider

              text-violet-300
            "
          >
            <HiOutlineSparkles />

            Member Workspace
          </div>

          <h1
            className="
              mt-5

              text-2xl
              font-black
              leading-tight
              text-white

              sm:text-4xl
              lg:text-5xl
            "
          >
            Welcome Back 🚀
          </h1>

          <p
            className="
              mt-4

              max-w-2xl

              text-[11px]
              leading-6
              text-zinc-400

              sm:text-sm
              sm:leading-7
            "
          >
            Track assigned projects,
            monitor sprint productivity,
            and manage workflow
            progress from one dashboard.
          </p>

          {/* QUICK INFO */}
          <div
            className="
              mt-6

              flex
              flex-wrap
              gap-3
            "
          >
            <div
              className="
                rounded-2xl

                border
                border-white/[0.06]

                bg-white/[0.03]

                px-4
                py-3
              "
            >
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-zinc-500
                "
              >
                Projects
              </p>

              <h3
                className="
                  mt-1

                  text-xl
                  font-black
                  text-white
                "
              >
                {projects?.length ||
                  0}
              </h3>
            </div>

            <div
              className="
                rounded-2xl

                border
                border-white/[0.06]

                bg-white/[0.03]

                px-4
                py-3
              "
            >
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-zinc-500
                "
              >
                Tasks
              </p>

              <h3
                className="
                  mt-1

                  text-xl
                  font-black
                  text-white
                "
              >
                {tasks?.length || 0}
              </h3>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
            w-full

            rounded-[22px]

            border
            border-white/[0.06]

            bg-white/[0.03]

            p-5

            sm:max-w-[280px]
          "
        >
          <div className="flex items-center gap-4">
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
              <HiOutlineLightningBolt className="text-2xl" />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-zinc-500
                "
              >
                Productivity
              </p>

              <h2
                className="
                  text-3xl
                  font-black
                  text-white

                  sm:text-4xl
                "
              >
                {progress}%
              </h2>
            </div>
          </div>

          {/* BAR */}
          <div
            className="
              mt-5

              h-3
              overflow-hidden

              rounded-full

              bg-white/[0.05]
            "
          >
            <div
              style={{
                width: `${progress}%`,
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