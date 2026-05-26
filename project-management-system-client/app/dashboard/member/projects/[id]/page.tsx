"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";

import LoadingSpinner from "@/app/loading";

import { useGetProjectDetails } from "@/store/hooks/project.hook";

import { ProjectMembers } from "../_components/ProjectMember";
import { ProjectSprintList } from "../_components/ProjectSprintList";
import { ProjectRecentTasks } from "../_components/ProjectRecentTasks";
import { MemberProjectHero } from "../_components/MemberProjectHero";

export default function ProjectDetailsPage() {
  const params = useParams();

  const id = params?.id as string;

  const { project, analytics, sprints, tasks, members, isLoading, isError } =
    useGetProjectDetails(id);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch project details!");
    }
  }, [isError]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!project) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <h2 className="text-xl font-bold text-white">Project not found</h2>
      </div>
    );
  }
  const totalProjects = 1;

  const activeProjects = project?.status === "active" ? 1 : 0;

  const completedProjects = project?.status === "completed" ? 1 : 0;

  const totalTasks = analytics?.totalTasks || 0;
  return (
    <div className="space-y-8">
   <MemberProjectHero project={project} analytics={analytics} />
      {/* <ProjectHero project={project} analytics={analytics} /> */}

      <ProjectMembers members={members} />

      <ProjectSprintList sprints={sprints} />

      <ProjectRecentTasks tasks={tasks} />
    </div>
  );
}
