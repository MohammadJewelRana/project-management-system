"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";

import LoadingSpinner from "@/app/loading";

import { useGetSingleTask } from "@/store/hooks/task.hook";

import { TaskWorkflow } from "./_components/TaskWorkflow";

import { TaskCommentSection } from "./_components/TaskCommentSection";

import { TaskAttachments } from "./_components/TaskAttachments";

import { TaskHighlights } from "./_components/TaskHighlights";
import { TaskHero } from "./_components/TaskHero";

export default function TaskDetailsPage() {
  const params = useParams();

  const id = params?.id as string;

  const { task, isLoading, isError } = useGetSingleTask(id);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch task details!");
    }
  }, [isError]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!task) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <h2 className="text-xl font-bold text-white">Task not found</h2>
      </div>
    );
  }

  return (
    <div
      className="
        space-y-4

        sm:space-y-5
        lg:space-y-6
      "
    >
      {/* HERO */}

      <TaskHero task={task} />
      {/* HIGHLIGHT MESSAGE */}
      <TaskHighlights />

      {/* GRID */}
      <div
        className="
          grid
          gap-4

          xl:grid-cols-[0.8fr_1.2fr]
        "
      >
        {/* LEFT */}
        <div className="space-y-4">
          <TaskWorkflow task={task} />

          <TaskAttachments />
        </div>

        {/* RIGHT */}
        <TaskCommentSection />
      </div>
    </div>
  );
}
