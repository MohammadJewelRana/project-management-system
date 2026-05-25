"use client";

import { Fragment } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineFlag,
  HiOutlineLightningBolt,
  HiOutlineUser,
  HiOutlineX,
} from "react-icons/hi";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  sprint: any;
}

export const SprintDetailsModal = ({ isOpen, onClose, sprint }: Props) => {
  if (!sprint) return null;

  const statusColors: any = {
    planned: "bg-zinc-500/10 text-zinc-300 border-zinc-500/20",

    active: "bg-blue-500/10 text-blue-400 border-blue-500/20",

    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const duration =
    sprint?.startDate && sprint?.endDate
      ? Math.ceil(
          (new Date(sprint.endDate).getTime() -
            new Date(sprint.startDate).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* ======================================================
              BACKDROP
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[100]
              bg-black/70
              backdrop-blur-sm
            "
          />

          {/* ======================================================
              MODAL
          ====================================================== */}

          <div
            className="
              fixed
              inset-0
              z-[101]
              flex
              items-center
              justify-center
              p-4
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                relative
                max-h-[90vh]
                w-full
                max-w-3xl
                overflow-hidden
                rounded-[32px]
                border
                border-white/[0.06]
                bg-[#111113]
                shadow-[0_20px_80px_rgba(0,0,0,0.6)]
              "
            >
              {/* ======================================================
                  HEADER
              ====================================================== */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                  border-b
                  border-white/[0.06]
                  p-5
                  sm:p-6
                "
              >
                {/* LEFT */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2
                      className="
                        truncate
                        text-2xl
                        font-bold
                        text-white
                      "
                    >
                      {sprint?.name}
                    </h2>

                    <div
                      className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusColors[sprint?.status]}`}
                    >
                      {sprint?.status}
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-zinc-500">
                    Detailed sprint overview and progress tracking.
                  </p>
                </div>

                {/* CLOSE */}
                <button
                  onClick={onClose}
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#18181B]
                    text-zinc-400
                    transition-all
                    hover:bg-white/[0.05]
                    hover:text-white
                  "
                >
                  <HiOutlineX className="text-xl" />
                </button>
              </div>

              {/* ======================================================
                  BODY
              ====================================================== */}

              <div
                className="
                  max-h-[calc(90vh-100px)]
                  overflow-y-auto
                  p-5
                  sm:p-6
                "
              >
                {/* ======================================================
                    GOAL
                ====================================================== */}

                <div
                  className="
                    rounded-[28px]
                    border
                    border-white/[0.06]
                    bg-[#18181B]
                    p-5
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-indigo-500/10
                      "
                    >
                      <HiOutlineFlag className="text-2xl text-indigo-400" />
                    </div>

                    <div>
                      <p className="text-sm text-zinc-500">Sprint Goal</p>

                      <h3 className="text-lg font-semibold text-white">
                        Mission & Objectives
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-8 text-zinc-400">
                    {sprint?.goal || "No sprint goal added."}
                  </p>
                </div>

                {/* ======================================================
                    INFO GRID
                ====================================================== */}

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {/* PROJECT */}
                  <div
                    className="
                      rounded-[28px]
                      border
                      border-white/[0.06]
                      bg-[#18181B]
                      p-5
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          bg-blue-500/10
                        "
                      >
                        <HiOutlineClipboardList className="text-2xl text-blue-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm text-zinc-500">Project</p>

                        <h3 className="truncate text-lg font-semibold text-white">
                          {sprint?.project?.title || "No Project"}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* MANAGER */}
                  <div
                    className="
                      rounded-[28px]
                      border
                      border-white/[0.06]
                      bg-[#18181B]
                      p-5
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          bg-emerald-500/10
                        "
                      >
                        <HiOutlineUser className="text-2xl text-emerald-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm text-zinc-500">Sprint Manager</p>

                        <h3 className="truncate text-lg font-semibold text-white">
                          {sprint?.sprintManager?.name || "No Manager"}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* DURATION */}
                  <div
                    className="
                      rounded-[28px]
                      border
                      border-white/[0.06]
                      bg-[#18181B]
                      p-5
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          bg-orange-500/10
                        "
                      >
                        <HiOutlineClock className="text-2xl text-orange-400" />
                      </div>

                      <div>
                        <p className="text-sm text-zinc-500">Duration</p>

                        <h3 className="text-lg font-semibold text-white">
                          {duration} Days
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* TIMELINE */}
                  <div
                    className="
                      rounded-[28px]
                      border
                      border-white/[0.06]
                      bg-[#18181B]
                      p-5
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          bg-pink-500/10
                        "
                      >
                        <HiOutlineCalendar className="text-2xl text-pink-400" />
                      </div>

                      <div>
                        <p className="text-sm text-zinc-500">Timeline</p>

                        <h3 className="text-sm font-semibold text-white">
                          {new Date(sprint?.startDate).toLocaleDateString(
                            "en-GB",
                          )}
                          {" - "}
                          {new Date(sprint?.endDate).toLocaleDateString(
                            "en-GB",
                          )}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ======================================================
                    PROGRESS
                ====================================================== */}

                <div
                  className="
                    mt-6
                    rounded-[28px]
                    border
                    border-white/[0.06]
                    bg-[#18181B]
                    p-5
                  "
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-2xl
                          bg-blue-500/10
                        "
                      >
                        <HiOutlineLightningBolt className="text-2xl text-blue-400" />
                      </div>

                      <div>
                        <p className="text-sm text-zinc-500">Sprint Progress</p>

                        <h3 className="text-lg font-semibold text-white">
                          {sprint?.progress || 0}% Completed
                        </h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-zinc-500">Tasks</p>

                      <h3 className="text-xl font-bold text-white">
                        {sprint?.completedTasks}/{sprint?.totalTasks}
                      </h3>
                    </div>
                  </div>

                  {/* BAR */}
                  <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${sprint?.progress || 0}%`,
                      }}
                      transition={{
                        duration: 0.8,
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
              </div>
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  );
};
