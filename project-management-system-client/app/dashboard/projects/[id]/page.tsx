// ======================================================
// app/dashboard/projects/[id]/page.tsx
// ======================================================

"use client";

import { useParams } from "next/navigation";

import LoadingSpinner from "@/app/loading";

import { useGetProjectDetails } from "@/store/hooks/project.hook";

import { ProjectHero } from "./_components/ProjectHero";

import { ProjectMembers } from "./_components/ProjectMembers";

import { ProjectSprintList } from "./_components/ProjectSprintList";

import { ProjectTaskList } from "./_components/ProjectTaskList";

 

export default function ProjectDetailsPage() {
  const params = useParams();

  const id = params?.id as string;

  /* ======================================================
     GET PROJECT DETAILS
  ====================================================== */

  const {
    project,

    analytics,

    sprints,

    tasks,

    members,

    isLoading,
  } = useGetProjectDetails(id);

  /* ======================================================
     LOADING
  ====================================================== */

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      {/* HERO */}
      <ProjectHero project={project} analytics={analytics} />

      {/* ANALYTICS */}
      {/* <ProjectAnalytics
        totalTasks={analytics?.totalTasks || 0}
        completedTasks={analytics?.completedTasks || 0}
        totalSprints={analytics?.totalSprints || 0}
        members={analytics?.totalMembers || 0}
        progress={analytics?.progress || 0}
        estimatedHours={analytics?.estimatedHours || 0}
      /> */}

      {/* MEMBERS */}
      <ProjectMembers members={members || []} />

      {/* SPRINTS */}
      <ProjectSprintList sprints={sprints || []} />

      {/* TASKS */}
      <ProjectTaskList tasks={tasks || []} />
    </div>
  );
}
