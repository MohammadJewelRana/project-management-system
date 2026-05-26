// ======================================================
// UPDATED PROJECT TASK LIST
// ======================================================

"use client";

import { HiOutlineClipboardList } from "react-icons/hi";

import { TaskCard } from "@/app/dashboard/tasks/_components/TaskCard";

import { EmptyStateCard } from "./EmptyStateCard";

interface Props {
  tasks: any[];
}

export const ProjectTaskList = ({ tasks }: Props) => {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2
          className="
            text-xl
            font-black
            text-white
            sm:text-2xl
          "
        >
          Project Tasks
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Assigned tasks and workflow
        </p>
      </div>

      {/* EMPTY */}
      {tasks?.length === 0 ? (
        <EmptyStateCard
          icon={<HiOutlineClipboardList />}
          title="No Tasks Available"
          description="Tasks have not been added to this project yet."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tasks?.map((task: any) => <TaskCard key={task._id} task={task} />)}
        </div>
      )}
    </div>
  );
};
