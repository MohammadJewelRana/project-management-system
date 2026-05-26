// ======================================================
// app/dashboard/member/projects/[id]/page.tsx
// ======================================================

"use client";

import { useParams } from "next/navigation";

import LoadingSpinner from "@/app/loading";

import { useGetProjectDetails } from "@/store/hooks/project.hook";

import { MemberProjectHero } from "./_components/MemberProjectHero";

import { MemberSprintAccordion } from "./_components/MemberSprintAccordion";

import { MemberProjectTaskOverview } from "./_components/MemberProjectTaskOverview";

import { MemberProjectMembers } from "./_components/MemberProjectMembers";

export default function MemberProjectDetailsPage() {
  const params = useParams();

  const id = params?.id as string;

  const {
    project,
    analytics,
    sprints,
    tasks,
    members,
    isLoading,
  } = useGetProjectDetails(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      {/* HERO */}
      <MemberProjectHero
        project={project}
        analytics={analytics}
      />

      {/* SPRINTS */}
      <MemberSprintAccordion
        sprints={sprints || []}
        tasks={tasks || []}
      />

      {/* TASKS */}
      <MemberProjectTaskOverview
        tasks={tasks || []}
      />

      {/* MEMBERS */}
      <MemberProjectMembers
        members={members || []}
      />
    </div>
  );
}