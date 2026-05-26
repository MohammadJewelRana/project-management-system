// ======================================================
// app/dashboard/member/projects/_components/MemberProjectGrid.tsx
// ======================================================

"use client";

import { HiOutlineFolder } from "react-icons/hi";
import { MemberProjectCard } from "./MemberProjectCard";
import { EmptyStateCard } from "./EmptyStateCard";

interface Props {
  projects: any[];
}

export const MemberProjectGrid = ({ projects }: Props) => {
  if (projects?.length === 0) {
    return (
      <EmptyStateCard
        icon={<HiOutlineFolder />}
        title="No Projects Assigned"
        description="Projects assigned to you will appear here."
      />
    );
  }

  return (
    <div
      className={`
        grid
        gap-6

        ${
          projects?.length === 1
            ? "grid-cols-1"
            : projects?.length === 2
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        }
      `}
    >
      {projects?.map((project: any) => (
        <MemberProjectCard key={project?._id} project={project} />
      ))}
    </div>
  );
};
