// ======================================================
// app/dashboard/member/projects/page.tsx
// FULLY RESPONSIVE PREMIUM DESIGN
// ======================================================

"use client";

import { useEffect } from "react";

import Link from "next/link";

import toast from "react-hot-toast";

import {
  HiOutlineArrowRight,
  HiOutlineClipboardCheck,
  HiOutlineFolder,
  HiOutlineLightningBolt,
} from "react-icons/hi";

import LoadingSpinner from "@/app/loading";

import { useGetMyProjects } from "@/store/hooks/project.hook";

import { MemberProjectGrid } from "./_components/MemberProjectGrid";

export default function MemberProjectsPage() {
  // ======================================================
  // API
  // ======================================================

  const {
    myProjects,
    isLoading,
    isError,
  } = useGetMyProjects();

  // ======================================================
  // ERROR
  // ======================================================

  useEffect(() => {
    if (isError) {
      toast.error(
        "Failed to fetch my projects!",
      );
    }
  }, [isError]);

  // ======================================================
  // LOADING
  // ======================================================

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // ======================================================
  // ANALYTICS
  // ======================================================

  const totalProjects =
    myProjects?.length || 0;

  const activeProjects =
    myProjects?.filter(
      (project: any) =>
        project?.status === "active",
    )?.length || 0;

  const completedProjects =
    myProjects?.filter(
      (project: any) =>
        project?.status === "completed",
    )?.length || 0;

  const totalTasks = myProjects?.reduce(
    (acc: number, project: any) =>
      acc +
      (project?.totalTaskCount || 0),
    0,
  );

  return (
    <div
      className="
        space-y-6
        sm:space-y-7
        lg:space-y-8
      "
    >
      {/* ======================================================
          HERO SECTION
      ====================================================== */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/[0.06]
          bg-gradient-to-br
          from-[#111827]
          via-[#0F172A]
          to-[#09090B]
          p-5
          sm:rounded-[32px]
          sm:p-6
          lg:p-8
          xl:p-10
        "
      >
        {/* BG EFFECT */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_35%)]" />

        <div className="relative z-10">
          <div
            className="
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

            <div className="max-w-2xl">
              {/* BADGE */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-blue-500/20
                  bg-blue-500/10
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-blue-400
                  sm:px-4
                  sm:text-sm
                "
              >
                <HiOutlineFolder className="text-base sm:text-lg" />

                My Workspace
              </div>

              {/* TITLE */}
              <h1
                className="
                  mt-5
                  text-3xl
                  font-black
                  leading-tight
                  tracking-tight
                  text-white
                  sm:mt-6
                  sm:text-4xl
                  lg:text-5xl
                  xl:text-6xl
                "
              >
                My Projects
              </h1>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-zinc-400
                  sm:text-base
                  lg:text-lg
                "
              >
                Track assigned projects,
                sprint progress, task
                updates, and team
                collaboration from one
                unified productivity
                workspace.
              </p>

              {/* ACTION BUTTONS */}
              <div
                className="
                  mt-7
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:flex-wrap
                "
              >
                {/* TASKS */}
                <Link
                  href="/dashboard/member/tasks"
                  className="
                    group
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-gradient-to-r
                    from-blue-500
                    to-violet-500
                    px-6
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_0_40px_rgba(59,130,246,0.25)]
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    sm:h-13
                    sm:w-auto
                    sm:px-7
                  "
                >
                  View My Tasks

                  <HiOutlineArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                {/* SPRINTS */}
                <Link
                  href="/dashboard/member/sprints"
                  className="
                    flex
                    h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.03]
                    px-6
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:bg-white/[0.06]
                    sm:h-13
                    sm:w-auto
                    sm:px-7
                  "
                >
                  View Sprints
                </Link>
              </div>
            </div>

            {/* ======================================================
                RIGHT ANALYTICS
            ====================================================== */}

            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:gap-4
                xl:max-w-md
              "
            >
              {/* CARD */}
              <div
                className="
                  rounded-3xl
                  border
                  border-white/[0.06]
                  bg-white/[0.04]
                  p-4
                  backdrop-blur-xl
                  sm:p-5
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-500/10
                    text-blue-400
                    sm:h-12
                    sm:w-12
                  "
                >
                  <HiOutlineFolder className="text-xl sm:text-2xl" />
                </div>

                <h3
                  className="
                    mt-4
                    text-2xl
                    font-black
                    text-white
                    sm:mt-5
                    sm:text-3xl
                  "
                >
                  {totalProjects}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-zinc-500
                    sm:text-sm
                  "
                >
                  Total Projects
                </p>
              </div>

              {/* CARD */}
              <div
                className="
                  rounded-3xl
                  border
                  border-white/[0.06]
                  bg-white/[0.04]
                  p-4
                  backdrop-blur-xl
                  sm:p-5
                "
              >
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
                    sm:h-12
                    sm:w-12
                  "
                >
                  <HiOutlineLightningBolt className="text-xl sm:text-2xl" />
                </div>

                <h3
                  className="
                    mt-4
                    text-2xl
                    font-black
                    text-white
                    sm:mt-5
                    sm:text-3xl
                  "
                >
                  {activeProjects}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-zinc-500
                    sm:text-sm
                  "
                >
                  Active Projects
                </p>
              </div>

              {/* CARD */}
              <div
                className="
                  rounded-3xl
                  border
                  border-white/[0.06]
                  bg-white/[0.04]
                  p-4
                  backdrop-blur-xl
                  sm:p-5
                "
              >
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
                    sm:h-12
                    sm:w-12
                  "
                >
                  <HiOutlineClipboardCheck className="text-xl sm:text-2xl" />
                </div>

                <h3
                  className="
                    mt-4
                    text-2xl
                    font-black
                    text-white
                    sm:mt-5
                    sm:text-3xl
                  "
                >
                  {totalTasks}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-zinc-500
                    sm:text-sm
                  "
                >
                  Total Tasks
                </p>
              </div>

              {/* CARD */}
              <div
                className="
                  rounded-3xl
                  border
                  border-white/[0.06]
                  bg-white/[0.04]
                  p-4
                  backdrop-blur-xl
                  sm:p-5
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-orange-500/10
                    text-orange-400
                    sm:h-12
                    sm:w-12
                  "
                >
                  <HiOutlineFolder className="text-xl sm:text-2xl" />
                </div>

                <h3
                  className="
                    mt-4
                    text-2xl
                    font-black
                    text-white
                    sm:mt-5
                    sm:text-3xl
                  "
                >
                  {completedProjects}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-zinc-500
                    sm:text-sm
                  "
                >
                  Completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          SECTION HEADER
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* LEFT */}
        <div>
          <h2
            className="
              text-2xl
              font-black
              text-white
              sm:text-3xl
            "
          >
            Assigned Projects
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-zinc-500
              sm:text-base
            "
          >
            Projects currently assigned
            to your workspace
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap gap-3">
          <div
            className="
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.03]
              px-4
              py-3
              text-xs
              text-zinc-400
              sm:px-5
              sm:text-sm
            "
          >
            {totalProjects} Projects
          </div>

          <div
            className="
              rounded-2xl
              border
              border-blue-500/20
              bg-blue-500/10
              px-4
              py-3
              text-xs
              font-medium
              text-blue-400
              sm:px-5
              sm:text-sm
            "
          >
            {activeProjects} Active
          </div>
        </div>
      </div>

      {/* ======================================================
          EMPTY STATE
      ====================================================== */}

      {!isLoading &&
        myProjects?.length === 0 && (
          <div
            className="
              flex
              min-h-[340px]
              flex-col
              items-center
              justify-center
              rounded-[28px]
              border
              border-dashed
              border-white/[0.08]
              bg-white/[0.02]
              px-6
              py-12
              text-center
              sm:min-h-[420px]
              sm:px-10
            "
          >
            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-[28px]
                bg-blue-500/10
                text-blue-400
                sm:h-24
                sm:w-24
              "
            >
              <HiOutlineFolder className="text-4xl sm:text-5xl" />
            </div>

            <h3
              className="
                mt-7
                text-2xl
                font-black
                text-white
                sm:mt-8
                sm:text-3xl
              "
            >
              No Assigned Projects
            </h3>

            <p
              className="
                mt-4
                max-w-md
                text-sm
                leading-7
                text-zinc-500
                sm:text-base
              "
            >
              You are currently not
              assigned to any projects.
              Once assigned, project
              progress and sprint
              information will appear
              here.
            </p>
          </div>
        )}

      {/* ======================================================
          PROJECT GRID
      ====================================================== */}

      {myProjects?.length > 0 && (
        <MemberProjectGrid
          projects={myProjects}
        />
      )}
    </div>
  );
}