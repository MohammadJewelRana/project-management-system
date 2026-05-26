// ======================================================
// app/dashboard/member/page.tsx
// ======================================================

"use client";

import LoadingSpinner from "@/app/loading";

import { useGetMyProjects } from "@/store/hooks/project.hook";

import { useGetMyTasks } from "@/store/hooks/task.hook";

import { useGetMySprints } from "@/store/hooks/sprint.hook";

import { DashboardHero } from "./_components/DashboardHero";

import { DashboardStats } from "./_components/DashboardStats";

import { RecentTasks } from "./_components/RecentTasks";

import { SprintProgress } from "./_components/SprintProgress";

import { DashboardActivity } from "./_components/DashboardActivity";

import { WeeklyPerformance } from "./_components/WeeklyPerformance";

import { MiniPerformanceCard } from "./_components/MiniPerformanceCard";

import { DashboardAnalytics } from "./_components/DashboardAnalytics";

import { TaskStatusChart } from "./_components/TaskStatusChart";

import { ProductivityOverview } from "./_components/ProductivityOverview";

export default function MemberDashboardPage() {
  // ======================================================
  // FETCH
  // ======================================================

  const {
    myProjects,
    isLoading: projectLoading,
  } = useGetMyProjects();

  const {
    myTasks,
    isLoading: taskLoading,
  } = useGetMyTasks();

  const {
    mySprints,
    isLoading: sprintLoading,
  } = useGetMySprints();

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
    myTasks?.filter(
      (task: any) =>
        task?.status === "done",
    ) || [];

  const activeProjects =
    myProjects?.filter(
      (project: any) =>
        project?.status === "active",
    ) || [];

  const totalLoggedHours =
    myTasks?.reduce(
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
        projects={myProjects}
        tasks={myTasks}
      />

      {/* ====================================================== */}
      {/* STATS */}
      {/* ====================================================== */}

      <DashboardStats
        totalProjects={
          myProjects?.length || 0
        }
        activeProjects={
          activeProjects?.length || 0
        }
        totalTasks={
          myTasks?.length || 0
        }
        completedTasks={
          completedTasks?.length || 0
        }
        loggedHours={
          totalLoggedHours
        }
      />

      {/* ====================================================== */}
      {/* ANALYTICS SECTION */}
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
          tasks={myTasks}
        />

        {/* SPRINT */}
        <SprintProgress
          sprints={mySprints}
        />
      </div>

      {/* ====================================================== */}
      {/* PERFORMANCE SECTION */}
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
        <MiniPerformanceCard />

        <ProductivityOverview
          completedTasks={
            completedTasks?.length
          }
          totalTasks={
            myTasks?.length || 0
          }
          projects={myProjects}
        />

        <WeeklyPerformance
          completedTasks={
            completedTasks?.length
          }
          totalTasks={
            myTasks?.length || 0
          }
        />
      </div>

      {/* ====================================================== */}
      {/* TASKS + ACTIVITY */}
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
        <RecentTasks
          tasks={myTasks}
        />

        {/* ACTIVITY */}
        <DashboardActivity
          tasks={myTasks}
        />
      </div>
    </div>
  );
}