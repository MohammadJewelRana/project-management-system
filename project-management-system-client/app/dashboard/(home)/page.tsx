// ======================================================
// app/dashboard/page.tsx
// SUPER ADMIN / ADMIN MAIN DASHBOARD
// ======================================================

"use client";

import LoadingSpinner from "@/app/loading";

import { useGetAllProjects } from "@/store/hooks/project.hook";

import { useGetAllTasks } from "@/store/hooks/task.hook";

import { useGetAllSprints } from "@/store/hooks/sprint.hook";

import { DashboardHero } from "./_components/DashboardHero";

import { DashboardStats } from "./_components/DashboardStats";

 

 

import { SprintProgress } from "./_components/SprintProgress";

 

 

import { WeeklyPerformance } from "./_components/WeeklyPerformance";

import { RecentTasks } from "./_components/RecentTasks";

import { DashboardActivity } from "./_components/DashboardActivity";
import { DashboardAnalytics } from "../member/_components/DashboardAnalytics";
import { TaskStatusChart } from "../member/_components/TaskStatusChart";
import { ProductivityOverview } from "../member/_components/ProductivityOverview";
import { MiniPerformanceCard } from "../member/_components/MiniPerformanceCard";

export default function DashboardPage() {
  // ======================================================
  // FETCH DATA
  // ======================================================

  const {
    allData: projects,
    isLoading: projectLoading,
  } = useGetAllProjects({});

  const {
    allTasks: tasks,
    isLoading: taskLoading,
  } = useGetAllTasks({});

  const {
    sprints,
    isLoading: sprintLoading,
  } = useGetAllSprints({});

  // ======================================================
  // LOADING
  // ======================================================

  if (
    projectLoading ||
    taskLoading ||
    sprintLoading
  ) {
    return <LoadingSpinner />;
  }

  // ======================================================
  // ANALYTICS
  // ======================================================

  const completedTasks =
    tasks?.filter(
      (task: any) =>
        task?.status === "done",
    ) || [];

  const activeProjects =
    projects?.filter(
      (project: any) =>
        project?.status === "active",
    ) || [];

  const totalLoggedHours =
    tasks?.reduce(
      (
        acc: number,
        task: any,
      ) =>
        acc +
        (task?.loggedHours || 0),
      0,
    ) || 0;

  // ======================================================
  // JSX
  // ======================================================

  return (
    <div
      className="
        space-y-4

        sm:space-y-5
        lg:space-y-6
      "
    >
      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <DashboardHero
        projects={projects}
        tasks={tasks}
      />

      {/* ====================================================== */}
      {/* STATS */}
      {/* ====================================================== */}

      <DashboardStats
        totalProjects={
          projects?.length || 0
        }
        activeProjects={
          activeProjects?.length || 0
        }
        totalTasks={
          tasks?.length || 0
        }
        completedTasks={
          completedTasks?.length || 0
        }
        loggedHours={
          totalLoggedHours
        }
      />

      {/* ====================================================== */}
      {/* ANALYTICS */}
      {/* ====================================================== */}

      <div
        className="
          grid
          gap-4

          grid-cols-1

          lg:grid-cols-2

          xl:grid-cols-3
        "
      >
        {/* ANALYTICS */}
        <DashboardAnalytics />

        {/* TASK STATUS */}
        <TaskStatusChart
          tasks={tasks}
        />

        {/* SPRINT */}
        <SprintProgress
          sprints={sprints}
        />
      </div>

      {/* ====================================================== */}
      {/* PERFORMANCE */}
      {/* ====================================================== */}

      <div
        className="
          grid
          gap-4

          grid-cols-1

          md:grid-cols-2

          xl:grid-cols-3
        "
      >
        {/* CARD */}
        <MiniPerformanceCard />

        {/* PRODUCTIVITY */}
        <ProductivityOverview
          completedTasks={
            completedTasks?.length
          }
          totalTasks={
            tasks?.length || 0
          }
          projects={projects}
        />

        {/* WEEKLY */}
        <WeeklyPerformance
          completedTasks={
            completedTasks?.length
          }
          totalTasks={
            tasks?.length || 0
          }
        />
      </div>

      {/* ====================================================== */}
      {/* TASK + ACTIVITY */}
      {/* ====================================================== */}

      <div
        className="
          grid
          gap-4

          grid-cols-1

          xl:grid-cols-2
        "
      >
        {/* TASKS */}
        <RecentTasks tasks={tasks} />

        {/* ACTIVITY */}
        <DashboardActivity
          tasks={tasks}
        />
      </div>
    </div>
  );
}