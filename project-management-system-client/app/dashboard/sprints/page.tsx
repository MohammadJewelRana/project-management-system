"use client";

import { useMemo, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlinePlus,
} from "react-icons/hi";

import { SprintCard } from "./_components/SprintCard";

import { SprintForm } from "./_components/SprintForm";

import { SprintStats } from "./_components/SprintStats";

import { SprintEmpty } from "./_components/SprintEmpty";

import { SprintCardSkeleton } from "./_components/SprintCardSkeleton";

import { useCreateSprint, useGetAllSprints } from "@/store/hooks/sprint.hook";

import { useGetAllProjects } from "@/store/hooks/project.hook";

import { useGetAllUsers } from "@/store/hooks/user.hook";

export default function SprintsPage() {
  const [showForm, setShowForm] = useState(false);

  const { create, isLoading: createLoading } = useCreateSprint();

  const { sprints, meta, isLoading } = useGetAllSprints({
    page: 1,
    limit: 20,
  });

  const { allData: projects } = useGetAllProjects({
    page: 1,
    limit: 100,
  });

  const { users } = useGetAllUsers({
    page: 1,
    limit: 100,
  });

  const managers = users?.filter((user: any) => user.role === "manager") || [];

  const stats = useMemo(() => {
    const total = sprints?.length || 0;

    const active =
      sprints?.filter((s: any) => s.status === "active").length || 0;

    const completed =
      sprints?.filter((s: any) => s.status === "completed").length || 0;

    const avgProgress =
      total > 0
        ? Math.round(
            sprints.reduce((acc: number, item: any) => acc + item.progress, 0) /
              total,
          )
        : 0;

    return {
      total,
      active,
      completed,
      avgProgress,
    };
  }, [sprints]);

  const handleCreateSprint = async (data: any) => {
    await create(data);

    setShowForm(false);
  };

  return (
    <div className="space-y-8 pt-3 md:pt-5 lg:pt-8">
      {/* TOPBAR */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Sprints
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage agile sprint workflow
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="
            group
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
            transition-all
            duration-300
            hover:scale-[1.02]
          "
        >
          <HiOutlinePlus className="text-lg" />

          {showForm ? "Close Form" : "Create Sprint"}

          {showForm ? (
            <HiOutlineChevronUp className="text-lg" />
          ) : (
            <HiOutlineChevronDown className="text-lg" />
          )}
        </button>
      </div>

      {/* STATS */}
      <SprintStats stats={stats} />

      {/* FORM */}
      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            key="sprint-form"
            initial={{
              opacity: 0,
              y: -15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -15,
            }}
            transition={{
              duration: 0.2,
            }}
            className="
              overflow-hidden
              rounded-3xl
              border
              border-white/[0.06]
              bg-[#111113]
            "
          >
            <SprintForm
              onSubmit={handleCreateSprint}
              isLoading={createLoading}
              projects={projects || []}
              managers={managers}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENT */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <SprintCardSkeleton key={index} />
          ))}
        </div>
      ) : sprints?.length === 0 ? (
        <SprintEmpty onCreate={() => setShowForm(true)} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sprints?.map((sprint: any) => (
            <SprintCard key={sprint._id} sprint={sprint} />
          ))}
        </div>
      )}
    </div>
  );
}
