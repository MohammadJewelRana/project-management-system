"use client";

import { Dialog } from "@headlessui/react";

import {
  HiOutlineCalendar,
  HiOutlineClipboardList,
  HiOutlineUser,
  HiOutlineX,
} from "react-icons/hi";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  sprint: any;
}

export const SprintDetailsModal = ({
  isOpen,
  onClose,
  sprint,
}: Props) => {
  if (!sprint) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

      {/* MODAL */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className="
            w-full
            max-w-2xl
            overflow-hidden
            rounded-[32px]
            border
            border-white/[0.06]
            bg-[#111113]
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-white/[0.06] p-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {sprint.name}
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Sprint Details Overview
              </p>
            </div>

            <button
              onClick={onClose}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-white/[0.04]
                text-zinc-400
              "
            >
              <HiOutlineX className="text-xl" />
            </button>
          </div>

          {/* CONTENT */}
          <div className="space-y-6 p-6">
            {/* GOAL */}
            <div>
              <h4 className="mb-2 text-sm font-medium text-zinc-400">
                Goal
              </h4>

              <p className="leading-7 text-zinc-300">
                {sprint.goal ||
                  "No goal added."}
              </p>
            </div>

            {/* INFO */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#18181B] p-4">
                <div className="flex items-center gap-3">
                  <HiOutlineClipboardList className="text-xl text-blue-400" />

                  <div>
                    <p className="text-sm text-zinc-500">
                      Project
                    </p>

                    <h4 className="font-semibold text-white">
                      {sprint?.project
                        ?.title ||
                        "No Project"}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#18181B] p-4">
                <div className="flex items-center gap-3">
                  <HiOutlineUser className="text-xl text-emerald-400" />

                  <div>
                    <p className="text-sm text-zinc-500">
                      Sprint Manager
                    </p>

                    <h4 className="font-semibold text-white">
                      {sprint
                        ?.sprintManager
                        ?.name ||
                        "No Manager"}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#18181B] p-4">
                <div className="flex items-center gap-3">
                  <HiOutlineCalendar className="text-xl text-orange-400" />

                  <div>
                    <p className="text-sm text-zinc-500">
                      Start Date
                    </p>

                    <h4 className="font-semibold text-white">
                      {new Date(
                        sprint.startDate
                      ).toLocaleDateString()}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#18181B] p-4">
                <div className="flex items-center gap-3">
                  <HiOutlineCalendar className="text-xl text-pink-400" />

                  <div>
                    <p className="text-sm text-zinc-500">
                      End Date
                    </p>

                    <h4 className="font-semibold text-white">
                      {new Date(
                        sprint.endDate
                      ).toLocaleDateString()}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* PROGRESS */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-zinc-400">
                  Sprint Progress
                </span>

                <span className="text-sm font-semibold text-white">
                  {sprint.progress}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  style={{
                    width: `${sprint.progress}%`,
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

            {/* TASKS */}
            <div className="rounded-2xl bg-[#18181B] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500">
                    Completed Tasks
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-white">
                    {sprint.completedTasks}
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Total Tasks
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-white">
                    {sprint.totalTasks}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};