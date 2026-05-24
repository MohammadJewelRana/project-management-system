// components/projects/project-details-modal.tsx

"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
} from "@heroui/react";

import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineSparkles,
  HiOutlineFlag,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";

interface Props {
  isOpen: boolean;

  onOpenChange: (open: boolean) => void;

  project: any;
}

const statusColors: Record<string, string> = {
  planned: "bg-zinc-700/20 text-zinc-300",

  active: "bg-blue-500/15 text-blue-400",

  completed: "bg-emerald-500/15 text-emerald-400",

  archived: "bg-zinc-800 text-zinc-500",

  "on-hold": "bg-amber-500/15 text-amber-400",
};

const priorityColors: Record<string, string> = {
  low: "text-zinc-400",

  medium: "text-blue-400",

  high: "text-orange-400",

  urgent: "text-red-400",
};

export const ProjectDetailsModal = ({
  isOpen,

  onOpenChange,

  project,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      backdrop="blur"
      hideCloseButton
      size="4xl"
      classNames={{
        base: `
          bg-[#111113] 
          border 
          border-white/[0.06] 
          rounded-[24px] 
          sm:rounded-[32px]
          mx-2
          sm:mx-4
        `,

        body: `
          py-5 
          sm:py-6
        `,

        header: `
          border-b 
          border-white/[0.06] 
          pb-4
          sm:pb-5
        `,

        footer: `
          border-t 
          border-white/[0.06]
        `,

        backdrop: "bg-black/70 backdrop-blur-md",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {/* HEADER */}
            <ModalHeader className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              {/* LEFT */}
              <div className="flex items-start gap-4">
                {/* ICON */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 sm:h-14 sm:w-14 sm:rounded-3xl">
                  <HiOutlineSparkles className="text-2xl" />
                </div>

                {/* INFO */}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {project?.title}
                    </h2>

                    <Chip
                      size="sm"
                      variant="flat"
                      className={`capitalize ${statusColors[project?.status]}`}
                    >
                      {project?.status}
                    </Chip>
                  </div>

                  <p className="mt-2 text-sm text-zinc-500">
                    {project?.client}
                  </p>
                </div>
              </div>

              {/* PRIORITY */}
              <div
                className={`flex items-center gap-2 text-sm font-medium capitalize ${priorityColors[project?.priority]}`}
              >
                <HiOutlineFlag />

                {project?.priority}
              </div>
            </ModalHeader>

            {/* BODY */}
            <ModalBody>
              <div className="space-y-5 sm:space-y-6">
                {/* DESCRIPTION */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:rounded-3xl sm:p-5">
                  <h3 className="mb-3 text-sm font-medium text-zinc-300">
                    Description
                  </h3>

                  <p className="text-sm leading-7 text-zinc-500">
                    {project?.description}
                  </p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                  {/* PROGRESS */}
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:rounded-3xl sm:p-5">
                    <p className="text-xs text-zinc-500">Progress</p>

                    <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                      {project?.progress}%
                    </h3>
                  </div>

                  {/* TASKS */}
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:rounded-3xl sm:p-5">
                    <p className="text-xs text-zinc-500">Tasks</p>

                    <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                      {project?.completedTaskCount}/{project?.totalTaskCount}
                    </h3>
                  </div>

                  {/* HOURS */}
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:rounded-3xl sm:p-5">
                    <p className="text-xs text-zinc-500">Hours</p>

                    <h3 className="mt-3 flex items-center gap-2 text-2xl font-semibold text-white sm:text-3xl">
                      <HiOutlineClock />

                      {project?.estimatedHours}
                    </h3>
                  </div>

                  {/* MEMBERS */}
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:rounded-3xl sm:p-5">
                    <p className="text-xs text-zinc-500">Members</p>

                    <h3 className="mt-3 flex items-center gap-2 text-2xl font-semibold text-white sm:text-3xl">
                      <HiOutlineUsers />

                      {project?.members?.length}
                    </h3>
                  </div>
                </div>

                {/* PROGRESS BAR */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm text-zinc-400">Overall Progress</p>

                    <p className="text-sm font-medium text-white">
                      {project?.progress}%
                    </p>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800 sm:h-3">
                    <div
                      style={{
                        width: `${project?.progress}%`,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    />
                  </div>
                </div>

                {/* DETAILS */}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  {/* LEFT */}
                  <div className="space-y-4 sm:space-y-5">
                    {/* MANAGER */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:rounded-3xl sm:p-5">
                      <h3 className="mb-4 text-sm font-medium text-zinc-300">
                        Project Manager
                      </h3>

                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-lg font-semibold text-blue-400">
                          {project?.projectManager?.name?.charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <h4 className="truncate text-sm font-medium text-white">
                            {project?.projectManager?.name}
                          </h4>

                          <p className="mt-1 truncate text-xs text-zinc-500">
                            {project?.projectManager?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* TIMELINE */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:rounded-3xl sm:p-5">
                      <h3 className="mb-4 text-sm font-medium text-zinc-300">
                        Timeline
                      </h3>

                      <div className="space-y-4">
                        {/* START */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-zinc-500">
                            <HiOutlineCalendar />

                            <span className="text-sm">Start</span>
                          </div>

                          <span className="text-sm text-white">
                            {new Date(project?.startDate).toLocaleDateString(
                              "en-GB",
                            )}
                          </span>
                        </div>

                        {/* END */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-zinc-500">
                            <HiOutlineCalendar />

                            <span className="text-sm">End</span>
                          </div>

                          <span className="text-sm text-white">
                            {new Date(project?.endDate).toLocaleDateString(
                              "en-GB",
                            )}
                          </span>
                        </div>

                        {/* BUDGET */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-zinc-500">
                            <HiOutlineCurrencyDollar />

                            <span className="text-sm">Budget</span>
                          </div>

                          <span className="text-sm text-white">
                            {project?.currency} {project?.budget}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="space-y-4 sm:space-y-5">
                    {/* TECHNOLOGIES */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:rounded-3xl sm:p-5">
                      <h3 className="mb-4 text-sm font-medium text-zinc-300">
                        Technologies
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {project?.technologies?.map(
                          (tech: string, index: number) => (
                            <div
                              key={index}
                              className="rounded-xl bg-blue-500/10 px-3 py-2 text-xs text-blue-400"
                            >
                              {tech}
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* TAGS */}
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:rounded-3xl sm:p-5">
                      <h3 className="mb-4 text-sm font-medium text-zinc-300">
                        Tags
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {project?.tags?.map((tag: string, index: number) => (
                          <div
                            key={index}
                            className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs text-zinc-300"
                          >
                            #{tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* MEMBERS */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:rounded-3xl sm:p-5">
                  <h3 className="mb-5 text-sm font-medium text-zinc-300">
                    Team Members
                  </h3>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {project?.members?.map((member: any) => (
                      <div
                        key={member?._id}
                        className="flex items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.03] p-4"
                      >
                        {/* AVATAR */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-sm font-semibold text-white">
                          <HiOutlineUser />
                        </div>

                        {/* INFO */}
                        <div className="min-w-0">
                          <h4 className="truncate text-sm font-medium text-white">
                            {member?.name}
                          </h4>

                          <p className="mt-1 truncate text-xs capitalize text-zinc-500">
                            {member?.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ModalBody>

            {/* FOOTER */}
            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
                className="w-full text-zinc-400 sm:w-auto"
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
