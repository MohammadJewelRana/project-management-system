"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePlus,
  HiOutlineViewBoards,
  HiOutlineViewGrid,
} from "react-icons/hi";

import toast from "react-hot-toast";

import { TaskForm } from "./_components/TaskForm";
 

import { TaskCardSkeleton } from "./_components/TaskCardSkeleton";

import { TaskEmpty } from "./_components/TaskEmpty";

import { TaskKanban } from "./_components/TaskKanban";

import { TaskStats } from "./_components/TaskStats";

import { TaskFilters } from "./_components/TaskFilters";

import { useGetAllProjects } from "@/store/hooks/project.hook";

import { useGetAllSprints } from "@/store/hooks/sprint.hook";

import { useGetAllUsers } from "@/store/hooks/user.hook";

import { useCreateTask, useGetAllTasks } from "@/store/hooks/task.hook";
import { TaskCard } from "./_components/TaskCard";

export default function TasksPage() {
  const [showForm, setShowForm] = useState(false);

  const [viewMode, setViewMode] = useState<"grid" | "kanban">("grid");

  const [filters, setFilters] = useState({
    search: "",

    status: "",

    priority: "",

    project: "",

    assignee: "",
  });

  /* ======================================================
     FETCH PROJECTS
  ====================================================== */

  const { allData: projects } = useGetAllProjects({
    page: 1,
    limit: 100,
  });

  /* ======================================================
     FETCH SPRINTS
  ====================================================== */

  const { sprints, isLoading: sprintsLoading } = useGetAllSprints({
    page: 1,
    limit: 100,
  });

  /* ======================================================
     FETCH USERS
  ====================================================== */

  const { users } = useGetAllUsers({
    page: 1,
    limit: 100,
  });

  /* ======================================================
     FETCH TASKS
  ====================================================== */

  const { tasks, allTasks, isLoading } = useGetAllTasks({
    page: 1,
    limit: 100,
  });
  console.log(allTasks);

  /* ======================================================
     CREATE TASK
  ====================================================== */

  const { create, isLoading: createLoading } = useCreateTask();

  /* ======================================================
     CREATE TASK HANDLER
  ====================================================== */

  const handleCreateTask = async (data: any) => {
    try {
      const payload = {
        ...data,

        estimatedHours: Number(data.estimatedHours) || 0,

        tags: data.tags
          ? data.tags
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean)
          : [],
      };

      await create(payload);

      setShowForm(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to create task!");
    }
  };

  /* ======================================================
     FILTERED TASKS
  ====================================================== */

  const filteredTasks = useMemo(() => {
    return (
      allTasks?.filter((task: any) => {
        const matchesSearch = task?.title
          ?.toLowerCase()
          .includes(filters.search.toLowerCase());

        const matchesStatus = filters.status
          ? task.status === filters.status
          : true;

        const matchesPriority = filters.priority
          ? task.priority === filters.priority
          : true;

        const matchesProject = filters.project
          ? task?.project?._id === filters.project
          : true;

        const matchesAssignee = filters.assignee
          ? task?.assignee?._id === filters.assignee
          : true;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPriority &&
          matchesProject &&
          matchesAssignee
        );
      }) || []
    );
  }, [allTasks, filters]);

  /* ======================================================
     STATS
  ====================================================== */

  const stats = useMemo(() => {
    const total = filteredTasks?.length || 0;

    const completed =
      filteredTasks?.filter((task: any) => task.status === "done")?.length || 0;

    const inProgress =
      filteredTasks?.filter((task: any) => task.status === "in-progress")
        ?.length || 0;

    const review =
      filteredTasks?.filter((task: any) => task.status === "review")?.length ||
      0;

    return {
      total,

      completed,

      inProgress,

      review,
    };
  }, [filteredTasks]);

  return (
    <div className="space-y-8 pt-3 md:pt-5 lg:pt-8">
      {/* ======================================================
          TOPBAR
      ====================================================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Tasks
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage sprint workflow and team tasks
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap items-center gap-3">
          {/* VIEW TOGGLE */}
          <div
            className="
              flex
              items-center
              rounded-2xl
              border
              border-white/[0.06]
              bg-[#111113]
              p-1
            "
          >
            <button
              onClick={() => setViewMode("grid")}
              className={`
                flex
                h-11
                items-center
                gap-2
                rounded-xl
                px-4
                text-sm
                transition-all
                ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "text-zinc-400"
                }
              `}
            >
              <HiOutlineViewGrid className="text-lg" />
              Grid
            </button>

            <button
              onClick={() => setViewMode("kanban")}
              className={`
                flex
                h-11
                items-center
                gap-2
                rounded-xl
                px-4
                text-sm
                transition-all
                ${
                  viewMode === "kanban"
                    ? "bg-blue-500 text-white"
                    : "text-zinc-400"
                }
              `}
            >
              <HiOutlineViewBoards className="text-lg" />
              Kanban
            </button>
          </div>

          {/* CREATE BUTTON */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="
              flex
              h-12
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-indigo-500
              px-5
              text-sm
              font-medium
              text-white
              shadow-[0_0_30px_rgba(59,130,246,0.35)]
            "
          >
            <HiOutlinePlus className="text-lg" />

            {showForm ? "Close Form" : "Create Task"}

            {showForm ? (
              <HiOutlineChevronUp className="text-lg" />
            ) : (
              <HiOutlineChevronDown className="text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* ======================================================
          STATS
      ====================================================== */}

      <TaskStats stats={stats} />

      {/* ======================================================
          FILTERS
      ====================================================== */}

      <TaskFilters
        filters={filters}
        setFilters={setFilters}
        projects={projects || []}
        sprints={sprints || []}
        users={users || []}
      />

      {/* ======================================================
          FORM
      ====================================================== */}

      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              overflow-hidden
              rounded-[32px]
              border
              border-white/[0.06]
              bg-[#111113]
            "
          >
            <TaskForm
              onSubmit={handleCreateTask}
              isLoading={createLoading}
              projects={projects || []}
              sprints={sprints || []}
              users={users || []}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      {isLoading || sprintsLoading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <TaskCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredTasks?.length === 0 ? (
        <TaskEmpty onCreate={() => setShowForm(true)} />
      ) : viewMode === "kanban" ? (
        <TaskKanban tasks={filteredTasks} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTasks?.map((task: any) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
