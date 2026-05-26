// ======================================================
// app/dashboard/projects/[id]/_components/ProjectHero.tsx
// ======================================================

"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineUserGroup,
} from "react-icons/hi";

interface Props {
  project: any;

  analytics: any;
}

export const ProjectHero = ({
  project,

  analytics,
}: Props) => {
  const statusColors: any = {
    planned:
      "bg-zinc-500/10 text-zinc-300",

    active:
      "bg-blue-500/10 text-blue-400",

    "on-hold":
      "bg-yellow-500/10 text-yellow-400",

    completed:
      "bg-emerald-500/10 text-emerald-400",

    archived:
      "bg-red-500/10 text-red-400",
  };

  const priorityColors: any = {
    low: "bg-zinc-500/10 text-zinc-300",

    medium:
      "bg-blue-500/10 text-blue-400",

    high:
      "bg-orange-500/10 text-orange-400",

    urgent:
      "bg-red-500/10 text-red-400",
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.06]
        bg-[#111113]
        md:rounded-[40px]
      "
    >
      {/* BG */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.15),transparent_30%)]
        "
      />

      <div className="relative z-10 p-5 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          {/* LEFT */}
          <div className="flex-1">
            {/* BACK */}
            <Link
              href="/dashboard/projects"
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.03]
                px-4
                py-3
                text-sm
                text-zinc-300
                transition-all
                hover:bg-white/[0.06]
                hover:text-white
              "
            >
              <HiOutlineArrowLeft className="text-lg" />

              Back To Projects
            </Link>

            {/* TITLE */}
            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                text-white
                md:text-5xl
              "
            >
              {project?.title}
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-5
                max-w-4xl
                text-sm
                leading-7
                text-zinc-400
                md:text-base
              "
            >
              {project?.description}
            </p>

            {/* BADGES */}
            <div className="mt-5 flex flex-wrap gap-3">
              <div
                className={`
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-medium
                  capitalize
                  ${statusColors[project?.status]}
                `}
              >
                {project?.status}
              </div>

              <div
                className={`
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-medium
                  capitalize
                  ${priorityColors[project?.priority]}
                `}
              >
                {project?.priority}
              </div>
            </div>

            {/* TECHNOLOGIES */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold text-white">
                Technologies
              </h3>

              <div className="flex flex-wrap gap-3">
                {project?.technologies?.map(
                  (
                    tech: string,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="
                        rounded-full
                        border
                        border-white/[0.06]
                        bg-white/[0.03]
                        px-4
                        py-2
                        text-sm
                        text-zinc-300
                      "
                    >
                      {tech}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* TAGS */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold text-white">
                Tags
              </h3>

              <div className="flex flex-wrap gap-3">
                {project?.tags?.map(
                  (
                    tag: string,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="
                        rounded-full
                        bg-indigo-500/10
                        px-4
                        py-2
                        text-sm
                        text-indigo-400
                      "
                    >
                      #{tag}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              w-full
              max-w-md
              rounded-[28px]
              border
              border-white/[0.06]
              bg-white/[0.03]
              p-5
            "
          >
            {/* PROGRESS */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-zinc-400">
                  Project Progress
                </span>

                <span className="text-sm font-semibold text-white">
                  {analytics?.progress ||
                    0}
                  %
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  style={{
                    width: `${
                      analytics?.progress ||
                      0
                    }%`,
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    to-indigo-500
                  "
                />
              </div>
            </div>

            {/* INFO */}
            <div className="mt-6 space-y-4">
              {/* CLIENT */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-500/10
                  "
                >
                  <HiOutlineUserGroup className="text-xl text-blue-400" />
                </div>

                <div>
                  <p className="text-xs text-zinc-500">
                    Client
                  </p>

                  <h4 className="text-sm font-medium text-white">
                    {project?.client}
                  </h4>
                </div>
              </div>

              {/* BUDGET */}
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
                  "
                >
                  <HiOutlineCurrencyDollar className="text-xl text-emerald-400" />
                </div>

                <div>
                  <p className="text-xs text-zinc-500">
                    Budget
                  </p>

                  <h4 className="text-sm font-medium text-white">
                    {project?.budget}{" "}
                    {project?.currency}
                  </h4>
                </div>
              </div>

              {/* TIMELINE */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-orange-500/10
                  "
                >
                  <HiOutlineCalendar className="text-xl text-orange-400" />
                </div>

                <div>
                  <p className="text-xs text-zinc-500">
                    Timeline
                  </p>

                  <h4 className="text-sm font-medium text-white">
                    {new Date(
                      project?.startDate
                    ).toLocaleDateString(
                      "en-GB"
                    )}{" "}
                    -
                    {" "}
                    {new Date(
                      project?.endDate
                    ).toLocaleDateString(
                      "en-GB"
                    )}
                  </h4>
                </div>
              </div>

              {/* HOURS */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-pink-500/10
                  "
                >
                  <HiOutlineClock className="text-xl text-pink-400" />
                </div>

                <div>
                  <p className="text-xs text-zinc-500">
                    Estimated Hours
                  </p>

                  <h4 className="text-sm font-medium text-white">
                    {
                      project?.estimatedHours
                    }{" "}
                    Hours
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};