// ======================================================
// app/dashboard/member/sprints/page.tsx
// SPRINT PAGE
// NUMBERED SPRINTS + EXPANDABLE TASK LIST
// PREMIUM RESPONSIVE DESIGN
// ======================================================

"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import toast from "react-hot-toast";

import LoadingSpinner from "@/app/loading";

import { useGetMySprints } from "@/store/hooks/sprint.hook";

import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineClipboardCheck,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineLightningBolt,
} from "react-icons/hi";

export default function MemberSprintsPage() {
  // ======================================================
  // API
  // ======================================================

  const { mySprints, isLoading, isError } = useGetMySprints();

  // ======================================================
  // STATE
  // ======================================================

  const [expandedSprint, setExpandedSprint] = useState<string | null>(null);

  // ======================================================
  // ERROR
  // ======================================================

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch sprints!");
    }
  }, [isError]);

  // ======================================================
  // LOADING
  // ======================================================

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // ======================================================
  // EMPTY
  // ======================================================

  if (mySprints?.length === 0) {
    return (
      <div className="space-y-4">
        {/* HERO */}
        <div
          className="
            rounded-[18px]

            sm:rounded-[22px]
            lg:rounded-[28px]

            border
            border-white/[0.06]

            bg-[#101114]

            p-4

            sm:p-5
            lg:p-6
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              bg-blue-500/10

              px-3
              py-1.5

              text-[10px]
              font-semibold
              uppercase
              tracking-wide
              text-blue-400

              sm:text-xs
            "
          >
            <HiOutlineLightningBolt />
            Sprint Workspace
          </div>

          <h1
            className="
              mt-4

              text-2xl
              font-black
              text-white

              sm:text-3xl
              lg:text-4xl
            "
          >
            My Sprints
          </h1>

          <p
            className="
              mt-3

              max-w-2xl

              text-[11px]
              leading-6
              text-zinc-400

              sm:text-sm
              sm:leading-7
            "
          >
            Manage sprint progress, monitor assigned tasks, and track sprint
            performance.
          </p>
        </div>

        {/* EMPTY */}
        <div
          className="
            flex
            min-h-[240px]
            flex-col
            items-center
            justify-center

            rounded-[18px]

            border
            border-dashed
            border-white/[0.08]

            bg-white/[0.02]

            p-6

            text-center
          "
        >
          <h2
            className="
              text-xl
              font-black
              text-white
            "
          >
            No Sprints Found
          </h2>

          <p
            className="
              mt-2

              text-xs
              leading-6
              text-zinc-500

              sm:text-sm
            "
          >
            No sprint assigned yet.
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // ANALYTICS
  // ======================================================

  const totalSprints = mySprints?.length || 0;

  const activeSprints =
    mySprints?.filter((sprint: any) => sprint?.status === "active")?.length ||
    0;

  const completedSprints =
    mySprints?.filter((sprint: any) => sprint?.status === "completed")
      ?.length || 0;

  // ======================================================
  // UI
  // ======================================================

  return (
    <div
      className="
        space-y-4

        sm:space-y-5
        lg:space-y-6
      "
    >
      {/* ======================================================
          HERO
      ====================================================== */}

      <div
        className="
          relative
          overflow-hidden

          rounded-[18px]

          sm:rounded-[22px]
          lg:rounded-[28px]

          border
          border-white/[0.06]

          bg-[#101114]

          p-4

          sm:p-5
          lg:p-6
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute
            -right-20
            -top-20
            h-60
            w-60
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        <div className="relative z-10">
          {/* TOP */}
          <div
            className="
              flex
              flex-col
              gap-5

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* LEFT */}
            <div>
              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-full

                  bg-blue-500/10

                  px-3
                  py-1.5

                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-blue-400

                  sm:text-xs
                "
              >
                <HiOutlineLightningBolt />
                Sprint Workspace
              </div>

              <h1
                className="
                  mt-4

                  text-2xl
                  font-black
                  text-white

                  sm:text-3xl
                  lg:text-4xl
                "
              >
                My Sprints
              </h1>

              <p
                className="
                  mt-3

                  max-w-2xl

                  text-[11px]
                  leading-6
                  text-zinc-400

                  sm:text-sm
                  sm:leading-7
                "
              >
                Expand sprint sections to view assigned tasks, progress, and
                sprint activities.
              </p>
            </div>

            {/* RIGHT */}
            <div
              className="
                grid
                grid-cols-3
                gap-2

                sm:gap-3
              "
            >
              {[
                {
                  title: "Total",
                  value: totalSprints,
                  color: "bg-blue-500/10 text-blue-400",
                },

                {
                  title: "Active",
                  value: activeSprints,
                  color: "bg-emerald-500/10 text-emerald-400",
                },

                {
                  title: "Done",
                  value: completedSprints,
                  color: "bg-violet-500/10 text-violet-400",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="
                    rounded-[14px]

                    border
                    border-white/[0.06]

                    bg-white/[0.03]

                    p-3

                    text-center
                  "
                >
                  <div
                    className={`
                      inline-flex
                      rounded-lg

                      px-2.5
                      py-1

                      text-[9px]
                      font-semibold

                      sm:text-[10px]

                      ${item.color}
                    `}
                  >
                    {item.title}
                  </div>

                  <h3
                    className="
                      mt-2

                      text-xl
                      font-black
                      text-white

                      sm:text-2xl
                    "
                  >
                    {item.value}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          SPRINTS
      ====================================================== */}

      <div className="space-y-3">
        {mySprints?.map((sprint: any, index: number) => {
          const isExpanded = expandedSprint === sprint?._id;

          return (
            <div
              key={sprint?._id}
              className="
                  overflow-hidden

                  rounded-[18px]

                  border
                  border-white/[0.06]

                  bg-[#101114]
                "
            >
              {/* ======================================================
                    SPRINT HEADER
                ====================================================== */}

              <button
                onClick={() =>
                  setExpandedSprint(isExpanded ? null : sprint?._id)
                }
                className="
                    w-full

                    p-4

                    text-left

                    transition-all
                    duration-300

                    hover:bg-white/[0.02]

                    sm:p-5
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
                  {/* LEFT */}
                  <div className="min-w-0 flex-1">
                    {/* NUMBER */}
                    <div
                      className="
                          mb-3
                          inline-flex
                          items-center
                          gap-2

                          rounded-full

                          bg-white/[0.04]

                          px-3
                          py-1

                          text-[10px]
                          font-semibold
                          text-zinc-400

                          sm:text-xs
                        "
                    >
                      Sprint #{index + 1}
                    </div>

                    {/* TITLE */}
                    <h2
                      className="
                          truncate

                          text-lg
                          font-black
                          text-white

                          sm:text-xl
                        "
                    >
                      {sprint?.name}
                    </h2>

                    {/* GOAL */}
                    <p
                      className="
                          mt-2

                          line-clamp-2

                          text-[11px]
                          leading-6
                          text-zinc-500

                          sm:text-sm
                        "
                    >
                      {sprint?.goal}
                    </p>

                    {/* INFO */}
                    <div
                      className="
                          mt-4
                          flex
                          flex-wrap
                          gap-2
                        "
                    >
                      {/* TASK */}
                      <div
                        className="
                            inline-flex
                            items-center
                            gap-1.5

                            rounded-full

                            bg-violet-500/10

                            px-3
                            py-1.5

                            text-[10px]
                            font-semibold
                            text-violet-400
                          "
                      >
                        <HiOutlineClipboardCheck />
                        {sprint?.totalTasks} Tasks
                      </div>

                      {/* STATUS */}
                      <div
                        className={`
                            inline-flex
                            items-center
                            rounded-full

                            px-3
                            py-1.5

                            text-[10px]
                            font-semibold
                            uppercase

                            ${
                              sprint?.status === "active"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : sprint?.status === "completed"
                                  ? "bg-violet-500/10 text-violet-400"
                                  : "bg-orange-500/10 text-orange-400"
                            }
                          `}
                      >
                        {sprint?.status}
                      </div>
                    </div>

                    {/* PROGRESS */}
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span
                          className="
                              text-[10px]
                              text-zinc-500

                              sm:text-xs
                            "
                        >
                          Progress
                        </span>

                        <span
                          className="
                              text-[10px]
                              font-semibold
                              text-white

                              sm:text-xs
                            "
                        >
                          {sprint?.progress}%
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
                            width: `${sprint?.progress}%`,
                          }}
                          className="
                              h-full
                              rounded-full

                              bg-gradient-to-r
                              from-blue-500
                              via-indigo-500
                              to-violet-500
                            "
                        />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center

                        rounded-xl

                        border
                        border-white/[0.06]

                        bg-white/[0.03]

                        text-zinc-300
                      "
                  >
                    {isExpanded ? (
                      <HiOutlineChevronUp />
                    ) : (
                      <HiOutlineChevronDown />
                    )}
                  </div>
                </div>
              </button>

              {/* ======================================================
                    EXPANDED TASK LIST
                ====================================================== */}

              {isExpanded && (
                <div
                  className="
                      border-t
                      border-white/[0.06]

                      p-4

                      sm:p-5
                    "
                >
                  {/* HEADER */}
                  <div
                    className="
                        mb-4
                        flex
                        items-center
                        justify-between
                      "
                  >
                    <h3
                      className="
                          text-sm
                          font-bold
                          text-white

                          sm:text-base
                        "
                    >
                      Sprint Tasks
                    </h3>

                    <div
                      className="
                          rounded-full

                          bg-white/[0.04]

                          px-3
                          py-1

                          text-[10px]
                          font-semibold
                          text-zinc-400
                        "
                    >
                      {sprint?.tasks?.length} Tasks
                    </div>
                  </div>

                  {/* TASK LIST */}
                  <div className="space-y-3">
                    {sprint?.tasks?.map((task: any, taskIndex: number) => (
                      <div
                        key={taskIndex}
                        className="
                              flex
                              items-start
                              justify-between
                              gap-4

                              rounded-[16px]

                              border
                              border-white/[0.06]

                              bg-white/[0.03]

                              p-3
                            "
                      >
                        {/* LEFT */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <HiOutlineClipboardCheck className="text-violet-400" />

                            <h4
                              className="
                                    truncate

                                    text-sm
                                    font-semibold
                                    text-white
                                  "
                            >
                              {task?.title}
                            </h4>
                          </div>

                          <p
                            className="
                                  mt-2

                                  line-clamp-2

                                  text-[11px]
                                  leading-6
                                  text-zinc-500
                                "
                          >
                            {task?.description}
                          </p>

                          {/* FOOTER */}
                          <div
                            className="
                                  mt-3
                                  flex
                                  flex-wrap
                                  items-center
                                  gap-2
                                "
                          >
                            {/* HOURS */}
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
                              {task?.estimatedHours}h
                            </div>

                            {/* PRIORITY */}
                            <div
                              className="
                                    rounded-full

                                    bg-orange-500/10

                                    px-2.5
                                    py-1

                                    text-[9px]
                                    font-semibold
                                    uppercase
                                    text-orange-400
                                  "
                            >
                              {task?.priority}
                            </div>
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col items-end gap-2">
                          {/* STATUS */}
                          <div
                            className={`
                                  rounded-full

                                  px-2.5
                                  py-1

                                  text-[9px]
                                  font-semibold
                                  uppercase

                                  ${
                                    task?.status === "done"
                                      ? "bg-emerald-500/10 text-emerald-400"
                                      : task?.status === "review"
                                        ? "bg-orange-500/10 text-orange-400"
                                        : task?.status === "in-progress"
                                          ? "bg-blue-500/10 text-blue-400"
                                          : "bg-zinc-500/10 text-zinc-400"
                                  }
                                `}
                          >
                            {task?.status}
                          </div>

                          {/* VIEW */}
                          <Link
                            href={`/dashboard/member/tasks/${task?._id}`}
                            className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center

                                  rounded-xl

                                  border
                                  border-white/[0.06]

                                  bg-white/[0.03]

                                  text-zinc-300

                                  transition-all
                                  duration-300

                                  hover:bg-white/[0.06]
                                  hover:text-white
                                "
                          >
                            <HiOutlineEye />
                          </Link>
                        </div>
                      </div>
                    ))}

                    {/* EMPTY */}
                    {(!sprint?.tasks || sprint?.tasks?.length === 0) && (
                      <div
                        className="
                            rounded-[16px]

                            border
                            border-dashed
                            border-white/[0.06]

                            bg-white/[0.02]

                            p-6

                            text-center
                          "
                      >
                        <p
                          className="
                              text-xs
                              text-zinc-500
                            "
                        >
                          No tasks found in this sprint.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
