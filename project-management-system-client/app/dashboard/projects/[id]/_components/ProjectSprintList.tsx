// ======================================================
// UPDATED PROJECT SPRINT LIST
// ======================================================

"use client";

import { HiOutlineCollection } from "react-icons/hi";

import { SprintCard } from "@/app/dashboard/sprints/_components/SprintCard";

import { EmptyStateCard } from "./EmptyStateCard";

interface Props {
  sprints: any[];
}

export const ProjectSprintList = ({
  sprints,
}: Props) => {
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
          Project Sprints
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Sprint planning and workflow
        </p>
      </div>

      {/* EMPTY */}
      {sprints?.length === 0 ? (
        <EmptyStateCard
          icon={<HiOutlineCollection />}
          title="No Sprints Created"
          description="There are currently no sprints available for this project."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sprints?.map(
            (sprint: any) => (
              <SprintCard
                key={sprint._id}
                sprint={sprint}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};