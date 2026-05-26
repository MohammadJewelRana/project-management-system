// ======================================================
// PREMIUM RESPONSIVE PROJECT GRID
// SHORT HEIGHT + PREMIUM SAAS CARD
// SMART GRID SYSTEM
// ======================================================

"use client";

import Link from "next/link";

import {
  HiOutlineArrowRight,
  HiOutlineClipboardCheck,
  HiOutlineUsers,
} from "react-icons/hi";

interface Props {
  projects: any[];
}

export const MemberProjectGrid = ({ projects }: Props) => {
  return (
    <div
      className={`
        grid
        gap-5
        sm:gap-6

        ${
          projects?.length === 1
            ? "grid-cols-1 xl:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2"
        }
      `}
    >
      {projects?.map((project) => {
        const progress = project?.progress || 0;

        const completed = project?.completedTaskCount || 0;

        const total = project?.totalTaskCount || 0;

        return (
          <Link
            key={project?._id}
            href={`/dashboard/member/projects/${project?._id}`}
            className="
              group
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/[0.06]
              bg-[#101114]
              p-5
              transition-all
              duration-500
              hover:-translate-y-1.5
              hover:border-blue-500/20
              hover:shadow-[0_25px_80px_rgba(59,130,246,0.14)]

              sm:p-6
            "
          >
            {/* ======================================================
                GLOW
            ====================================================== */}

            <div
              className="
                absolute
                inset-0
                opacity-0
                transition-opacity
                duration-500
                group-hover:opacity-100
                bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_35%)]
              "
            />

            {/* ======================================================
                TOP
            ====================================================== */}

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                {/* LEFT */}
                <div className="min-w-0 flex-1">
                  {/* BADGES */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div
                      className="
                        rounded-full
                        border
                        border-blue-500/20
                        bg-blue-500/10
                        px-3
                        py-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-blue-400
                        sm:text-xs
                      "
                    >
                      {project?.status}
                    </div>

                    <div
                      className="
                        rounded-full
                        border
                        border-orange-500/20
                        bg-orange-500/10
                        px-3
                        py-1
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wide
                        text-orange-400
                        sm:text-xs
                      "
                    >
                      {project?.priority}
                    </div>
                  </div>

                  {/* TITLE */}
                  <h2
                    className="
                      mt-4
                      line-clamp-1
                      text-2xl
                      font-black
                      tracking-tight
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-blue-400

                      sm:text-[28px]
                    "
                  >
                    {project?.title}
                  </h2>

                  {/* DESC */}
                  <p
                    className="
                      mt-3
                      line-clamp-2
                      max-w-xl
                      text-sm
                      leading-7
                      text-zinc-500

                      sm:text-[15px]
                    "
                  >
                    {project?.description}
                  </p>
                </div>

                {/* BUTTON */}
                <div
                  className="
                    hidden
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-3xl
                    border
                    border-white/[0.06]
                    bg-white/[0.03]
                    text-white
                    transition-all
                    duration-300
                    group-hover:border-blue-500/20
                    group-hover:bg-blue-500/10
                    group-hover:text-blue-400

                    sm:flex
                  "
                >
                  <HiOutlineArrowRight className="text-2xl transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              {/* ======================================================
                  CLIENT
              ====================================================== */}

              <div
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.03]
                  px-4
                  py-2
                "
              >
                <div className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs font-medium text-zinc-300 sm:text-sm">
                  {project?.client}
                </span>
              </div>

              {/* ======================================================
                  PROGRESS SECTION
              ====================================================== */}

              <div
                className="
                  mt-6
                  rounded-[26px]
                  border
                  border-white/[0.06]
                  bg-white/[0.03]
                  p-4

                  sm:p-5
                "
              >
                {/* TOP */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-zinc-500 sm:text-sm">
                      Project Progress
                    </p>

                    <h3
                      className="
                        mt-2
                        text-3xl
                        font-black
                        text-white
                      "
                    >
                      {progress}%
                    </h3>
                  </div>

                  {/* TASK INFO */}
                  <div className="text-right">
                    <p className="text-xs text-zinc-500 sm:text-sm">
                      Completed
                    </p>

                    <h4 className="mt-2 text-xl font-black text-white">
                      {completed}/{total}
                    </h4>
                  </div>
                </div>

                {/* BAR */}
                <div className="mt-5">
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
                        width: `${progress}%`,
                      }}
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-blue-500
                        via-indigo-500
                        to-violet-500
                        transition-all
                        duration-700
                      "
                    />
                  </div>
                </div>
              </div>

              {/* ======================================================
                  FOOTER
              ====================================================== */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                {/* MEMBERS */}
                <div className="flex items-center gap-3">
                  {/* ICON */}
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
                    <HiOutlineUsers className="text-xl" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="text-xs text-zinc-500 sm:text-sm">
                      Team Members
                    </p>

                    <h4 className="mt-1 text-lg font-black text-white">
                      {project?.members?.length || 0}
                    </h4>
                  </div>
                </div>

                {/* TASKS */}
                <div className="flex items-center gap-3">
                  {/* ICON */}
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
                    <HiOutlineClipboardCheck className="text-xl" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <p className="text-xs text-zinc-500 sm:text-sm">
                      Total Tasks
                    </p>

                    <h4 className="mt-1 text-lg font-black text-white">
                      {total}
                    </h4>
                  </div>
                </div>

                {/* MOBILE BUTTON */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.03]
                    text-white
                    transition-all
                    duration-300
                    group-hover:border-blue-500/20
                    group-hover:bg-blue-500/10
                    group-hover:text-blue-400

                    sm:hidden
                  "
                >
                  <HiOutlineArrowRight className="text-xl" />
                </div>
              </div>

              {/* ======================================================
                  TECH STACK
              ====================================================== */}

              {project?.technologies?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {project?.technologies
                    ?.slice(0, 4)
                    ?.map((tech: string, index: number) => (
                      <div
                        key={index}
                        className="
                            rounded-full
                            border
                            border-white/[0.06]
                            bg-white/[0.03]
                            px-3
                            py-1.5
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-wide
                            text-zinc-300

                            sm:text-xs
                          "
                      >
                        {tech}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
