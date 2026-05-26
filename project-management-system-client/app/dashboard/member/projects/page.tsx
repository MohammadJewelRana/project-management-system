// ======================================================
// app/dashboard/member/projects/page.tsx
// ======================================================

"use client";

import LoadingSpinner from "@/app/loading";

import { useGetProjectDetails } from "@/store/hooks/project.hook";
import { MemberProjectGrid } from "./_components/MemberProjectGrid";

export default function MemberProjectsPage() {
  // TEMP API
  const { project, isLoading } = useGetProjectDetails("PROJECT_ID");

  const projects = project ? [project] : [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1
          className="
            text-3xl
            font-black
            text-white
            md:text-4xl
          "
        >
          My Projects
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Assigned projects and progress overview
        </p>
      </div>

      {/* GRID */}
      <MemberProjectGrid projects={projects} />
    </div>
  );
}
