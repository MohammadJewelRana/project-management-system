// ======================================================
// PROJECT DETAILS HERO
// SHOW REAL PROJECT DATA
// PREMIUM RESPONSIVE DESIGN
// ======================================================

"use client";

import {
  HiOutlineCalendar,
  HiOutlineClipboardCheck,
  HiOutlineFolder,
  HiOutlineLightningBolt,
  HiOutlineUsers,
} from "react-icons/hi";

interface Props {
  project: any;

  analytics: any;
}

export const MemberProjectHero = ({
  project,
  analytics,
}: Props) => {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/[0.06]
        bg-[#0E1015]
        p-5

        sm:p-6
        lg:p-8
        xl:p-10
      "
    >
      {/* ======================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      {/* BLUE GLOW */}
      <div
        className="
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      {/* VIOLET GLOW */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-60
          w-60
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />

      {/* GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
          [background-size:40px_40px]
        "
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          gap-8

          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >
        {/* ======================================================
            LEFT
        ====================================================== */}

        <div className="max-w-3xl">
          {/* STATUS */}
          <div className="flex flex-wrap items-center gap-3">
            {/* STATUS */}
            <div
              className="
                rounded-full
                border
                border-blue-500/20
                bg-blue-500/10
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-blue-400

                sm:text-sm
              "
            >
              {project?.status}
            </div>

            {/* PRIORITY */}
            <div
              className="
                rounded-full
                border
                border-orange-500/20
                bg-orange-500/10
                px-4
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-orange-400

                sm:text-sm
              "
            >
              {project?.priority}
            </div>

            {/* CLIENT */}
            <div
              className="
                rounded-full
                border
                border-emerald-500/20
                bg-emerald-500/10
                px-4
                py-2
                text-xs
                font-semibold
                text-emerald-400

                sm:text-sm
              "
            >
              {project?.client}
            </div>
          </div>

          {/* TITLE */}
          <h1
            className="
              mt-6
              text-4xl
              font-black
              leading-tight
              tracking-tight
              text-white

              sm:text-5xl
              xl:text-6xl
            "
          >
            {project?.title}
          </h1>

          {/* DESCRIPTION */}
          <p
            className="
              mt-5
              max-w-3xl
              text-sm
              leading-7
              text-zinc-400

              sm:text-base
              lg:text-lg
            "
          >
            {project?.description}
          </p>

          {/* ======================================================
              INFO ROW
          ====================================================== */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-4
            "
          >
            {/* DATE */}
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.03]
                px-4
                py-3
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

              <div>
                <p className="text-xs text-zinc-500">
                  Timeline
                </p>

                <h4 className="text-sm font-semibold text-white">
                  {new Date(
                    project?.startDate,
                  ).toLocaleDateString()}{" "}
                  -{" "}
                  {new Date(
                    project?.endDate,
                  ).toLocaleDateString()}
                </h4>
              </div>
            </div>

            {/* MEMBERS */}
            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.03]
                px-4
                py-3
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
                <HiOutlineUsers className="text-xl" />
              </div>

              <div>
                <p className="text-xs text-zinc-500">
                  Members
                </p>

                <h4 className="text-sm font-semibold text-white">
                  {analytics?.totalMembers ||
                    0}{" "}
                  Team Members
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            RIGHT ANALYTICS
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-4

            xl:min-w-[420px]
          "
        >
          {/* ======================================================
              CARD
          ====================================================== */}

          <div
            className="
              rounded-[28px]
              border
              border-white/[0.06]
              bg-white/[0.04]
              p-5
              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-blue-500/10
                text-blue-400
              "
            >
              <HiOutlineFolder className="text-2xl" />
            </div>

            <h3
              className="
                mt-5
                text-3xl
                font-black
                text-white

                sm:text-4xl
              "
            >
              {analytics?.progress || 0}%
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Project Progress
            </p>
          </div>

          {/* ======================================================
              CARD
          ====================================================== */}

          <div
            className="
              rounded-[28px]
              border
              border-white/[0.06]
              bg-white/[0.04]
              p-5
              backdrop-blur-xl
            "
          >
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
              <HiOutlineClipboardCheck className="text-2xl" />
            </div>

            <h3
              className="
                mt-5
                text-3xl
                font-black
                text-white

                sm:text-4xl
              "
            >
              {analytics?.totalTasks || 0}
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Total Tasks
            </p>
          </div>

          {/* ======================================================
              CARD
          ====================================================== */}

          <div
            className="
              rounded-[28px]
              border
              border-white/[0.06]
              bg-white/[0.04]
              p-5
              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-emerald-500/10
                text-emerald-400
              "
            >
              <HiOutlineLightningBolt className="text-2xl" />
            </div>

            <h3
              className="
                mt-5
                text-3xl
                font-black
                text-white

                sm:text-4xl
              "
            >
              {analytics?.totalSprints ||
                0}
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Total Sprints
            </p>
          </div>

          {/* ======================================================
              CARD
          ====================================================== */}

          <div
            className="
              rounded-[28px]
              border
              border-white/[0.06]
              bg-white/[0.04]
              p-5
              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-orange-500/10
                text-orange-400
              "
            >
              <HiOutlineUsers className="text-2xl" />
            </div>

            <h3
              className="
                mt-5
                text-3xl
                font-black
                text-white

                sm:text-4xl
              "
            >
              {analytics?.totalMembers ||
                0}
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Team Members
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          BOTTOM PROGRESS
      ====================================================== */}

      <div className="relative z-10 mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">
            Overall Completion
          </h4>

          <span className="text-sm font-bold text-white">
            {analytics?.progress || 0}%
          </span>
        </div>

        {/* BAR */}
        <div
          className="
            h-4
            overflow-hidden
            rounded-full
            bg-white/[0.05]
          "
        >
          <div
            style={{
              width: `${
                analytics?.progress || 0
              }%`,
            }}
            className="
              relative
              h-full
              rounded-full
              bg-gradient-to-r
              from-blue-500
              via-indigo-500
              to-violet-500
            "
          >
            <div className="absolute inset-0 bg-white/20 blur-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};